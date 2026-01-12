/**
 * APK 版本信息配置
 * 每次发布新版本时更新此文件
 */

export const APK_VERSION_INFO = {
  version: "2.1.0-Ultimate",
  buildNumber: "2",
  releaseDate: "2026-01-12",
  downloadUrl: "https://expo.dev/accounts/tsaojason/projects/yanbao-eas-build/builds/a342532b-30c3-4a56-b1bf-debbfd3bee68",
  fileSize: "50+ MB", // 生产级APK
  changelog: [
    "🗺️ 新增杭州/北京/广州/上海40个热门机位导航",
    "🌎 机位推荐支持地图/列表双视图切换",
    "🎯 机位筛选器：按城市+标签精准筛选（人像/风光/网红打卡）",
    "🎨 12种LUT高质感预设（电影感/日系/韩系/富士CCD）",
    "⭐ LUT收藏功能：固定常用预设到列表最前面",
    "💖 1017告白彩蛋：连续点击Logo 5次触发",
    "✨ 库洛米主题全系升级（快门按钮/骷髅头装饰/浮动助手）",
    "📸 7维AI塑形美颜系统（GPU加速，<100ms响应）",
    "🔒 ProGuard代码混淆 + 资源压缩，工业级安全",
  ],
  requirements: {
    android: "Android 8.0+",
    storage: "至少 100MB 可用空间",
  },
} as const;

export type APKVersionInfo = typeof APK_VERSION_INFO;
