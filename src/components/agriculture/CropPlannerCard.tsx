import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { cropGuide, durationOptions, soilOptions, waterOptions } from "./agricultureData";

export default function CropPlannerCard() {
  const [farmInputs, setFarmInputs] = useState({
    landSize: 2,
    soil: "Red Soil",
    water: "Limited",
    duration: "3-4 months"
  });

  const recommendations = useMemo(() => {
    const match = cropGuide.find(
      (item) => item.soil === farmInputs.soil && item.water === farmInputs.water && item.duration === farmInputs.duration
    );

    if (match) {
      return {
        crops: match.crops,
        note: match.note,
        summary: `${farmInputs.landSize} Acres + ${farmInputs.soil} + ${farmInputs.water} water → ${match.crops.join(" / ")}`
      };
    }

    return {
      crops: ["Groundnut", "Tomato", "Millet"],
      note: "A resilient mix for a compact farm with moderate planning and seasonal irrigation support.",
      summary: `${farmInputs.landSize} Acres + ${farmInputs.soil} + ${farmInputs.water} water → Groundnut / Tomato / Millet`
    };
  }, [farmInputs]);

  return (
    <div className="rounded-[28px] border border-[#dfe7df] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7a53]">Crop Planner</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">What should I grow?</h3>
        </div>
        <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Farm fit</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Land size</span>
          <input
            type="number"
            min={1}
            value={farmInputs.landSize}
            onChange={(event) => setFarmInputs({ ...farmInputs, landSize: Number(event.target.value) || 1 })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Soil type</span>
          <select
            value={farmInputs.soil}
            onChange={(event) => setFarmInputs({ ...farmInputs, soil: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            {soilOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Water availability</span>
          <select
            value={farmInputs.water}
            onChange={(event) => setFarmInputs({ ...farmInputs, water: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            {waterOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Crop duration</span>
          <select
            value={farmInputs.duration}
            onChange={(event) => setFarmInputs({ ...farmInputs, duration: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
          >
            {durationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Suggested plan</span>
        </div>
        <p className="mt-3 text-lg font-bold text-slate-800">{recommendations.summary}</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{recommendations.note}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {recommendations.crops.map((crop) => (
            <span key={crop} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
