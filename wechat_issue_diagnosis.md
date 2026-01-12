# 微信中图片和视频无法显示问题诊断

## 问题现象
用户反馈在微信中访问官网时，图片和视频无法正常显示或加载。

## 检查结果

### 1. 资源文件存在性检查
✅ **所有资源文件都存在**
- kuromi-logo.png (58K) - 存在于根目录
- assets/yanbao-promo.mp4 - 视频文件存在
- assets/*.webp - 所有截图文件都存在（webp格式）

### 2. HTML中的资源路径
当前使用的是**相对路径**：
- Logo: `src="kuromi-logo.png"`
- 视频: `src="assets/yanbao-promo.mp4"`
- 图片: `src="assets/module-*.webp"`

### 3. 微信分享配置
```html
<meta property="og:image" content="https://tsaojason-cao.github.io/yanbao-screenshots-showcase/assets/logo.png">
<meta property="og:url" content="https://tsaojason-cao.github.io/yanbao-screenshots-showcase/">
```
配置指向的是GitHub Pages地址，但用户访问的是Manus临时域名。

### 4. 视频配置
视频标签包含了完整的微信兼容性配置：
- `playsinline` - iOS内联播放
- `webkit-playsinline` - iOS Safari兼容
- `x5-video-player-type="h5"` - 微信X5内核H5播放
- `x5-playsinline="true"` - 微信内联播放
- `x5-video-player-fullscreen="true"` - 微信全屏支持
- `x5-video-orientation="portrait"` - 竖屏播放
- `poster="assets/module-home.webp"` - 视频封面

## 问题原因分析

### 主要问题：相对路径 + 临时域名不匹配

用户访问的URL是：
```
https://8080-i9t9qv28vzb937x6o1wxc-e858d928.sg1.manus.computer/yanbao-website-complete.html
```

这是一个**临时的Manus沙盒域名**，但HTML文件中：
1. **资源使用相对路径** - 如果HTML文件不在正确的目录结构中，相对路径会失效
2. **微信OG配置指向GitHub Pages** - 导致微信分享时图片路径错误
3. **可能的CORS问题** - 临时域名可能有跨域限制

### 次要问题：WebP格式兼容性

虽然现代微信浏览器支持WebP，但部分老版本可能不支持。应该提供PNG/JPG降级方案。

## 解决方案

### 方案1：使用绝对路径（推荐用于临时测试）
将所有相对路径改为完整的URL路径，确保在任何域名下都能正确加载。

### 方案2：部署到GitHub Pages（推荐用于生产）
将修复后的文件部署到GitHub Pages，使用稳定的域名：
```
https://tsaojason-cao.github.io/yanbao-screenshots-showcase/
```

### 方案3：添加图片格式降级
为WebP图片提供PNG降级方案，使用`<picture>`标签：
```html
<picture>
  <source srcset="assets/module-home.webp" type="image/webp">
  <img src="assets/module-home.png" alt="首页截图">
</picture>
```

### 方案4：视频格式优化
- 确保MP4使用H.264编码（微信支持最好）
- 添加视频压缩以加快加载速度
- 考虑提供多个分辨率版本

## 建议的修复步骤

1. **立即修复**：修改HTML使用正确的资源路径
2. **部署到GitHub Pages**：提供稳定的访问地址
3. **更新微信OG配置**：确保分享时图片正确显示
4. **添加图片降级**：提升老版本微信的兼容性
5. **测试验证**：在微信中实际测试所有功能
