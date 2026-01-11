import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Camera, Wand2, Image as ImageIcon, Heart, Play, Check, X, Phone, User, Quote, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const screenshots = [
    {
      id: 1,
      title: "首页 - 星光轮盘",
      desc: "库洛米主题星光轮盘，8大功能一目了然。实时用户数据统计，紫粉渐变背景，沉浸式视觉体验。",
      img: "/images/01_homepage_wheel.png",
      icon: <Star className="w-5 h-5 text-primary" />,
      tags: ["库洛米主题", "数据统计", "轮盘导航"]
    },
    {
      id: 2,
      title: "相机 - 7维美颜",
      desc: "对标专业修图软件的7维美颜系统。磨皮、美白、瘦脸、大眼等参数精细调节，实时预览效果。",
      img: "/images/02_camera_beauty.png",
      icon: <Camera className="w-5 h-5 text-primary" />,
      tags: ["实时美颜", "GPU加速", "精细调节"]
    },
    {
      id: 3,
      title: "编辑 - 前后对比",
      desc: "交互式前后对比视图，可拖动分割线查看修图效果。直观感受美颜前后的巨大差异。",
      img: "/images/03_editor_comparison.png",
      icon: <Wand2 className="w-5 h-5 text-primary" />,
      tags: ["交互式对比", "无损编辑", "一键复原"]
    },
    {
      id: 4,
      title: "相册 - 雁宝记忆",
      desc: "独创「雁宝记忆」预设系统，保存你的专属美颜配方。支持云端同步，多设备无缝切换。",
      img: "/images/04_gallery_presets.png",
      icon: <ImageIcon className="w-5 h-5 text-primary" />,
      tags: ["云端同步", "专属预设", "智能分类"]
    },
    {
      id: 5,
      title: "彩蛋 - 1017 告白",
      desc: "隐藏在首页头像中的专属彩蛋。连续点击5次，触发1999.10.17专属告白，库洛米为你送上祝福。",
      img: "/images/05_easter_egg_1017.png",
      icon: <Heart className="w-5 h-5 text-primary" />,
      tags: ["专属彩蛋", "触觉反馈", "浪漫告白"]
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "内测用户 A",
      avatar: "👩🏻",
      content: "库洛米主题真的太戳我了！而且美颜效果很自然，不是那种假白。",
      rating: 5
    },
    {
      id: 2,
      user: "摄影师 B",
      avatar: "📸",
      content: "7维美颜参数调节很专业，居然支持 LUT 滤镜导入，手机修图神器。",
      rating: 5
    },
    {
      id: 3,
      user: "雁宝粉丝 C",
      avatar: "💜",
      content: "彩蛋太浪漫了！1017 那个日期出来的时候真的感动到了。Jason 有心了！",
      rating: 5
    },
    {
      id: 4,
      user: "设计狮 D",
      avatar: "🎨",
      content: "UI 交互非常丝滑，特别是轮盘的触觉反馈，体验感拉满。",
      rating: 5
    }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/YanBao_AI_Studio_v1.5.0_Final.apk';
    link.download = 'YanBao_AI_Studio_v1.5.0_Final.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
      {/* 背景装饰 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-chart-2/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-chart-3/10 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      {/* 导航栏 */}
      <nav className="relative z-50 container py-6 flex justify-between items-center backdrop-blur-sm sticky top-0 border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img src="/images/logo_kuromi.png" alt="Logo" className="w-10 h-10 rounded-full border border-primary/50 group-hover:scale-110 transition-transform duration-300 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-4">雁宝 AI</span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Imaging Studio</span>
          </div>
        </div>
        <Button onClick={handleDownload} variant="outline" className="gap-2 border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 rounded-full px-6">
          <Download className="w-4 h-4" />
          前往下载页 (Expo)
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 container py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <Badge variant="secondary" className="mb-8 px-6 py-2 text-sm bg-primary/10 text-primary-foreground border border-primary/20 rounded-full backdrop-blur-md shadow-[0_0_20px_-5px_var(--color-primary)]">
              ✨ v1.5.0 Final Release
            </Badge>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 drop-shadow-[0_0_30px_rgba(212,165,255,0.3)]">
              因为是你，
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-chart-2 to-chart-4 drop-shadow-[0_0_30px_rgba(212,165,255,0.5)]">
              所以代码有了温度。
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            雁宝 AI 私人影像工作室，为你量身定制的库洛米主题美颜相机。
            <br />
            <span className="text-foreground/80 font-normal mt-2 inline-block">7维美颜矩阵 · GPU 加速渲染 · 云端同步</span>
          </p>
          
          <div className="flex flex-col items-center gap-8 mb-20">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://expo.dev/accounts/tsaojason/projects/yanbao-imaging-studio/builds/cea02707-41cb-49b5-8dc7-dadcdeb1b9c1" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FDB931] text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <Download className="w-6 h-6" />
                Android (APK)
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert("请使用 iPhone 相机扫描下方二维码，在 Expo Go 中体验。");
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all"
              >
                <Smartphone className="w-6 h-6" />
                iOS (Expo Go)
              </a>
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl shadow-2xl">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=exp://u.expo.dev/update/7a6c9d8e-1b2a-4c3d-5e6f-7g8h9i0j1k2l" 
                  alt="Expo Go QR Code" 
                  className="w-48 h-48"
                />
              </div>
              <p className="text-white/60 text-sm">
                iPhone 用户请下载 <span className="text-[#FFD700]">Expo Go</span> App 扫码体验
              </p>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative max-w-sm mx-auto aspect-[9/16] rounded-[2.5rem] overflow-hidden border-4 border-primary/30 shadow-[0_0_50px_-10px_var(--color-primary)] bg-black group">
            <video 
              className="w-full h-full object-cover"
              poster="/images/01_homepage_wheel.png"
              controls
              playsInline
              loop
              muted
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
              <Badge variant="outline" className="bg-black/50 border-primary/50 text-primary backdrop-blur-md mb-2">
                App 实机演示
              </Badge>
              <p className="text-white/80 text-sm font-light">
                沉浸式库洛米主题体验
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Comparison Table */}
      <section className="relative z-10 container py-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          为什么选择雁宝 AI？
        </h2>
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 overflow-hidden bg-black/20 backdrop-blur-md">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-[200px] text-lg font-bold text-white/50">功能特性</TableHead>
                <TableHead className="text-lg font-bold text-primary text-center bg-primary/5">雁宝 AI</TableHead>
                <TableHead className="text-lg font-bold text-white/50 text-center">普通美颜相机</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { feature: "广告干扰", yanbao: "无广告，纯净体验", other: "开屏/弹窗广告多", good: true },
                { feature: "主题风格", yanbao: "专属库洛米定制", other: "大众化模板", good: true },
                { feature: "美颜算法", yanbao: "7维精细调节 + GPU加速", other: "基础磨皮美白", good: true },
                { feature: "云端同步", yanbao: "雁宝记忆多端同步", other: "仅本地保存", good: true },
                { feature: "触觉反馈", yanbao: "全局 Haptics 震动", other: "无/弱反馈", good: true },
                { feature: "专属彩蛋", yanbao: "1017 纪念日彩蛋", other: "无", good: true },
                { feature: "隐私保护", yanbao: "本地处理，不上传人脸", other: "云端处理，隐私风险", good: true },
              ].map((row, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium text-white/80">{row.feature}</TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold">
                      <Check className="w-5 h-5" />
                      {row.yanbao}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      {row.good ? <X className="w-5 h-5 text-red-400/50" /> : <Check className="w-5 h-5" />}
                      {row.other}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Screenshots Grid */}
      <section className="relative z-10 container py-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          核心功能预览
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {screenshots.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`${index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-32"}`}
            >
              <div className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <Card className="relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 rounded-[2rem] shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-b from-black/20 to-black/60">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-primary shadow-lg">
                            {item.icon}
                          </div>
                          <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                        </div>
                        
                        <p className="text-lg text-gray-300 mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {item.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-white/80 px-3 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Wall */}
      <section className="relative z-10 container py-32 mt-20">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          内测用户好评
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{review.user}</div>
                      <div className="flex text-primary text-xs">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="w-6 h-6 text-white/10 absolute -top-2 -left-2" />
                    <p className="text-sm text-muted-foreground relative z-10 pl-4">
                      {review.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container py-20 text-center mt-20 border-t border-white/5 bg-black/20">
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 rounded-full border-2 border-primary/50 p-1 shadow-[0_0_30px_-10px_var(--color-primary)]"
          >
            <img src="/images/logo.png" alt="Logo" className="w-full h-full rounded-full object-cover" />
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-4">YanBao AI</h2>
            <p className="text-lg text-muted-foreground font-light">
              Made with 💜 by Jason Tsao
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-sm text-muted-foreground/70">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>客服热线: 15201260173</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <User className="w-4 h-4" />
              <span>作者: Jason Tsao</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/30 mt-8">
            © 2026 YanBao AI Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
