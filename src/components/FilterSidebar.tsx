import { useStore } from "@/store/useStore";
import { makes, bodyTypes, fuelTypes, transmissions, conditions } from "@/data/cars";
import { X, SlidersHorizontal } from "lucide-react";

const FilterSidebar = () => {
  const { filters, setFilters, resetFilters } = useStore();

  const hasActiveFilters = filters.make || filters.bodyType || filters.fuelType || filters.transmission || filters.condition;

  const selectClass = "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer";

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" strokeWidth={1.5} />
          <h2 className="font-bold text-foreground">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Make</label>
          <select value={filters.make} onChange={(e) => setFilters({ make: e.target.value })} className={selectClass}>
            <option value="">All Makes</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Body Type</label>
          <select value={filters.bodyType} onChange={(e) => setFilters({ bodyType: e.target.value })} className={selectClass}>
            <option value="">All Types</option>
            {bodyTypes.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Fuel Type</label>
          <select value={filters.fuelType} onChange={(e) => setFilters({ fuelType: e.target.value })} className={selectClass}>
            <option value="">All Fuel Types</option>
            {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Transmission</label>
          <select value={filters.transmission} onChange={(e) => setFilters({ transmission: e.target.value })} className={selectClass}>
            <option value="">All</option>
            {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Condition</label>
          <select value={filters.condition} onChange={(e) => setFilters({ condition: e.target.value })} className={selectClass}>
            <option value="">All</option>
            {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ""}
              onChange={(e) => setFilters({ priceMin: Number(e.target.value) || 0 })}
              className={`${selectClass} font-mono-data`}
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax === 500000 ? "" : filters.priceMax}
              onChange={(e) => setFilters({ priceMax: Number(e.target.value) || 500000 })}
              className={`${selectClass} font-mono-data`}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">Sort By</label>
          <select value={filters.sortBy} onChange={(e) => setFilters({ sortBy: e.target.value as any })} className={selectClass}>
            <option value="newest">Newest Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="mileage">Lowest Mileage</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
