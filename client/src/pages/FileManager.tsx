import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Upload, Trash2, FileIcon, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function FileManager() {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const utils = trpc.useUtils();
  const { data: files, isLoading } = trpc.file.list.useQuery();
  const uploadMutation = trpc.file.upload.useMutation({
    onSuccess: () => {
      utils.file.list.invalidate();
      toast.success("文件上传成功！");
    },
    onError: (error) => {
      toast.error(`上传失败: ${error.message}`);
    },
  });
  
  const deleteMutation = trpc.file.delete.useMutation({
    onSuccess: () => {
      utils.file.list.invalidate();
      toast.success("文件已删除");
    },
    onError: (error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64String = event.target?.result as string;
        const base64Data = base64String.split(',')[1]; // Remove data:image/png;base64, prefix

        await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData: base64Data,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这个文件吗？")) {
      deleteMutation.mutate({ id });
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const isImage = (mimeType?: string) => {
    return mimeType?.startsWith('image/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2">
              文件管理中心
            </CardTitle>
            <CardDescription className="text-lg">
              上传和管理您的文件，所有文件安全存储在云端
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Upload Section */}
            <div className="mb-8">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="gap-2"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    上传中...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    选择文件上传
                  </>
                )}
              </Button>
            </div>

            {/* Files List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : files && files.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <Card key={file.id} className="overflow-hidden border-white/10 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      {/* File Preview */}
                      <div className="aspect-video bg-black/20 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {isImage(file.mimeType || undefined) ? (
                          <img
                            src={file.url}
                            alt={file.fileName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileIcon className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>

                      {/* File Info */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm truncate" title={file.fileName}>
                          {file.fileName}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatFileSize(file.fileSize || undefined)}</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString('zh-CN')}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => window.open(file.url, '_blank')}
                          >
                            查看
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(file.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">还没有上传任何文件</p>
                <p className="text-sm">点击上方按钮开始上传</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
