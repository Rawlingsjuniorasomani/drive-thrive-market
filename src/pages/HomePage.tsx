import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Car, Zap, Truck, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { cars, formatPrice } from "@/data/cars";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/CarCard";

const categories = [
  { label: "Sedans", icon: Car, filter: "Sedan" },
  { label: "SUVs", icon: Truck, filter: "SUV" },
  { label: "Coupes", icon: Car, filter: "Coupe" },
  { label: "Trucks", icon: Truck, filter: "Truck" },
  { label: "Electric", icon: Zap, filter: "Electric" },
  { label: "Hatchbacks", icon: Car, filter: "Hatchback" },
];

const stats = [
  { label: "Active Listings", value: "12,400+", icon: TrendingUp },
  { label: "Registered Users", value: "48,000+", icon: Users },
  { label: "Successful Sales", value: "9,200+", icon: Shield },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { setFilters } = useStore();

  const featuredCars = cars.filter((c) => c.featured).slice(0, 6);
  const recentCars = cars.filter((c) => !c.featured).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchQuery });
    navigate("/search");
  };

  const handleCategoryClick = (filter: string) => {
    if (filter === "Electric") {
      setFilters({ fuelType: "Electric" });
    } else {
      setFilters({ bodyType: filter });
    }
    navigate("/search");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
        <div className="container relative mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl font-semibold tracking-tight text-background md:text-5xl">
              The definitive exchange for quality vehicles.
            </h1>
            <p className="mt-4 text-base text-background/60 text-wrap-pretty md:text-lg">
              Browse thousands of verified listings from trusted sellers and dealers. Every vehicle, every detail, transparently presented.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mt-8 flex max-w-xl gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search make, model, or keyword..."
                className="w-full rounded-lg bg-card py-3 pl-10 pr-4 text-sm text-foreground shadow-surface-lg outline-none ring-subtle placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Search
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </motion.form>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="font-mono-data text-lg font-bold text-background">{stat.value}</p>
                  <p className="text-xs text-background/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-lg font-semibold text-foreground">Browse by Category</h2>
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.filter)}
              className="flex flex-col items-center gap-2 rounded-lg bg-card p-4 shadow-surface ring-subtle transition-all hover:-translate-y-0.5 hover:shadow-surface-md active:scale-95"
            >
              <cat.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs font-medium text-foreground">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Featured Vehicles</h2>
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recently Listed</h2>
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
