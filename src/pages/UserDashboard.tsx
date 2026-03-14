import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Heart, ShoppingBag, MessageSquare, Settings, Bell, Eye, Edit, Trash2, LayoutDashboard, TrendingUp, BarChart3 } from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useStore } from "@/store/useStore";

type DashTab = "overview" | "listings" | "seller" | "purchases" | "saved" | "messages" | "settings";

const UserDashboard = () => {
  const [tab, setTab] = useState<DashTab>("overview");
  const { favorites } = useStore();

  const myListings = cars.slice(0, 3); // Mock user's listings
  const myPurchases = cars.slice(3, 5);

  const tabs = [
    { label: "Overview", icon: LayoutDashboard, tab: "overview" as DashTab },
    { label: "My Listings", icon: Car, tab: "listings" as DashTab, count: myListings.length },
    { label: "Seller Hub", icon: TrendingUp, tab: "seller" as DashTab },
    { label: "Purchases", icon: ShoppingBag, tab: "purchases" as DashTab, count: myPurchases.length },
    { label: "Saved", icon: Heart, tab: "saved" as DashTab, count: favorites.length },
    { label: "Messages", icon: MessageSquare, tab: "messages" as DashTab, count: 3 },
    { label: "Settings", icon: Settings, tab: "settings" as DashTab },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-white to-primary/5 px-4 py-8">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary shadow-md text-xl font-bold text-primary-foreground">
              JD
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Welcome back, John</h1>
              <p className="text-base text-muted-foreground">john.doe@email.com · Member since Jan 2024</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-white">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4">
          {tabs.map((t) => (
            <button
              key={t.tab}
              onClick={() => setTab(t.tab)}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.tab ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" strokeWidth={1.5} />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="ml-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-2 py-0.5">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                    <p className="text-2xl font-bold text-foreground">{myListings.length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purchases</p>
                    <p className="text-2xl font-bold text-foreground">{myPurchases.length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Saved Vehicles</p>
                    <p className="text-2xl font-bold text-foreground">{favorites.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-surface border border-border">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/sell" className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90">
                  Post a Car
                </Link>
                <Link to="/search" className="rounded-lg border border-primary text-primary px-6 py-2 text-sm font-medium transition-all hover:bg-primary/5">
                  Browse Cars
                </Link>
                <Link to="/messages" className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary">
                  Messages
                </Link>
              </div>
            </div>
          </div>
        )}

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

        {tab === "seller" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-r from-primary/10 to-white p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-2">Seller Performance</h3>
              <p className="text-muted-foreground">Your stats as a seller on Drive Thrive Market</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">8.5</p>
                <p className="text-xs text-muted-foreground mt-1">Seller Rating</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border text-center">
                <Eye className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">1,240</p>
                <p className="text-xs text-muted-foreground mt-1">Total Views</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border text-center">
                <ShoppingBag className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Sold Items</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-surface border border-border text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">$156K</p>
                <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
              </div>
            </div>
          </div>
        )}

        {tab === "saved" && (
          <div className="text-center py-12">
            <Heart className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{favorites.length} saved vehicle{favorites.length !== 1 ? "s" : ""}</p>
            <Link to="/favorites" className="mt-2 inline-block text-sm text-primary hover:underline">View saved vehicles</Link>
          </div>
        )}

        {tab === "messages" && (
          <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
            <div className="lg:order-2 space-y-2 lg:border-l border-border lg:pl-6">
              <h3 className="font-bold text-foreground mb-4">Your Conversations</h3>
              {["Prestige Motors", "Michael Chen", "Stuttgart Auto Gallery"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-4 border border-border shadow-surface transition-all hover:shadow-surface-md cursor-pointer hover:border-primary/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary shrink-0">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{name}</p>
                    <p className="text-xs text-muted-foreground truncate">Thanks for your interest in the vehicle...</p>
                  </div>
                  <div className="text-xs text-muted-foreground text-right shrink-0">{i === 0 ? "2m" : i === 1 ? "1h" : "3d"}</div>
                </div>
              ))}
            </div>

            <div className="lg:order-1 rounded-xl bg-white border border-border shadow-surface overflow-hidden flex flex-col h-[500px]">
              <div className="border-b border-border p-4 flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    P
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Prestige Motors</p>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-xs bg-secondary p-3 rounded-lg text-sm text-foreground">
                    <p>Hi, I'm interested in your 2024 BMW M4. Is it still available?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-xs bg-primary text-primary-foreground p-3 rounded-lg text-sm">
                    <p>Yes, it's still available! Would you like to schedule a test drive?</p>
                    <p className="text-xs text-primary-foreground/70 mt-1">10:45 AM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-xs bg-secondary p-3 rounded-lg text-sm text-foreground">
                    <p>That sounds great. What times work best for you?</p>
                    <p className="text-xs text-muted-foreground mt-1">10:50 AM</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <button className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-all">
                  <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-xl bg-white p-8 shadow-surface border border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Full Name</label>
                  <input defaultValue="John Doe" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Email</label>
                  <input defaultValue="john.doe@email.com" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-foreground">Phone</label>
                  <input defaultValue="+1 (555) 123-4567" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </div>
              <button className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95">
                Save Changes
              </button>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-surface border border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Seller Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Enable notifications for new messages</p>
                    <p className="text-sm text-muted-foreground">Get alerts when buyers contact you</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Show phone number to buyers</p>
                    <p className="text-sm text-muted-foreground">Make it easier for buyers to contact you</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
