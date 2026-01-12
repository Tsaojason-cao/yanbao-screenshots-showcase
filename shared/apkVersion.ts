/**
 * APK 版本信息配置
 * 每次发布新版本时更新此文件
 */

export const APK_VERSION_INFO = {
  version: "2.0.0-Gold",
  buildNumber: "1",
  releaseDate: "2026-01-12",
  downloadUrl: "https://expo.dev/accounts/tsaojason/projects/yanbao-eas-build/builds/a342532b-30c3-4a56-b1bf-debbfd3bee68",
  fileSize: "50+ MB", // 生产级APK
  changelog: [
    "✨ 库洛米主题深度融入（快门按钮/骷髅头装饰/浮动助手）",
    "📸 7维AI塑形美颜系统（GPU加速，<100ms响应）",
    "🎯 专业模式：ISO/快门/白平衡/峰值对焦",
    "🗺️ 地区机位推荐系统（高精度定位）",
    "👣 我的足迹功能（记录访问机位和拍摄数据）",
    "💾 FlashList虚拟滚动（支持数千张4K照父60fps）",
    "☁️ Supabase云端实时同步（北京↔杭州<500ms）",
    "🔒 ProGuard代码混淆，工业级安全",
  ],
  requirements: {
    android: "Android 8.0+",
    storage: "至少 100MB 可用空间",
  },
} as const;

export type APKVersionInfo = typeof APK_VERSION_INFO;
