import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Camera, Wand2, Image as ImageIcon, Heart } from "lucide-react";
import { motion } from "framer-motion";

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
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💜</span>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">雁宝 AI</span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Imaging Studio</span>
          </div>
        </div>
        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 rounded-full px-6">
          <Download className="w-4 h-4" />
          下载 APK
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
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 shadow-[0_0_40px_-10px_var(--color-primary)] transition-all duration-300 hover:scale-105 border-0">
              <Download className="w-6 h-6 mr-2" />
              立即下载 v1.5.0
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-10 text-lg rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-300">
              查看功能演示 ↓
            </Button>
          </div>
        </motion.div>
      </header>

      {/* Screenshots Grid */}
      <section className="relative z-10 container py-20">
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

      {/* Footer */}
      <footer className="relative z-10 container py-32 text-center mt-32 border-t border-white/5">
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center text-5xl border border-white/10 shadow-[0_0_30px_-10px_var(--color-primary)]"
          >
            💜
          </motion.div>
          <div>
            <h2 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">YanBao AI</h2>
            <p className="text-xl text-muted-foreground font-light">
              Made with ❤️ for YanBao
            </p>
          </div>
          <p className="text-sm text-muted-foreground/50 mt-8">
            © 2026 YanBao AI Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
