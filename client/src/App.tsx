import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import DownloadPage from "@/pages/Download";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/download" component={DownloadPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
