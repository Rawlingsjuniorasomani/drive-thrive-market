import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Camera, X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { makes, bodyTypes, fuelTypes, transmissions, conditions } from "@/data/cars";

const SellCarPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const selectClass = "w-full rounded-xl bg-white border border-border px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all";
  const inputClass = selectClass;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="border-b border-border bg-white px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">List Your Vehicle</h1>
          <p className="text-base text-muted-foreground mt-2">Step {step} of {totalSteps} - Complete your listing details</p>
          <div className="mt-6 flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div className={`h-2.5 flex-1 rounded-full transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />
                {i < totalSteps - 1 && <div className="w-1 h-1 rounded-full bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-12">
        {step === 1 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-8 shadow-surface border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Make</label>
                <select className={selectClass}>
                  <option value="">Select Make</option>
                  {makes.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Model</label>
                <input placeholder="e.g. M4 Competition" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Year</label>
                <input type="number" placeholder="2024" className={`${inputClass} font-mono-data`} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Body Type</label>
                <select className={selectClass}>
                  <option value="">Select Type</option>
                  {bodyTypes.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Type</label>
                <select className={selectClass}>
                  <option value="">Select</option>
                  {fuelTypes.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Transmission</label>
                <select className={selectClass}>
                  <option value="">Select</option>
                  {transmissions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Mileage</label>
                <input type="number" placeholder="12,000" className={`${inputClass} font-mono-data`} />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Condition</label>
                <select className={selectClass}>
                  <option value="">Select</option>
                  {conditions.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">VIN (Optional)</label>
              <input placeholder="e.g. WBA5A5C55FD901234" className={`${inputClass} font-mono-data tracking-wider`} />
            </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-8 shadow-surface border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Photos & Description</h2>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Photos (up to 20)</label>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                <button className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary hover:bg-primary/10">
                  <Camera className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium text-primary">Add Photo</span>
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea
                rows={5}
                placeholder="Describe your vehicle's condition, history, and any notable features..."
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Color</label>
              <input placeholder="e.g. Isle of Man Green" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Engine</label>
              <input placeholder="e.g. 3.0L Twin-Turbo I6" className={inputClass} />
            </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-8 shadow-surface border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Pricing & Listing Type</h2>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Asking Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <input type="number" placeholder="0" className={`${inputClass} pl-7 font-mono-data text-lg font-semibold`} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Listing Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Standard", desc: "Free · 30 days", selected: true },
                  { label: "Featured", desc: "$29 · 30 days", selected: false },
                  { label: "Urgent", desc: "$49 · 14 days", selected: false },
                ].map((type) => (
                  <button
                    key={type.label}
                    className={`rounded-xl p-4 text-left transition border ${
                      type.selected ? "bg-primary/10 border-primary ring-2 ring-primary/20" : "bg-white border-border hover:border-primary hover:shadow-surface"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">{type.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Location</label>
              <input placeholder="City, State" className={inputClass} />
            </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back
            </button>
          ) : <div />}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90 active:scale-95"
            >
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ) : (
            <button className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-md transition hover:opacity-90 active:scale-95">
              <Check className="h-4 w-4" strokeWidth={1.5} />
              Submit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellCarPage;
