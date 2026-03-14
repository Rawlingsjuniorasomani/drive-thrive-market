import { useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Settings2 } from "lucide-react";
import { cars } from "@/data/cars";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";

const SearchPage = () => {
  const { filters, setFilters } = useStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(12);

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

  const totalPages = Math.ceil(filteredCars.length / resultsPerPage);
  const startIdx = (currentPage - 1) * resultsPerPage;
  const paginatedCars = filteredCars.slice(startIdx, startIdx + resultsPerPage);

  const handleResultsPerPageChange = (newPerPage: number) => {
    setResultsPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="border-b border-border bg-white px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                placeholder="Search make, model, or keyword..."
                className="w-full rounded-xl bg-white border border-border py-3 pl-12 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground md:hidden transition-all hover:opacity-90"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex gap-6 px-4 py-8">
        {/* Desktop Sidebar */}
        <div className="hidden w-[280px] shrink-0 md:block">
          <div className="sticky top-24 rounded-xl bg-white p-6 shadow-surface border border-border">
            <FilterSidebar />
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden" onClick={() => setShowMobileFilters(false)}>
            <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary">
                  <X className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm font-medium text-foreground">
                Showing <span className="font-bold text-primary">{startIdx + 1}</span> - <span className="font-bold text-primary">{Math.min(startIdx + resultsPerPage, filteredCars.length)}</span> of <span className="font-bold text-primary">{filteredCars.length}</span> vehicles
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <label className="text-xs font-medium text-muted-foreground">Per page:</label>
                  <select 
                    value={resultsPerPage} 
                    onChange={(e) => handleResultsPerPageChange(Number(e.target.value))}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-10 w-10 text-muted-foreground/30" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-foreground">No vehicles match these specifications</h3>
              <p className="mt-1 text-xs text-muted-foreground">Try widening your price range or removing some filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedCars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                        }
                        return pageNum <= totalPages ? (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`h-10 w-10 rounded-lg font-medium transition-all ${
                              currentPage === pageNum
                                ? "bg-primary text-primary-foreground"
                                : "border border-border hover:bg-secondary text-foreground"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ) : null;
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Page <span className="font-bold text-foreground">{currentPage}</span> of <span className="font-bold text-foreground">{totalPages}</span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
