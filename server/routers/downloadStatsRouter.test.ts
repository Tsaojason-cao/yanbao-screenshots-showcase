import { describe, expect, it } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("downloadStats.recordDownload", () => {
  it("should record a download event successfully", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.downloadStats.recordDownload({
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0 Test Browser",
      referrer: "https://example.com",
    });

    expect(result).toEqual({ success: true });
  });

  it("should handle missing optional fields", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.downloadStats.recordDownload({});

    expect(result).toEqual({ success: true });
  });
});

describe("downloadStats.getStats", () => {
  it("should return download statistics", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.downloadStats.getStats();

    expect(stats).toHaveProperty("totalDownloads");
    expect(stats).toHaveProperty("uniqueUsers");
    expect(stats).toHaveProperty("byVersion");
    expect(stats).toHaveProperty("byDate");
    expect(stats).toHaveProperty("currentVersion");
    expect(typeof stats.totalDownloads).toBe("number");
    expect(typeof stats.uniqueUsers).toBe("number");
    expect(Array.isArray(stats.byVersion)).toBe(true);
    expect(Array.isArray(stats.byDate)).toBe(true);
  });
});

describe("downloadStats.getRecentDownloads", () => {
  it("should return recent downloads with default limit", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const downloads = await caller.downloadStats.getRecentDownloads({ limit: 10 });

    expect(Array.isArray(downloads)).toBe(true);
    expect(downloads.length).toBeLessThanOrEqual(10);
  });

  it("should respect custom limit", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const downloads = await caller.downloadStats.getRecentDownloads({ limit: 5 });

    expect(Array.isArray(downloads)).toBe(true);
    expect(downloads.length).toBeLessThanOrEqual(5);
  });
});
