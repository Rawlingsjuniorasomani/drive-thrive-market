import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/CarCard";

const FavoritesPage = () => {
  const { favorites } = useStore();
  const favoritedCars = cars.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto">
          <h1 className="text-lg font-semibold text-foreground">Saved Vehicles</h1>
          <p className="text-sm text-muted-foreground">{favoritedCars.length} vehicle{favoritedCars.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {favoritedCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="mb-4 h-10 w-10 text-muted-foreground/30" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-foreground">No saved vehicles yet</h3>
            <p className="mt-1 text-xs text-muted-foreground">Browse listings and tap the heart icon to save vehicles here.</p>
            <Link to="/search" className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoritedCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
