import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Users, Car, DollarSign, BarChart3, Settings, LogOut,
  ChevronRight, TrendingUp, TrendingDown, Eye, BadgeCheck, Clock, AlertTriangle,
  Check, X, MoreHorizontal, Search, Filter
} from "lucide-react";
import { cars, formatPrice } from "@/data/cars";

type Tab = "overview" | "listings" | "users" | "transactions";

const mockUsers = [
  { id: "u1", name: "James Morrison", email: "james@email.com", role: "buyer", status: "active", joined: "2025-09-30", listings: 0 },
  { id: "u2", name: "Sarah Williams", email: "sarah@email.com", role: "seller", status: "active", joined: "2024-01-20", listings: 1 },
  { id: "u3", name: "Michael Chen", email: "michael@email.com", role: "seller", status: "active", joined: "2023-11-01", listings: 1 },
  { id: "u4", name: "David Park", email: "david@email.com", role: "seller", status: "suspended", joined: "2025-06-15", listings: 1 },
  { id: "u5", name: "Prestige Motors", email: "info@prestige.com", role: "dealer", status: "active", joined: "2020-03-15", listings: 2 },
  { id: "u6", name: "Stuttgart Auto Gallery", email: "info@stuttgart.com", role: "dealer", status: "active", joined: "2019-08-22", listings: 2 },
];

const mockTransactions = [
  { id: "t1", buyer: "James Morrison", seller: "Prestige Motors", car: "2024 BMW M4 Competition", amount: 76000, status: "completed", date: "2026-03-10" },
  { id: "t2", buyer: "Emily Rodriguez", seller: "Michael Chen", car: "2025 Tesla Model S Plaid", amount: 87500, status: "pending", date: "2026-03-12" },
  { id: "t3", buyer: "Robert Kim", seller: "Silver Star Motors", car: "2024 Mercedes G 63", amount: 180000, status: "disputed", date: "2026-03-08" },
  { id: "t4", buyer: "Amanda Lee", seller: "JDM Performance", car: "2025 Honda Civic Type R", amount: 43500, status: "completed", date: "2026-03-06" },
  { id: "t5", buyer: "Tom Harris", seller: "Euro Auto Haus", car: "2025 VW Golf R", amount: 45000, status: "refunded", date: "2026-03-01" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const kpis = [
    { label: "Total Listings", value: cars.length.toString(), change: "+12%", up: true, icon: Car },
    { label: "Active Users", value: "48,234", change: "+8.3%", up: true, icon: Users },
    { label: "Revenue", value: "$124,500", change: "+23%", up: true, icon: DollarSign },
    { label: "Pending Reviews", value: "7", change: "-3", up: false, icon: Clock },
  ];

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, tab: "overview" as Tab },
    { label: "Listings", icon: Car, tab: "listings" as Tab },
    { label: "Users", icon: Users, tab: "users" as Tab },
    { label: "Transactions", icon: DollarSign, tab: "transactions" as Tab },
  ];

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      sold: "bg-muted text-muted-foreground",
      expired: "bg-destructive/10 text-destructive",
      completed: "bg-success/10 text-success",
      disputed: "bg-destructive/10 text-destructive",
      refunded: "bg-muted text-muted-foreground",
      suspended: "bg-destructive/10 text-destructive",
    };
    return (
      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status] || "bg-muted text-muted-foreground"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`sticky top-0 h-screen border-r border-border bg-white shadow-sm transition-all duration-300 ${sidebarExpanded ? "w-60" : "w-16"}`}>
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary shadow-md">
            <span className="text-sm font-bold text-primary-foreground">DT</span>
          </div>
          {sidebarExpanded && <div>
            <span className="text-xs font-bold uppercase text-muted-foreground">Admin</span>
            <p className="text-sm font-semibold text-foreground">Control Panel</p>
          </div>}
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === item.tab
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {sidebarExpanded && item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {sidebarExpanded && "Back to Site"}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-foreground">Dashboard Overview</h1>

            {/* KPIs */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-lg bg-card p-5 shadow-surface ring-subtle">
                  <div className="flex items-center justify-between">
                    <kpi.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    <div className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                      {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="mt-3 font-mono-data text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg bg-card p-5 shadow-surface ring-subtle">
              <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
              <div className="mt-4 space-y-3">
                {[
                  { text: "New listing submitted: 2025 BMW M2", time: "2 min ago", icon: Car, color: "text-primary" },
                  { text: "User 'David Park' flagged for review", time: "15 min ago", icon: AlertTriangle, color: "text-warning" },
                  { text: "Transaction completed: Honda Civic Type R", time: "1 hour ago", icon: Check, color: "text-success" },
                  { text: "New dealer registration: Pacific Toyota", time: "3 hours ago", icon: BadgeCheck, color: "text-primary" },
                  { text: "Dispute opened: Mercedes G 63 sale", time: "5 hours ago", icon: AlertTriangle, color: "text-destructive" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary">
                    <activity.icon className={`h-4 w-4 shrink-0 ${activity.color}`} strokeWidth={1.5} />
                    <span className="flex-1 text-sm text-foreground">{activity.text}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "listings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-foreground">Listings Management</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                  <input
                    placeholder="Search listings..."
                    className="rounded-md bg-secondary py-2 pl-9 pr-4 text-sm outline-none ring-subtle placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-card shadow-surface ring-subtle">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Vehicle</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Seller</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Views</th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} className="group border-b border-border transition-colors hover:bg-secondary/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={car.images[0]} alt="" className="h-10 w-14 rounded object-cover" />
                          <div>
                            <p className="font-medium text-foreground">{car.year} {car.make} {car.model}</p>
                            <p className="font-mono-data text-xs text-muted-foreground">{car.vin}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono-data font-semibold text-foreground">{formatPrice(car.price)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {car.seller.verified && <BadgeCheck className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />}
                          <span className="text-foreground">{car.seller.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{statusBadge(car.status)}</td>
                      <td className="px-4 py-3 font-mono-data text-muted-foreground">{car.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button className="rounded p-1.5 text-success hover:bg-success/10"><Check className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          <button className="rounded p-1.5 text-destructive hover:bg-destructive/10"><X className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          <button className="rounded p-1.5 text-muted-foreground hover:bg-secondary"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-foreground">User Management</h1>
            <div className="overflow-hidden rounded-lg bg-card shadow-surface ring-subtle">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">User</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Joined</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Listings</th>
                    <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="group border-b border-border transition-colors hover:bg-secondary/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{statusBadge(user.status)}</td>
                      <td className="px-4 py-3 font-mono-data text-muted-foreground">{user.joined}</td>
                      <td className="px-4 py-3 font-mono-data text-muted-foreground">{user.listings}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="rounded p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-foreground">Transaction Management</h1>
            <div className="overflow-hidden rounded-lg bg-card shadow-surface ring-subtle">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Transaction</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Buyer</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Seller</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border transition-colors hover:bg-secondary/50">
                      <td className="px-4 py-3 font-medium text-foreground">{tx.car}</td>
                      <td className="px-4 py-3 text-foreground">{tx.buyer}</td>
                      <td className="px-4 py-3 text-foreground">{tx.seller}</td>
                      <td className="px-4 py-3 font-mono-data font-semibold text-foreground">{formatPrice(tx.amount)}</td>
                      <td className="px-4 py-3">{statusBadge(tx.status)}</td>
                      <td className="px-4 py-3 font-mono-data text-muted-foreground">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
