import { useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { Search, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { cars } from "@/data/cars";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";

const SearchPage = () => {
  const { filters, setFilters } = useStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let result = cars.filter((c) => c.status === "active");

    if (filters.search) {
      result = matchSorter(result, filters.search, {
        keys: ["make", "model", "year", "bodyType", "fuelType", "color", "engine"],
      });
    }
    if (filters.make) result = result.filter((c) => c.make === filters.make);
    if (filters.bodyType) result = result.filter((c) => c.bodyType === filters.bodyType);
    if (filters.fuelType) result = result.filter((c) => c.fuelType === filters.fuelType);
    if (filters.transmission) result = result.filter((c) => c.transmission === filters.transmission);
    if (filters.condition) result = result.filter((c) => c.condition === filters.condition);
    if (filters.priceMin) result = result.filter((c) => c.price >= filters.priceMin);
    if (filters.priceMax && filters.priceMax < 500000) result = result.filter((c) => c.price <= filters.priceMax);

    switch (filters.sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "mileage": result.sort((a, b) => a.mileage - b.mileage); break;
      case "popular": result.sort((a, b) => b.views - a.views); break;
      case "newest": default: result.sort((a, b) => new Date(b.listed).getTime() - new Date(a.listed).getTime()); break;
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Search make, model, or keyword..."
                className="w-full rounded-md bg-secondary py-2.5 pl-9 pr-4 text-sm text-foreground outline-none ring-subtle placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex h-10 items-center gap-2 rounded-md bg-secondary px-3 text-sm font-medium text-foreground md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        {/* Desktop Sidebar */}
        <div className="hidden w-[280px] shrink-0 md:block">
          <div className="sticky top-20 rounded-lg bg-card p-5 shadow-surface ring-subtle">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden" onClick={() => setShowMobileFilters(false)}>
            <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-card p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-mono-data font-semibold text-foreground">{filteredCars.length}</span> vehicles found
            </p>
          </div>

          {filteredCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-10 w-10 text-muted-foreground/30" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-foreground">No vehicles match these specifications</h3>
              <p className="mt-1 text-xs text-muted-foreground">Try widening your price range or removing some filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
