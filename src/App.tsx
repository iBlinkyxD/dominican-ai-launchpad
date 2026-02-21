import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Teams from "./pages/Teams";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Courses from "./pages/Courses";
// import CourseDetail from "./pages/CourseDetail";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Soon from "./pages/Soon";
import PartnerDetail from "./pages/PartnerDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ScrollToTop from "./components/ScrollToTop";
import Initiatives from "./pages/Initiatives";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Soon />} /> */}
          <Route path="/" element={<Index />} />

          <Route path="/courses" element={<Courses />} />
          {/* <Route path="/courses/:courseId" element={<CourseDetail />} /> */}

          <Route path="/educa-one" element={<ComingSoon />} />
          <Route path="/scholar-one" element={<ComingSoon />} />
          <Route path="/quisqueya-ai" element={<ComingSoon />} />

          <Route path="/isla-intelligence" element={<ComingSoon />} />
          <Route path="/culturaconnect" element={<ComingSoon />} />

          <Route path="/terravision-ai" element={<ComingSoon />} />
          <Route path="/titletrust-dr" element={<ComingSoon />} />

          <Route path="/teams" element={<Teams />} />

          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/:partnerId" element={<PartnerDetail />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />

          <Route path="/contact" element={<Contact />} />
{/* 
          <Route path="/education" element={<Education />} />
          <Route path="/tourism" element={<ComingSoon />} />
          <Route path="/real-estate" element={<ComingSoon />} /> */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
