import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { apkDownloads } from "../../drizzle/schema";
import { APK_VERSION_INFO } from "../../shared/apkVersion";
import { sql } from "drizzle-orm";

export const downloadStatsRouter = router({
  /**
   * Record a download event
   * Public endpoint - called when user clicks download button
   */
  recordDownload: publicProcedure
    .input(
      z.object({
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      await db.insert(apkDownloads).values({
        version: APK_VERSION_INFO.version,
        ipAddress: input.ipAddress || null,
        userAgent: input.userAgent || null,
        referrer: input.referrer || null,
      });

      return { success: true };
    }),

  /**
   * Get download statistics
   * Protected endpoint - only for admin/owner
   */
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Total downloads
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(apkDownloads);
    const totalDownloads = totalResult[0]?.count || 0;

    // Downloads by version
    const byVersionResult = await db
      .select({
        version: apkDownloads.version,
        count: sql<number>`count(*)`,
      })
      .from(apkDownloads)
      .groupBy(apkDownloads.version);

    // Downloads by date (last 30 days)
    const byDateResult = await db
      .select({
        date: sql<string>`DATE(downloadedAt)`,
        count: sql<number>`count(*)`,
      })
      .from(apkDownloads)
      .where(sql`downloadedAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)`)
      .groupBy(sql`DATE(downloadedAt)`)
      .orderBy(sql`DATE(downloadedAt) DESC`);

    // Unique IPs (approximate unique users)
    const uniqueIPsResult = await db
      .select({ count: sql<number>`count(DISTINCT ipAddress)` })
      .from(apkDownloads);
    const uniqueUsers = uniqueIPsResult[0]?.count || 0;

    return {
      totalDownloads,
      uniqueUsers,
      byVersion: byVersionResult,
      byDate: byDateResult,
      currentVersion: APK_VERSION_INFO.version,
    };
  }),

  /**
   * Get recent downloads (for admin monitoring)
   * Protected endpoint - only for admin/owner
   */
  getRecentDownloads: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const downloads = await db
        .select()
        .from(apkDownloads)
        .orderBy(sql`downloadedAt DESC`)
        .limit(input.limit);

      return downloads;
    }),
});
