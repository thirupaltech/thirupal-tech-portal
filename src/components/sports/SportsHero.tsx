import { ArrowLeft, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SportsHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#f2e6d1] bg-[#fff7eb] shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
      <div className="relative z-20 flex items-center gap-2 px-5 pt-5 text-sm text-slate-600 md:px-7 md:pt-6">
        <button
          type="button"
          onClick={() => navigate("/community")}
          className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-[#9a5b17] transition hover:bg-white/70 hover:text-[#724410]"
        >
          <ArrowLeft className="h-4 w-4" />
          Community
        </button>
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-700">Sports</span>
      </div>

      <div className="relative z-10 min-h-[320px] md:min-h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1400&q=80"
          alt="Players cheering during a sports event"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1724]/55 via-[#0e1724]/20 to-transparent" />

        <div className="absolute bottom-6 left-6 z-20 max-w-[560px] space-y-3 text-white md:left-8 md:bottom-8">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100 backdrop-blur-sm">
            Community Sports Hub
          </span>
          <h1 className="text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
            Sports that bring the community together
          </h1>
        </div>

        <div className="absolute bottom-4 right-4 z-20 max-w-[260px] rounded-2xl border border-[#f1d9a0] bg-[#fff9ed]/90 p-4 text-right shadow-lg backdrop-blur-sm md:right-7 md:bottom-7">
          <Quote className="ml-auto mb-2 h-4 w-4 text-[#8b5e1e]" />
          <p className="text-sm font-medium leading-snug text-[#5b3f1b]">
            “True sportsmanship grows stronger when every player and spectator feels included.”
          </p>
        </div>
      </div>
    </section>
  );
}
