import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HtmlCoursePage from "./pages/HtmlCoursePage";
import HtmlChapterPage from "./pages/HtmlChapterPage";
import HtmlLessonPage from "./pages/HtmlLessonPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/html-course" element={<HtmlCoursePage />} />
          <Route path="/html-course/chapter/:chapterId" element={<HtmlChapterPage />} />
          <Route path="/html-course/chapter/:chapterId/lesson/:lessonId" element={<HtmlLessonPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;