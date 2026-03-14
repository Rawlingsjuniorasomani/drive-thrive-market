import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Share2, Flag, BadgeCheck, MapPin, Star, Calendar,
  Gauge, Fuel, Settings, Palette, Zap, ChevronLeft, ChevronRight, X,
  MessageSquare, DollarSign
} from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useStore } from "@/store/useStore";
import CarCard from "@/components/CarCard";

const CarDetailPage = () => {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);
  const { favorites, toggleFavorite } = useStore();
  const [currentImage, setCurrentImage] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  if (!car) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Vehicle not found</h2>
          <Link to="/search" className="mt-2 text-sm text-primary hover:underline">Back to search</Link>
        </div>
      </div>
    );
  }

  const isFavorited = favorites.includes(car.id);
  const relatedCars = cars.filter((c) => c.id !== car.id && (c.make === car.make || c.bodyType === car.bodyType)).slice(0, 3);

  const specs = [
    { label: "Mileage", value: `${formatMileage(car.mileage)} mi`, icon: Gauge },
    { label: "Fuel Type", value: car.fuelType, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Settings },
    { label: "Color", value: car.color, icon: Palette },
    { label: "Horsepower", value: `${car.horsepower} hp`, icon: Zap },
    { label: "Year", value: car.year.toString(), icon: Calendar },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/search" className="flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to results
          </Link>
          <span>/</span>
          <span className="text-foreground">{car.year} {car.make} {car.model}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Left: Gallery + Specs */}
          <div>
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative overflow-hidden rounded-lg"
            >
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src={car.images[currentImage]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="h-full w-full object-cover"
                />
              </div>
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length)}
                    className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition hover:bg-card"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p + 1) % car.images.length)}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition hover:bg-card"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {car.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-1.5 rounded-full transition-all ${i === currentImage ? "w-6 bg-card" : "w-1.5 bg-card/50"}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`aspect-video w-20 overflow-hidden rounded-md transition-all ${i === currentImage ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Specs Grid */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-foreground">Mechanical Specifications</h2>
              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-0.5 rounded-lg bg-card p-3 shadow-surface ring-subtle">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                    <span className="font-mono-data text-sm font-semibold text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engine */}
            <div className="mt-6 rounded-lg bg-card p-4 shadow-surface ring-subtle">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Engine</h3>
              <p className="font-mono-data text-sm font-semibold text-foreground">{car.engine}</p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground">Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-wrap-pretty">{car.description}</p>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground">Features & Equipment</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {car.features.map((f) => (
                  <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{f}</span>
                ))}
              </div>
            </div>

            {/* VIN */}
            <div className="mt-6 rounded-lg bg-card p-4 shadow-surface ring-subtle">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">VIN</h3>
              <p className="font-mono-data text-sm font-semibold tracking-wider text-foreground">{car.vin}</p>
            </div>
          </div>

          {/* Right: Pricing + Seller */}
          <div className="space-y-4">
            <div className="sticky top-20 space-y-4">
              {/* Price Card */}
              <div className="rounded-lg bg-card p-5 shadow-surface-md ring-subtle">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">{car.year} {car.make} {car.model}</h1>
                    <p className="mt-0.5 text-xs text-muted-foreground">{car.condition} · {car.bodyType}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary transition hover:bg-muted"
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? "fill-destructive text-destructive" : "text-muted-foreground"}`} strokeWidth={1.5} />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary transition hover:bg-muted">
                      <Share2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-baseline gap-1 rounded-full bg-foreground px-4 py-1.5">
                  <span className="text-xs font-medium text-background/70">$</span>
                  <span className="font-mono-data text-lg font-bold tracking-tight text-background">{car.price.toLocaleString()}</span>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={() => setShowOfferModal(true)}
                    className="flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                  >
                    <DollarSign className="h-4 w-4" strokeWidth={1.5} />
                    Make an Offer
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-md bg-secondary py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted active:scale-95">
                    <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
                    Contact Seller
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-mono-data">{car.views.toLocaleString()} views</span>
                  <span>·</span>
                  <span className="font-mono-data">{car.saves} saves</span>
                  <span>·</span>
                  <span>Listed {car.listed}</span>
                </div>
              </div>

              {/* Seller Card */}
              <div className="rounded-lg bg-card p-5 shadow-surface ring-subtle">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                    {car.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">{car.seller.name}</span>
                      {car.seller.verified && <BadgeCheck className="h-4 w-4 text-success" strokeWidth={1.5} />}
                    </div>
                    <p className="text-xs text-muted-foreground">{car.seller.type} Seller</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center rounded-md bg-secondary p-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-warning" fill="hsl(var(--warning))" strokeWidth={0} />
                      <span className="font-mono-data text-xs font-semibold text-foreground">{car.seller.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Rating</span>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-secondary p-2">
                    <span className="font-mono-data text-xs font-semibold text-foreground">{car.seller.totalSales}</span>
                    <span className="text-[10px] text-muted-foreground">Sales</span>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-secondary p-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                    <span className="text-[10px] text-muted-foreground">{car.seller.location.split(", ")[1]}</span>
                  </div>
                </div>

                <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" strokeWidth={1.5} />
                  {car.seller.location}
                </p>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-xs text-muted-foreground hover:text-destructive">
                <Flag className="h-3.5 w-3.5" strokeWidth={1.5} />
                Report this listing
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-foreground">Similar Vehicles</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedCars.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setShowOfferModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-md rounded-lg bg-card p-6 shadow-surface-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Make an Offer</h3>
              <button onClick={() => setShowOfferModal(false)}>
                <X className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {car.year} {car.make} {car.model} · Listed at {formatPrice(car.price)}
            </p>
            <div className="mt-4">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Your Offer</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-md bg-secondary py-2.5 pl-7 pr-4 font-mono-data text-sm text-foreground outline-none ring-subtle placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <button
              onClick={() => { setShowOfferModal(false); setOfferAmount(""); }}
              className="mt-4 w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Submit Offer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
