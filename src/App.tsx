import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import CarDetailPage from "@/pages/CarDetailPage";
import FavoritesPage from "@/pages/FavoritesPage";
import SellCarPage from "@/pages/SellCarPage";
import UserDashboard from "@/pages/UserDashboard";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/sell" element={<SellCarPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
