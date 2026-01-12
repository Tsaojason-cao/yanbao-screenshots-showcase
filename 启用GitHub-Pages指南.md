# 启用GitHub Pages指南

由于GitHub API权限限制，需要手动在仓库设置中启用GitHub Pages。请按照以下步骤操作：

## 步骤1：访问仓库设置

1. 打开浏览器，访问：https://github.com/Tsaojason-cao/yanbao-screenshots-showcase
2. 点击页面顶部的 **Settings**（设置）标签

## 步骤2：启用GitHub Pages

1. 在左侧菜单中找到 **Pages**（页面）选项
2. 在 **Source**（源）部分：
   - **Branch**（分支）：选择 `main`
   - **Folder**（文件夹）：选择 `/ (root)`
3. 点击 **Save**（保存）按钮

## 步骤3：等待部署完成

1. 页面会显示 "Your site is ready to be published at..."
2. 等待1-2分钟，GitHub Actions会自动构建和部署网站
3. 刷新页面，当看到 "Your site is live at..." 时，表示部署成功

## 步骤4：访问官网

部署完成后，访问以下URL查看官网：

**官网地址**: https://tsaojason-cao.github.io/yanbao-screenshots-showcase/

---

## 常见问题

### Q: 为什么需要手动启用？
A: GitHub API的Pages权限需要特殊的OAuth scope，当前集成的GitHub CLI没有足够的权限通过API启用Pages。

### Q: 部署需要多长时间？
A: 通常1-2分钟即可完成部署。如果超过5分钟，请检查仓库的Actions标签查看构建日志。

### Q: 如何查看部署状态？
A: 访问 https://github.com/Tsaojason-cao/yanbao-screenshots-showcase/actions 查看GitHub Actions的构建状态。

### Q: 部署失败怎么办？
A: 检查以下几点：
1. 确保`index.html`文件在仓库根目录
2. 确保`assets`文件夹包含所有图片资源
3. 检查Actions日志中的错误信息

---

## 官网内容

✅ **Hero横幅**：库洛米Logo + YanBao AI标题 + CTA按钮  
✅ **宣传视频区域**：预留视频播放位置  
✅ **核心功能**：6个功能卡片（40个机位/12种LUT/AI影集/一键成片/专业相机/云端同步）  
✅ **实机模块展示**：6个模块截图+说明（首页/相机/编辑/相册/机位推荐/设置）  
✅ **竞品比较**：对比表格（vs 美图秀秀/像素蛋糕/Snapseed）  
✅ **下载入口**：Android APK/iOS TestFlight/Expo Go测试 + QR码  
✅ **库洛米主题**：紫粉渐变背景 + 库洛米装饰元素  
✅ **响应式设计**：支持移动端和桌面端

---

**完成以上步骤后，你的YanBao AI官网就上线了！** 🎉
