import { motion } from "framer-motion";
import { Download, ShieldCheck, Smartphone, AlertTriangle, CheckCircle2, Calendar, HardDrive, QrCode, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APK_VERSION_INFO } from "@shared/apkVersion";
import { useEffect, useRef, useState } from "react";
import QRCodeLib from "qrcode";
import { trpc } from "@/lib/trpc";

export default function DownloadPage() {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    // 生成二维码
    if (qrCanvasRef.current) {
      QRCodeLib.toCanvas(
        qrCanvasRef.current,
        APK_VERSION_INFO.downloadUrl,
        {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) console.error("QR Code generation error:", error);
        }
      );
    }
  }, []);

  const recordDownloadMutation = trpc.downloadStats.recordDownload.useMutation();

  const handleDownload = () => {
    // Record download statistics
    recordDownloadMutation.mutate({
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });
    
    // Open download link
    window.open(APK_VERSION_INFO.downloadUrl, "_blank");
  };

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
        <div className="max-w-5xl mx-auto">
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

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Download Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2"
            >
              <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm relative overflow-hidden group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FDB931] p-0.5 shadow-[0_0_30px_rgba(255,215,0,0.2)] shrink-0">
                      <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                        <img src="/images/icon.png" alt="App Icon" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">YanBao AI Studio</h2>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          v{APK_VERSION_INFO.version}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-sm text-white/50">
                          <Calendar className="w-4 h-4" />
                          {APK_VERSION_INFO.releaseDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-white/50">
                          <HardDrive className="w-4 h-4" />
                          {APK_VERSION_INFO.fileSize}
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">
                        {APK_VERSION_INFO.requirements.android} · {APK_VERSION_INFO.requirements.storage}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleDownload}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)] border-none mb-4"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    立即下载 APK
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-white/40">
                    <ShieldCheck className="w-4 h-4" />
                    <span>安全无毒 · 开发者签名 · 专属定制</span>
                  </div>

                  {/* Changelog Toggle */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setShowChangelog(!showChangelog)}
                      className="w-full flex items-center justify-between text-left hover:text-primary transition-colors"
                    >
                      <span className="font-semibold">更新日志</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showChangelog ? "rotate-180" : ""}`} />
                    </button>
                    
                    {showChangelog && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {APK_VERSION_INFO.changelog.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* QR Code Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col items-center justify-center text-center">
                <QrCode className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-4">手机扫码下载</h3>
                <div className="bg-white p-4 rounded-xl mb-4">
                  <canvas ref={qrCanvasRef} />
                </div>
                <p className="text-sm text-white/50">
                  使用手机相机或浏览器扫描二维码
                  <br />
                  直接下载 APK 文件
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Installation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-primary" />
                安装指南
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">1</div>
                    <div>
                      <h4 className="font-semibold mb-2">下载 APK 文件</h4>
                      <p className="text-sm text-white/60">
                        点击上方下载按钮或扫描二维码，将 APK 文件保存到手机。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">2</div>
                    <div>
                      <h4 className="font-semibold mb-2">允许未知来源</h4>
                      <p className="text-sm text-white/60">
                        进入设置 → 安全 → 允许安装未知应用，开启浏览器或文件管理器的权限。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-primary">3</div>
                    <div>
                      <h4 className="font-semibold mb-2">安装应用</h4>
                      <p className="text-sm text-white/60">
                        打开下载的 APK 文件，点击"安装"按钮，等待安装完成。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex gap-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                      <h4 className="font-semibold text-yellow-500">安全提示</h4>
                    </div>
                    <p className="text-sm text-white/70 ml-8">
                      此 APK 为开发者签名的官方版本，安全可靠。部分手机可能提示"未知来源"，属于正常现象。
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <h4 className="font-semibold text-primary">兼容性</h4>
                    </div>
                    <p className="text-sm text-white/70 ml-8">
                      支持 {APK_VERSION_INFO.requirements.android} 及以上系统。建议在 WiFi 环境下下载。
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
