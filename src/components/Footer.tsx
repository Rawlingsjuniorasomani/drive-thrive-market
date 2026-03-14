import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-sm font-semibold text-foreground">MotorMarket</span>
          </div>
          <p className="text-xs text-muted-foreground text-wrap-pretty leading-relaxed">
            The definitive exchange for quality vehicles. Trusted by thousands of buyers and sellers.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Marketplace</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/search" className="text-sm text-foreground/70 hover:text-foreground">Browse Cars</Link>
            <Link to="/sell" className="text-sm text-foreground/70 hover:text-foreground">Sell Your Car</Link>
            <Link to="/search?type=dealer" className="text-sm text-foreground/70 hover:text-foreground">Dealers</Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Company</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground">About Us</Link>
            <Link to="/faq" className="text-sm text-foreground/70 hover:text-foreground">FAQ</Link>
            <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground">Contact</Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Legal</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/terms" className="text-sm text-foreground/70 hover:text-foreground">Terms of Service</Link>
            <Link to="/privacy" className="text-sm text-foreground/70 hover:text-foreground">Privacy Policy</Link>
          </nav>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">© 2026 MotorMarket. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
