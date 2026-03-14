import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Camera, X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { makes, bodyTypes, fuelTypes, transmissions, conditions } from "@/data/cars";

const SellCarPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const selectClass = "w-full rounded-md bg-secondary px-3 py-2.5 text-sm text-foreground outline-none ring-subtle focus:ring-2 focus:ring-primary/20 transition-all";
  const inputClass = selectClass;

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card px-4 py-4">
        <div className="container mx-auto">
          <h1 className="text-lg font-semibold text-foreground">Post Your Vehicle</h1>
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Vehicle Information</h2>
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
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Photos & Description</h2>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Photos (up to 20)</label>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                <button className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/50 transition hover:border-primary/30 hover:bg-secondary">
                  <Camera className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium text-muted-foreground">Add Photo</span>
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
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Pricing & Listing Type</h2>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Asking Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <input type="number" placeholder="0" className={`${inputClass} pl-7 font-mono-data text-lg font-semibold`} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Listing Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Standard", desc: "Free · 30 days", selected: true },
                  { label: "Featured", desc: "$29 · 30 days", selected: false },
                  { label: "Urgent", desc: "$49 · 14 days", selected: false },
                ].map((type) => (
                  <button
                    key={type.label}
                    className={`rounded-lg p-3 text-left ring-subtle transition ${
                      type.selected ? "bg-primary/10 ring-2 ring-primary" : "bg-card shadow-surface hover:bg-secondary"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{type.label}</p>
                    <p className="text-[10px] text-muted-foreground">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Location</label>
              <input placeholder="City, State" className={inputClass} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back
            </button>
          ) : <div />}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition active:scale-95"
            >
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ) : (
            <button className="flex items-center gap-2 rounded-md bg-success px-5 py-2.5 text-sm font-medium text-success-foreground transition active:scale-95">
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
