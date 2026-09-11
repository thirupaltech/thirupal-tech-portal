import { ArrowLeft, Droplets } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AgricultureFeatureGrid from "../components/agriculture/AgricultureFeatureGrid";
import CropPlannerCard from "../components/agriculture/CropPlannerCard";
import EquipmentMarketplace from "../components/agriculture/EquipmentMarketplace";
import FarmProfitCalculator from "../components/agriculture/FarmProfitCalculator";
import ProduceMarketplace from "../components/agriculture/ProduceMarketplace";

export default function AgriculturePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedView = searchParams.get("view");

  const handleSelect = (slug: string) => {
    setSearchParams({ view: slug });
  };

  const renderSelectedView = () => {
    switch (selectedView) {
      case "crop-planner":
        return <CropPlannerCard />;
      case "cost-profit":
        return <FarmProfitCalculator />;
      case "sell-produce":
        return <ProduceMarketplace />;
      case "equipment-services":
        return <EquipmentMarketplace />;
      default:
        return null;
    }
  };

  if (!selectedView) {
    return (
      <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[30px] border border-[#dfe6df] bg-[#edf4ee] shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="relative z-20 flex items-center gap-2 px-5 pt-5 text-sm text-slate-600 md:px-7 md:pt-6">
            <button
              type="button"
              onClick={() => navigate("/community")}
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-[#4f7a53] transition hover:bg-white/60 hover:text-[#2a5541]"
            >
              <ArrowLeft className="h-4 w-4" />
              Community
            </button>
            <span className="text-slate-400">/</span>
            <span className="font-medium text-slate-700">Agriculture</span>
          </div>

          <div className="relative z-10 grid gap-8 px-5 pb-6 pt-4 md:px-7 md:pb-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-6">
            <div className="relative overflow-hidden rounded-[28px] border border-[#dfeee1] bg-[linear-gradient(135deg,#0f4f3c_0%,#1d7c56_45%,#a5d7ac_100%)] p-6 text-white shadow-[0_20px_45px_rgba(13,71,49,0.25)] md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_32%)]" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-emerald-50 uppercase">
                  <span className="text-base">🌱</span>
                  Smart farming
                </div>

                <h1 className="text-3xl font-black leading-tight md:text-4xl lg:text-[3rem]">Grow better. Sell smarter. Farm with confidence.</h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-50/90 md:text-base">
                  A practical agriculture module for crop planning, cost forecasting, produce sales, and essential farm services built for rural communities.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelect("crop-planner")}
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#165a42] shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:bg-emerald-50"
                  >
                    Crop Planner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect("cost-profit")}
                    className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Profit Calculator
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { label: "Seasonal crops", value: "18+" },
                { label: "Avg. yield", value: "2.4T" },
                { label: "Marketplace", value: "24/7" }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-[#dfeee1] bg-white/70 p-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{item.label}</div>
                  <div className="mt-3 text-2xl font-black text-[#1f6a4f]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AgricultureFeatureGrid onSelect={handleSelect} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-6 lg:px-8">
      <section className="mb-6 rounded-[28px] border border-[#e5efe6] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-3 py-2 text-sm font-semibold text-[#2a5541] transition hover:bg-[#dfeee2]"
          >
            <ArrowLeft className="h-4 w-4" />
            All modules
          </button>

          <button
            type="button"
            onClick={() => navigate("/community")}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Back to Community
          </button>
        </div>
      </section>

      {selectedView === "cost-profit" ? (
        <div className="rounded-[30px] border border-[#dfe7df] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:p-6">
          {renderSelectedView()}
        </div>
      ) : (
        renderSelectedView()
      )}

      {selectedView === "crop-planner" || selectedView === "cost-profit" ? (
        <section className="mt-12 rounded-[28px] border border-[#dfe7df] bg-[linear-gradient(135deg,#f0f9f3_0%,#edf5ff_100%)] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7a53]">Agri support</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-800">Built for practical seasonal farming decisions</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2a5c4a] shadow-sm">
              <Droplets className="h-4 w-4" />
              Water-smart planning
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
