import { useState } from "react";
import { TrendingUp } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const defaultCosts = {
  seeds: 12000,
  fertilizer: 8000,
  labour: 15000,
  pesticides: 6000,
  irrigation: 4500,
  equipment: 9000,
  transport: 5000,
  yield: 2200,
  sellingPrice: 22
};

export default function FarmProfitCalculator() {
  const [costs, setCosts] = useState(defaultCosts);

  const totalCost =
    costs.seeds +
    costs.fertilizer +
    costs.labour +
    costs.pesticides +
    costs.irrigation +
    costs.equipment +
    costs.transport;

  const revenue = costs.yield * costs.sellingPrice;
  const profit = revenue - totalCost;

  return (
    <div className="rounded-[28px] border border-[#dfe7df] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7a53]">Farm Cost & Profit</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Business snapshot</h3>
        </div>
        <div className="rounded-full bg-[#eef9ff] p-2 text-[#1868a8]">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {Object.entries({
          seeds: "Seeds",
          fertilizer: "Fertilizers",
          labour: "Labour",
          pesticides: "Pesticides",
          irrigation: "Irrigation",
          equipment: "Equipment",
          transport: "Transport"
        }).map(([key, label]) => (
          <label key={key} className="grid grid-cols-[1fr_1.2fr] items-center gap-3 text-sm text-slate-700">
            <span>{label}</span>
            <input
              type="number"
              min={0}
              value={costs[key as keyof typeof costs]}
              onChange={(event) =>
                setCosts({
                  ...costs,
                  [key]: Number(event.target.value) || 0
                })
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right outline-none transition focus:border-[#1a7a5c] focus:bg-white"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Expected yield (KG)</span>
          <input
            type="number"
            min={0}
            value={costs.yield}
            onChange={(event) => setCosts({ ...costs, yield: Number(event.target.value) || 0 })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#1a7a5c] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Selling price (₹/KG)</span>
          <input
            type="number"
            min={0}
            step={1}
            value={costs.sellingPrice}
            onChange={(event) => setCosts({ ...costs, sellingPrice: Number(event.target.value) || 0 })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#1a7a5c] focus:bg-white"
          />
        </label>
      </div>

      <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Total cost</div>
            <div className="mt-2 text-xl font-bold text-slate-800">{formatCurrency(totalCost)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Revenue</div>
            <div className="mt-2 text-xl font-bold text-slate-800">{formatCurrency(revenue)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Estimated profit</div>
            <div className={`mt-2 text-xl font-bold ${profit >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
              {formatCurrency(profit)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
