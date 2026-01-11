import { describe, it, expect, vi, beforeEach } from "vitest";
import { fileRouter } from "./fileRouter";
import * as storage from "../storage";
import * as dbModule from "../db";

// Mock dependencies
vi.mock("../storage");
vi.mock("../db");

describe("File Router", () => {
  const mockDb = {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    $returningId: vi.fn(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn(),
    delete: vi.fn().mockReturnThis(),
  };

  const mockUser = {
    id: 1,
    openId: "test-user-123",
    name: "Test User",
    email: "test@example.com",
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(dbModule.getDb).mockResolvedValue(mockDb as any);
  });

  describe("upload", () => {
    it("should upload a file successfully", async () => {
      // Mock storage upload
      vi.mocked(storage.storagePut).mockResolvedValue({
        key: "uploads/1/1234567890_test.png",
        url: "https://storage.example.com/uploads/1/1234567890_test.png",
      });

      // Mock database insert
      mockDb.$returningId.mockResolvedValue([{ id: 1 }]);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.upload({
        fileName: "test.png",
        fileData: Buffer.from("test image data").toString("base64"),
        mimeType: "image/png",
      });

      expect(result).toMatchObject({
        id: 1,
        fileName: "test.png",
        url: "https://storage.example.com/uploads/1/1234567890_test.png",
      });
      expect(storage.storagePut).toHaveBeenCalled();
    });

    it("should throw error when database is unavailable", async () => {
      vi.mocked(dbModule.getDb).mockResolvedValue(null);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      await expect(
        caller.upload({
          fileName: "test.png",
          fileData: Buffer.from("test").toString("base64"),
          mimeType: "image/png",
        })
      ).rejects.toThrow("Database not available");
    });
  });

  describe("list", () => {
    it("should list user files", async () => {
      const mockFiles = [
        {
          id: 1,
          userId: 1,
          fileName: "test1.png",
          storageKey: "uploads/1/test1.png",
          url: "https://storage.example.com/test1.png",
          mimeType: "image/png",
          fileSize: 1024,
          uploadedAt: new Date(),
        },
        {
          id: 2,
          userId: 1,
          fileName: "test2.jpg",
          storageKey: "uploads/1/test2.jpg",
          url: "https://storage.example.com/test2.jpg",
          mimeType: "image/jpeg",
          fileSize: 2048,
          uploadedAt: new Date(),
        },
      ];

      mockDb.orderBy.mockResolvedValue(mockFiles);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.list();

      expect(result).toEqual(mockFiles);
      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete a file owned by the user", async () => {
      const mockFile = {
        id: 1,
        userId: 1,
        fileName: "test.png",
        storageKey: "uploads/1/test.png",
        url: "https://storage.example.com/test.png",
        mimeType: "image/png",
        fileSize: 1024,
        uploadedAt: new Date(),
      };

      mockDb.where.mockResolvedValue([mockFile]);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.delete({ id: 1 });

      expect(result).toEqual({ success: true });
      expect(mockDb.delete).toHaveBeenCalled();
    });

    it("should throw error when file not found", async () => {
      mockDb.where.mockResolvedValue([]);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      await expect(caller.delete({ id: 999 })).rejects.toThrow(
        "File not found or access denied"
      );
    });

    it("should throw error when user does not own the file", async () => {
      const mockFile = {
        id: 1,
        userId: 999, // Different user
        fileName: "test.png",
        storageKey: "uploads/999/test.png",
        url: "https://storage.example.com/test.png",
        mimeType: "image/png",
        fileSize: 1024,
        uploadedAt: new Date(),
      };

      mockDb.where.mockResolvedValue([mockFile]);

      const caller = fileRouter.createCaller({
        user: mockUser,
        req: {} as any,
        res: {} as any,
      });

      await expect(caller.delete({ id: 1 })).rejects.toThrow(
        "File not found or access denied"
      );
    });
  });
});
