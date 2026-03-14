import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Heart, ShoppingBag, MessageSquare, Settings, Bell, Eye, Edit, Trash2 } from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useStore } from "@/store/useStore";

type DashTab = "listings" | "purchases" | "offers" | "messages" | "settings";

const UserDashboard = () => {
  const [tab, setTab] = useState<DashTab>("listings");
  const { favorites } = useStore();

  const myListings = cars.slice(0, 3); // Mock user's listings
  const myPurchases = cars.slice(3, 5);

  const tabs = [
    { label: "My Listings", icon: Car, tab: "listings" as DashTab, count: myListings.length },
    { label: "Purchases", icon: ShoppingBag, tab: "purchases" as DashTab, count: myPurchases.length },
    { label: "Saved", icon: Heart, tab: "offers" as DashTab, count: favorites.length },
    { label: "Messages", icon: MessageSquare, tab: "messages" as DashTab, count: 3 },
    { label: "Settings", icon: Settings, tab: "settings" as DashTab },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              JD
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">John Doe</h1>
              <p className="text-sm text-muted-foreground">john.doe@email.com · Member since Jan 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex gap-0 overflow-x-auto px-4">
          {tabs.map((t) => (
            <button
              key={t.tab}
              onClick={() => setTab(t.tab)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" strokeWidth={1.5} />
              {t.label}
              {t.count !== undefined && (
                <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {tab === "listings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Your Listings</h2>
              <Link to="/sell" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all active:scale-95">
                Post a Car
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg bg-card shadow-surface ring-subtle">
              {myListings.map((car) => (
                <div key={car.id} className="flex items-center gap-4 border-b border-border p-4 last:border-0">
                  <img src={car.images[0]} alt="" className="h-16 w-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{car.year} {car.make} {car.model}</p>
                    <p className="font-mono-data text-xs text-muted-foreground">{formatPrice(car.price)} · {formatMileage(car.mileage)} mi</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span className="font-mono-data">{car.views}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="rounded p-1.5 text-muted-foreground hover:bg-secondary"><Edit className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                    <button className="rounded p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "purchases" && (
          <div className="overflow-hidden rounded-lg bg-card shadow-surface ring-subtle">
            {myPurchases.map((car) => (
              <div key={car.id} className="flex items-center gap-4 border-b border-border p-4 last:border-0">
                <img src={car.images[0]} alt="" className="h-16 w-24 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{car.year} {car.make} {car.model}</p>
                  <p className="font-mono-data text-xs text-muted-foreground">{formatPrice(car.price)}</p>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">Completed</span>
              </div>
            ))}
          </div>
        )}

        {tab === "offers" && (
          <div className="text-center py-12">
            <Heart className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{favorites.length} saved vehicle{favorites.length !== 1 ? "s" : ""}</p>
            <Link to="/favorites" className="mt-2 inline-block text-sm text-primary hover:underline">View saved vehicles</Link>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-2">
            {["Prestige Motors", "Michael Chen", "Stuttgart Auto Gallery"].map((name, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-surface ring-subtle transition-colors hover:bg-secondary/50 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                  {name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">Thanks for your interest in the vehicle...</p>
                </div>
                <span className="text-xs text-muted-foreground">{i === 0 ? "2m ago" : i === 1 ? "1h ago" : "3d ago"}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-lg space-y-4">
            <div className="rounded-lg bg-card p-5 shadow-surface ring-subtle">
              <h3 className="text-sm font-semibold text-foreground">Profile Information</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input defaultValue="John Doe" className="w-full rounded-md bg-secondary px-3 py-2 text-sm text-foreground outline-none ring-subtle focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                  <input defaultValue="john.doe@email.com" className="w-full rounded-md bg-secondary px-3 py-2 text-sm text-foreground outline-none ring-subtle focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                  <input defaultValue="+1 (555) 123-4567" className="w-full rounded-md bg-secondary px-3 py-2 text-sm text-foreground outline-none ring-subtle focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all active:scale-95">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
