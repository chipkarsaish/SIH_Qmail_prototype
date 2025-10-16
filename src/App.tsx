import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SecurityCenter from "./pages/SecurityCenter";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SentMail from "./pages/SentMail";
import Draft from "./pages/Draft";
import Archives from './pages/Archives';
import JunkMail from "./pages/JunkMail";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/security-center" element={<SecurityCenter />} />
          <Route path="/sent" element={<SentMail />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/index" element={<Index />} />
          <Route path="/archive" element={<Archives />} />
          <Route path="/junk" element={<JunkMail />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
