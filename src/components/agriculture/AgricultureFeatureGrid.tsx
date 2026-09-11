import { ArrowRight } from "lucide-react";

import { featureCards } from "./agricultureData";

type AgricultureFeatureGridProps = {
  onSelect: (slug: string) => void;
};

export default function AgricultureFeatureGrid({ onSelect }: AgricultureFeatureGridProps) {
  return (
    <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {featureCards.map(({ slug, title, description, icon: Icon, accent, button }) => (
        <article
          key={title}
          className={`group rounded-[22px] border ${accent} p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(15,23,42,0.08)]`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-white/60 text-[#1d8f72] shadow-sm">
            <Icon className="h-7 w-7" strokeWidth={1.8} />
          </div>

          <h2 className="mt-5 text-[1.06rem] font-bold leading-tight text-slate-800">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>

          <button
            type="button"
            onClick={() => onSelect(slug)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1a7a5c] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition group-hover:bg-[#135a47]"
          >
            {button}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </article>
      ))}
    </section>
  );
}
