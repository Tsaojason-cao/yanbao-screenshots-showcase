import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Files table for storing uploaded file metadata.
 * Actual file content is stored in S3, this table only stores references.
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  /** User who uploaded the file */
  userId: int("userId").notNull(),
  /** Original filename */
  fileName: varchar("fileName", { length: 255 }).notNull(),
  /** S3 storage key (path) */
  storageKey: varchar("storageKey", { length: 512 }).notNull(),
  /** Public URL to access the file */
  url: text("url").notNull(),
  /** MIME type of the file */
  mimeType: varchar("mimeType", { length: 100 }),
  /** File size in bytes */
  fileSize: int("fileSize"),
  /** Upload timestamp */
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * APK download statistics table.
 * Tracks each download event for analytics.
 */
export const apkDownloads = mysqlTable("apkDownloads", {
  id: int("id").autoincrement().primaryKey(),
  /** APK version that was downloaded */
  version: varchar("version", { length: 20 }).notNull(),
  /** User's IP address (for unique visitor tracking) */
  ipAddress: varchar("ipAddress", { length: 45 }),
  /** User agent string */
  userAgent: text("userAgent"),
  /** Referrer URL */
  referrer: text("referrer"),
  /** Download timestamp */
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
});

export type ApkDownload = typeof apkDownloads.$inferSelect;
export type InsertApkDownload = typeof apkDownloads.$inferInsert;
