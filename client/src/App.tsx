import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import DownloadPage from "@/pages/Download";
import FileManager from "@/pages/FileManager";
import DownloadStats from "@/pages/DownloadStats";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/download" component={DownloadPage} />
        <Route path="/files" component={FileManager} />
        <Route path="/download-stats" component={DownloadStats} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
