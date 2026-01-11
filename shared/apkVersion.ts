/**
 * APK 版本信息配置
 * 每次发布新版本时更新此文件
 */

export const APK_VERSION_INFO = {
  version: "1.5.0",
  buildNumber: "1",
  releaseDate: "2026-01-12",
  downloadUrl: "https://expo.dev/artifacts/eas/oE3aabFzE2TjqxjtbvhF3o.apk",
  fileSize: "45.2 MB", // 根据实际 APK 大小更新
  changelog: [
    "✨ 库洛米主题星光轮盘导航",
    "📸 7维美颜系统（磨皮、美白、瘦脸、大眼等）",
    "🎨 交互式前后对比视图",
    "💾 雁宝记忆预设系统（云端同步）",
    "💜 1017 专属彩蛋",
    "🔒 本地处理，隐私保护",
    "⚡ GPU 加速渲染",
  ],
  requirements: {
    android: "Android 8.0+",
    storage: "至少 100MB 可用空间",
  },
} as const;

export type APKVersionInfo = typeof APK_VERSION_INFO;
