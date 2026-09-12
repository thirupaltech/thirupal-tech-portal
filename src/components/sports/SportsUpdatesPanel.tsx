import { ArrowRight, Calendar, ChevronRight, CircleHelp, Medal, Plus, Trophy } from "lucide-react";

import { quickLinks, sportsFocusAreas, sportsLeaderboard, sportsUpdates } from "./sportsData";

export default function SportsUpdatesPanel() {
  return (
    <div className="mt-10 grid gap-8 xl:grid-cols-[1.55fr_0.9fr]">
      <section className="rounded-[24px] border border-[#f1e2c0] bg-[#fffaf1] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0d8] text-[#a36812] shadow-sm">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="text-3xl font-bold tracking-[-0.03em] text-slate-800">Sports Highlights</h3>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#f3e4b8] bg-white px-3 py-2 text-sm font-medium text-[#8a5b17] transition hover:border-[#ebd7a2] hover:bg-[#fff4de]"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {sportsUpdates.map((update) => (
            <div key={update.title} className="flex gap-4 rounded-[18px] bg-white/80 p-3 shadow-sm ring-1 ring-[#f4e8cc] md:p-4">
              <div className="flex min-w-[72px] flex-col items-center justify-center rounded-2xl bg-[#fff4df] px-2 py-3 text-[#8a5b17] ring-1 ring-[#f3dbad]">
                <span className="text-2xl font-bold leading-none">{update.date}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em]">{update.month}</span>
                <span className="text-[10px] font-medium tracking-[0.08em] text-slate-500">{update.year}</span>
              </div>

              <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center rounded-full bg-[#fff1d5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#99611d]">
                    {update.badge}
                  </div>
                  <h4 className="mt-2 text-lg font-bold text-slate-800">{update.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{update.detail}</p>
                </div>

                <button
                  type="button"
                  className="whitespace-nowrap rounded-full bg-[#fff1da] px-3 py-2 text-xs font-semibold text-[#8a5b17] transition hover:bg-[#fce9c6]"
                >
                  {update.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="overflow-hidden rounded-[24px] border border-[#f1e2c0] bg-[#fff6e6] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80"
              alt="Players celebrating a match victory"
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211d17]/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-white">
              <p className="text-[1.7rem] font-semibold leading-none tracking-[-0.04em]">
                Train hard.<br />Play together.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#f1e2c0] bg-[#fff8ec] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#a86818] ring-1 ring-[#f4e6c7]">
              <Medal className="h-4 w-4" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Leaderboard</h4>
          </div>

          <div className="space-y-3">
            {sportsLeaderboard.map((team, index) => (
              <div
                key={team.name}
                className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-3 text-sm text-slate-700 ring-1 ring-[#f1e5ca]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff1d6] font-bold text-[#975d19]">
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">{team.name}</div>
                    <div className="text-xs text-slate-500">{team.badge}</div>
                  </div>
                </div>
                <span className="font-bold text-[#9b611d]">{team.points} pts</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] border border-[#f1e2c0] bg-white/60 p-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3d9] text-[#9d621e]">
                <CircleHelp className="h-4 w-4" />
              </div>
              <p className="leading-6">
                Want to host a local match, skill clinic or youth championship? Share your idea with the community sports team.
              </p>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ad6d20] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(173,109,32,0.2)] transition hover:bg-[#8b5415]"
            >
              Share Event
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#f1e2c0] bg-[#fffaf2] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#ab6d1d] ring-1 ring-[#f4e7c9]">
              <Calendar className="h-4 w-4" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Quick Links</h4>
          </div>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl bg-white/80 px-3 py-3 text-left text-sm font-medium text-[#67481b] transition hover:bg-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#b7781f]" />
                    {link}
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#a86818]" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-[#f1e2c0] bg-[#fff8ec] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#8d5818] ring-1 ring-[#f3e5c8]">
              <Trophy className="h-4 w-4" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Focus Areas</h4>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {sportsFocusAreas.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-3 text-sm font-medium text-slate-700 ring-1 ring-[#f1e5ca]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1d9] text-[#a86818]">
                  <Icon className="h-4 w-4" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
