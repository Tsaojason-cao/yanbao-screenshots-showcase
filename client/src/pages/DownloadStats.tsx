import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Download, Users, TrendingUp, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DownloadStats() {
  const { user, loading: authLoading } = useAuth();
  const { data: stats, isLoading } = trpc.downloadStats.getStats.useQuery();
  const { data: recentDownloads } = trpc.downloadStats.getRecentDownloads.useQuery({ limit: 20 });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">需要登录</h1>
        <p className="text-muted-foreground mb-8">请先登录以查看下载统计</p>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">APK 下载统计</h1>
              <p className="text-sm text-muted-foreground">实时监控下载数据和用户行为</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            当前版本: v{stats?.currentVersion}
          </Badge>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                总下载次数
              </CardTitle>
              <Download className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalDownloads || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                累计下载量
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                独立用户
              </CardTitle>
              <Users className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.uniqueUsers || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                基于 IP 地址统计
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                平均转化率
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats?.totalDownloads && stats?.uniqueUsers
                  ? ((stats.totalDownloads / stats.uniqueUsers) * 100).toFixed(1)
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                下载/访问比率
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Downloads by Version */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              版本下载分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>版本号</TableHead>
                  <TableHead className="text-right">下载次数</TableHead>
                  <TableHead className="text-right">占比</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.byVersion.map((item) => (
                  <TableRow key={item.version} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium">v{item.version}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                    <TableCell className="text-right">
                      {stats.totalDownloads
                        ? ((Number(item.count) / stats.totalDownloads) * 100).toFixed(1)
                        : 0}
                      %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Downloads by Date */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              近 30 天下载趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>日期</TableHead>
                  <TableHead className="text-right">下载次数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.byDate.map((item) => (
                  <TableRow key={item.date} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Downloads */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              最近下载记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>版本</TableHead>
                  <TableHead>IP 地址</TableHead>
                  <TableHead>时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDownloads?.map((download) => (
                  <TableRow key={download.id} className="border-white/5 hover:bg-white/5">
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 border-primary/30">
                        v{download.version}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {download.ipAddress || "未知"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(download.downloadedAt).toLocaleString("zh-CN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
