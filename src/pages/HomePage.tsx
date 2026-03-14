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
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-20 md:py-40">
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Find Your Perfect Vehicle
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-wrap-pretty md:text-xl">
              Explore thousands of quality cars from trusted sellers. Buy, sell, or list your vehicle with confidence on Drive Thrive Market.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mt-10 flex max-w-2xl gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search make, model, or keyword..."
                className="w-full rounded-xl bg-white py-4 pl-12 pr-4 text-base text-foreground shadow-surface-lg outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-all border border-border"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 shadow-md hover:shadow-lg"
            >
              Search
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </button>
          </motion.form>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-surface border border-border">
                <div className="rounded-lg bg-primary/10 p-3 mt-1">
                  <stat.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-mono-data text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
        <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-6">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat.filter)}
              className="group flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-surface ring-subtle transition-all hover:-translate-y-1 hover:shadow-surface-lg hover:ring-2 hover:ring-primary/20 active:scale-95 border border-border"
            >
              <div className="rounded-lg bg-primary/10 p-3 transition-all group-hover:bg-primary group-hover:text-white">
                <cat.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold text-foreground">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Featured Vehicles</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked selections from our best sellers</p>
          </div>
          <button onClick={() => navigate("/search")} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            View all <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="container mx-auto px-4 py-16 pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recently Listed</h2>
            <p className="mt-1 text-muted-foreground">Latest additions to our marketplace</p>
          </div>
          <button onClick={() => navigate("/search")} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95">
            View all <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
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
