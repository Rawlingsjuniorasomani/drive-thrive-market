import { Link, useLocation } from "react-router-dom";
import { Search, Heart, User, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favorites, isAdmin } = useStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) return null;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl shadow-surface-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-md">
            <span className="text-lg font-bold text-primary-foreground">DT</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Drive Thrive</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/search" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Browse Cars
          </Link>
          <Link to="/sell" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Sell Your Car
          </Link>
          <Link to="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/search" className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link to="/favorites" className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Heart className="h-4 w-4" strokeWidth={1.5} />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/admin" className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link to="/login" className="flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            Sign In
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground md:hidden">
          {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link to="/search" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground">Browse Cars</Link>
            <Link to="/sell" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground">Sell Your Car</Link>
            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground">Dashboard</Link>
            <Link to="/favorites" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground">Favorites ({favorites.length})</Link>
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground">Admin</Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground">Sign In</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
