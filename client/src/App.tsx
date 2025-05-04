import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BookMatch from "@/pages/book-match";
import ReadingTracker from "@/pages/reading-tracker";
import Subscription from "@/pages/subscription";
import KidsMode from "@/pages/kids-mode";
import BedtimeStories from "@/pages/bedtime-stories";
import FiveMinStories from "@/pages/five-min-stories";
import BookDetails from "@/pages/book-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book-match" component={BookMatch} />
      <Route path="/reading-tracker" component={ReadingTracker} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/kids-mode" component={KidsMode} />
      <Route path="/bedtime-stories" component={BedtimeStories} />
      <Route path="/five-min-stories" component={FiveMinStories} />
      <Route path="/book/:id" component={BookDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
