import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sportsModules } from "./sportsData";

export default function SportsProgramGrid() {
  const navigate = useNavigate();

  const handleOpen = (title: string) => {
    if (title === "Cricket Live Score") {
      navigate("/community/sports/cricket-live-score");
      return;
    }

    navigate("/community/sports");
  };

  return (
    <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {sportsModules.map(({ title, description, icon: Icon, accent, border, tag, highlights }) => (
        <article
          key={title}
          className={`group rounded-[24px] border ${border} ${accent} p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_28px_rgba(15,23,42,0.08)]`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/60 text-[#ba7a22] shadow-sm">
              <Icon className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7b5a26]">
              {tag}
            </span>
          </div>

          <h2 className="mt-5 text-[1.08rem] font-bold leading-tight text-slate-800">{title}</h2>

          <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>

          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d78a27]" />
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => handleOpen(title)}
            className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#b7781f] text-white shadow-sm transition group-hover:translate-x-1 group-hover:bg-[#915d15]"
            aria-label={`Open ${title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>
      ))}
    </section>
  );
}
