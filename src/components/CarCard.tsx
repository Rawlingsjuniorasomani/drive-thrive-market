import { Link } from "react-router-dom";
import { Heart, Eye, BadgeCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Car, formatPrice, formatMileage } from "@/data/cars";
import { useStore } from "@/store/useStore";

interface CarCardProps {
  car: Car;
  index?: number;
}

const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const { favorites, toggleFavorite } = useStore();
  const isFavorited = favorites.includes(car.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.2, 0, 0, 1] }}
    >
      <Link
        to={`/car/${car.id}`}
        className="group block overflow-hidden rounded-lg bg-card shadow-surface ring-subtle transition-all duration-300 hover:-translate-y-0.5 hover:shadow-surface-md"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={car.images[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(car.id); }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isFavorited ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
              strokeWidth={1.5}
            />
          </button>
          {car.featured && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              Featured
            </div>
          )}
          {car.condition === "New" && (
            <div className="absolute bottom-3 left-3 rounded-full bg-success px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success-foreground">
              New
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{car.engine} · {car.transmission}</p>
            </div>
            <div className="inline-flex items-baseline gap-0.5 rounded-full bg-foreground px-2.5 py-1 shrink-0">
              <span className="text-[10px] font-medium text-background/70">$</span>
              <span className="font-mono-data text-xs font-bold text-background">{car.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono-data">{formatMileage(car.mileage)} mi</span>
            <span>·</span>
            <span>{car.fuelType}</span>
            <span>·</span>
            <span>{car.bodyType}</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-1.5">
              {car.seller.verified && <BadgeCheck className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />}
              <span className="text-xs text-muted-foreground">{car.seller.name}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {car.seller.location.split(", ")[1]}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
