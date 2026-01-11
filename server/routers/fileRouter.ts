import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { files } from "../../drizzle/schema";
import { storagePut } from "../storage";
import { eq } from "drizzle-orm";

export const fileRouter = router({
  /**
   * Upload a file to S3 storage
   * Accepts base64-encoded file data
   */
  upload: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1).max(255),
        fileData: z.string(), // base64 encoded
        mimeType: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      
      // Decode base64 data
      const buffer = Buffer.from(input.fileData, "base64");
      const fileSize = buffer.length;
      
      // Generate unique storage key
      const timestamp = Date.now();
      const sanitizedFileName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageKey = `uploads/${userId}/${timestamp}_${sanitizedFileName}`;
      
      // Upload to S3
      const { key, url } = await storagePut(
        storageKey,
        buffer,
        input.mimeType || "application/octet-stream"
      );
      
      // Save metadata to database
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      const [file] = await db.insert(files).values({
        userId,
        fileName: input.fileName,
        storageKey: key,
        url,
        mimeType: input.mimeType,
        fileSize,
      }).$returningId();
      
      return {
        id: file.id,
        fileName: input.fileName,
        url,
        fileSize,
        uploadedAt: new Date(),
      };
    }),

  /**
   * List all files uploaded by the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }
    
    const userFiles = await db
      .select()
      .from(files)
      .where(eq(files.userId, userId))
      .orderBy(files.uploadedAt);
    
    return userFiles;
  }),

  /**
   * Delete a file
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }
      
      // Verify ownership
      const [file] = await db
        .select()
        .from(files)
        .where(eq(files.id, input.id));
      
      if (!file || file.userId !== userId) {
        throw new Error("File not found or access denied");
      }
      
      // Delete from database (S3 cleanup can be done separately if needed)
      await db.delete(files).where(eq(files.id, input.id));
      
      return { success: true };
    }),
});
