import { motion } from "framer-motion";
import { Download, ShieldCheck, Smartphone, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container flex items-center justify-between h-20">
          <Link href="/">
            <a className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
              雁宝 <span className="text-primary">AI</span>
            </a>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white/70 hover:text-white">
              返回首页
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
              下载 YanBao AI
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              专为 1017 纪念日打造的私人影像工作室。
              <br />
              请按照下方指引完成安装，开启你的专属黑科技体验。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Download Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FFD700] to-[#FDB931] p-0.5 mb-6 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                    <div className="w-full h-full rounded-[22px] bg-black flex items-center justify-center overflow-hidden">
                      <img src="/images/icon.png" alt="App Icon" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">YanBao AI Studio</h2>
                  <p className="text-white/50 mb-8">v1.5.0 Final Release · Android</p>

                  <a 
                    href="https://expo.dev/accounts/tsaojason/projects/yanbao-imaging-studio/builds" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)] border-none">
                      <Download className="mr-2 w-5 h-5" />
                      立即下载 APK
                    </Button>
                  </a>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-white/40">
                    <ShieldCheck className="w-4 h-4" />
                    <span>安全无毒 · 开发者签名 · 专属定制</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Installation Guide */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-primary" />
                  安装指南
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">1</div>
                    <div>
                      <h4 className="font-bold mb-1">下载 APK 文件</h4>
                      <p className="text-white/60 text-sm">点击左侧按钮跳转至 Expo 构建页，选择最新的 "Finished" 构建，点击 "Download" 保存 APK 文件。</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">2</div>
                    <div>
                      <h4 className="font-bold mb-1">允许安装未知来源</h4>
                      <p className="text-white/60 text-sm">由于是私人定制 App，系统可能会提示安全警告。请在设置中允许浏览器或文件管理器安装应用。</p>
                      <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-3 text-xs text-yellow-200/80">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>这是正常的系统提示，请放心安装。App 不包含任何恶意代码。</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">3</div>
                    <div>
                      <h4 className="font-bold mb-1">完成安装</h4>
                      <p className="text-white/60 text-sm">安装完成后，打开 App，授予必要的相机和相册权限，即可开始体验。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h4 className="font-bold mb-3 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  彩蛋提示
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  安装成功后，别忘了去「关于」页面寻找那个特殊的日期。
                  <br />
                  <span className="text-white/40 text-xs mt-1 block">提示：连续点击 5 次...</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
