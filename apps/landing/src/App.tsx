import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Team from "./pages/Team";
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
import InitiativeDetail from "./pages/InitiativeDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Services from "./pages/Services";
import ServiceRequest from "./pages/ServiceRequest";
import { AuthProvider } from "../../../packages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* <Route path="/" element={<Soon />} /> */}
            <Route path="/" element={<Index />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />

            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/courses/:courseId" element={<CourseDetail />} /> */}

            <Route path="/educa-one" element={<ComingSoon />} />
            <Route path="/scholar-one" element={<ComingSoon />} />
            <Route path="/quisqueya-ai" element={<ComingSoon />} />

            <Route path="/isla-intelligence" element={<ComingSoon />} />
            <Route path="/cultura-connect" element={<ComingSoon />} />

            <Route path="/terra-vision-ai" element={<ComingSoon />} />
            <Route path="/title-trust-dr" element={<ComingSoon />} />

            <Route path="/team" element={<Team />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceRequest />} />
            <Route path="/partners" element={<Partners />} />
            {/* <Route path="/partners/:partnerId" element={<PartnerDetail />} /> */}
            <Route path="/initiatives" element={<Initiatives />} />
            {/* <Route path="/initiatives/:initiativeId" element={<InitiativeDetail />} /> */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<NewsDetail />} />
            <Route path="/blog" element={<Blog />} />
            {/* <Route path="/blog/:blogId" element={<BlogDetail />} /> */}

            <Route path="/contact" element={<Contact />} />
            {/* 
          <Route path="/education" element={<Education />} />
          <Route path="/tourism" element={<ComingSoon />} />
          <Route path="/real-estate" element={<ComingSoon />} /> */}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
