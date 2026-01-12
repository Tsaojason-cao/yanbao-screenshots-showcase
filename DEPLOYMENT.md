# 雁宝AI官网永久部署指南

## 🌐 部署概览

雁宝AI官网已通过**GitHub Pages**实现永久免费部署，无需任何服务器成本，全球CDN加速，稳定可靠。

---

## ✅ 当前部署状态

### 永久访问地址

**GitHub Pages（推荐）**：
```
https://tsaojason-cao.github.io/yanbao-screenshots-showcase/
```

**特点**：
- ✅ 永久免费
- ✅ 全球CDN加速
- ✅ 自动HTTPS
- ✅ 99.9%可用性
- ✅ 无需维护服务器
- ✅ 自动部署（推送即更新）

### 临时预览地址（Manus沙盒）

**当前临时地址**：
```
https://8080-i9oqfxbjqhzwd446fewhd-f9cf4404.sg1.manus.computer/
```

**注意**：此地址仅用于开发测试，沙盒关闭后会失效，不适合生产使用。

---

## 🚀 部署架构

### GitHub Pages自动部署流程

```
本地修改代码
    ↓
git commit & push
    ↓
GitHub接收推送
    ↓
自动触发GitHub Pages构建
    ↓
部署到全球CDN
    ↓
1-3分钟后生效
```

### 仓库配置

- **仓库名称**：yanbao-screenshots-showcase
- **可见性**：Public（公开）
- **分支**：main
- **部署源**：根目录 `/`
- **自定义域名**：支持（可选）

---

## 📋 部署清单

### 已完成的优化

1. ✅ **资源路径修复**
   - 所有资源使用绝对路径
   - 确保在任何环境下都能正确加载

2. ✅ **微信兼容性优化**
   - X5内核视频配置
   - WebP/PNG双格式降级
   - OG标签完整配置

3. ✅ **GitHub Pages配置**
   - 设置Homepage URL
   - 添加仓库描述和标签
   - 创建.nojekyll文件

4. ✅ **文档完善**
   - README.md（项目说明）
   - wechat_fix_guide.md（微信修复指南）
   - wechat_issue_diagnosis.md（问题诊断）
   - DEPLOYMENT.md（本文档）

---

## 🔧 如何更新网站

### 方法1：通过Git命令行

```bash
# 1. 克隆仓库（首次）
git clone https://github.com/Tsaojason-cao/yanbao-screenshots-showcase.git
cd yanbao-screenshots-showcase

# 2. 修改文件
# 编辑 index.html 或其他文件

# 3. 提交并推送
git add .
git commit -m "更新说明"
git push

# 4. 等待1-3分钟，GitHub Pages自动部署
```

### 方法2：通过GitHub网页界面

1. 访问 https://github.com/Tsaojason-cao/yanbao-screenshots-showcase
2. 点击要编辑的文件
3. 点击右上角的铅笔图标（编辑）
4. 修改内容
5. 点击"Commit changes"
6. 等待1-3分钟自动部署

### 方法3：通过GitHub Desktop

1. 打开GitHub Desktop
2. 克隆仓库
3. 修改文件
4. 提交并推送
5. 自动部署

---

## 🌍 自定义域名配置（可选）

如果您拥有自己的域名（如 `yanbao.ai`），可以配置自定义域名：

### 步骤1：在GitHub仓库中配置

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容写入您的域名（一行）：
   ```
   yanbao.ai
   ```
   或
   ```
   www.yanbao.com
   ```

### 步骤2：在域名DNS中配置

在您的域名服务商（如阿里云、腾讯云、Cloudflare）添加DNS记录：

**方式A：使用CNAME记录（推荐）**
```
类型：CNAME
主机记录：www（或 @）
记录值：tsaojason-cao.github.io
TTL：600
```

**方式B：使用A记录**
```
类型：A
主机记录：@
记录值：185.199.108.153
TTL：600
```

还需要添加其他3个A记录：
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### 步骤3：在GitHub仓库设置中启用

1. 进入仓库 Settings → Pages
2. 在"Custom domain"中输入您的域名
3. 勾选"Enforce HTTPS"
4. 等待DNS生效（可能需要24-48小时）

### 步骤4：更新HTML中的资源路径

如果使用自定义域名，需要将HTML中的绝对路径更新为新域名：

```bash
# 使用脚本批量替换
sed -i 's|https://tsaojason-cao.github.io/yanbao-screenshots-showcase|https://yanbao.ai|g' index.html
```

---

## 📊 监控和维护

### 检查部署状态

1. **访问网站**：https://tsaojason-cao.github.io/yanbao-screenshots-showcase/
2. **查看GitHub Actions**：仓库 → Actions 标签页
3. **检查提交历史**：仓库 → Commits

### 常见问题排查

#### 问题1：推送后网站没有更新

**原因**：CDN缓存或浏览器缓存

**解决方案**：
- 等待5-10分钟
- 清除浏览器缓存
- 在URL后添加时间戳：`?t=20260112`
- 使用隐私/无痕模式访问

#### 问题2：图片或视频不显示

**原因**：资源路径错误

**解决方案**：
- 检查HTML中的资源路径是否为绝对路径
- 确认资源文件已提交到仓库
- 查看浏览器控制台的错误信息

#### 问题3：微信中无法访问

**原因**：微信安全检查或域名未备案

**解决方案**：
- 使用GitHub Pages域名（通常可以访问）
- 如使用自定义域名，需要进行ICP备案（中国大陆）
- 检查微信分享OG标签配置

---

## 🔐 安全和备份

### 自动备份

- ✅ GitHub自动保存所有历史版本
- ✅ 可随时回滚到任意版本
- ✅ 支持分支管理和多人协作

### 版本回滚

```bash
# 查看提交历史
git log --oneline

# 回滚到指定版本
git reset --hard <commit-id>
git push -f

# 或创建新分支测试
git checkout -b test-rollback <commit-id>
```

### 数据安全

- ✅ 仓库设置为Public（必需，GitHub Pages要求）
- ✅ 不包含敏感信息（API密钥、密码等）
- ✅ 所有资源文件已纳入版本控制

---

## 📈 性能优化

### 已实施的优化

1. **图片格式优化**
   - 使用WebP格式（文件大小减少30-50%）
   - 提供PNG降级方案

2. **资源加载优化**
   - 使用CDN加速
   - 启用浏览器缓存
   - 图片懒加载（可选）

3. **代码优化**
   - CSS内联（减少HTTP请求）
   - 响应式设计（适配各种设备）

### 进一步优化建议

1. **视频压缩**
   - 当前视频文件可能较大
   - 建议使用FFmpeg压缩：
     ```bash
     ffmpeg -i yanbao-promo.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k yanbao-promo-compressed.mp4
     ```

2. **图片压缩**
   - 使用TinyPNG或ImageOptim进一步压缩
   - 考虑使用AVIF格式（更小）

3. **CDN加速**
   - GitHub Pages已提供CDN
   - 如需更快速度，可使用Cloudflare

---

## 📞 技术支持

### 相关资源

- **GitHub仓库**：https://github.com/Tsaojason-cao/yanbao-screenshots-showcase
- **GitHub Pages文档**：https://docs.github.com/en/pages
- **自定义域名指南**：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

### 联系方式

- **GitHub Issues**：在仓库中创建Issue
- **开发者**：Tsaojason-cao

---

## 📝 更新日志

### 2026-01-12
- ✅ 修复微信中图片和视频显示问题
- ✅ 优化资源路径为绝对路径
- ✅ 添加WebP/PNG双格式降级
- ✅ 完善GitHub Pages配置
- ✅ 创建完整部署文档

---

## 🎯 总结

雁宝AI官网已实现**永久免费部署**，具备以下特点：

✅ **稳定可靠**：GitHub Pages提供99.9%可用性  
✅ **全球加速**：CDN确保全球访问速度  
✅ **自动部署**：推送代码即自动更新  
✅ **零成本**：完全免费，无需服务器  
✅ **易于维护**：简单的Git工作流  
✅ **可扩展**：支持自定义域名  

**永久访问地址**：https://tsaojason-cao.github.io/yanbao-screenshots-showcase/

现在可以放心地在微信、社交媒体和其他渠道分享这个链接了！🎉
