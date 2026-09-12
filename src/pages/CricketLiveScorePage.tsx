import { useState } from "react";
import {
  ArrowLeft,
  BellRing,
  CircleDot,
  Clock3,
  Gauge,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = ["Overview", "Scorecard", "Commentary", "Insights", "Fixtures"] as const;
type Tab = (typeof tabs)[number];

type MatchSelection = {
  id: string;
  title: string;
  shortTitle: string;
  status: string;
  battingTeam: string;
  bowlingTeam: string;
  scoreboard: string;
  overs: string;
  target: string;
  needs: string;
  venue: string;
  winProbability: string;
  lastOvers: string[];
  battingSummary: { label: string; value: string }[];
  bowlingStats: { label: string; value: string }[];
  innings: {
    player: string;
    runs: number | string;
    balls: number | string;
    fours: number | string;
    sixes: number | string;
    strikeRate: number | string;
  }[];
  commentary: { over: string; text: string; kind: string }[];
  insights: { name: string; value: number; accent: string }[];
  fixtures: { teamA: string; teamB: string; time: string; venue: string }[];
  sideStats: { label: string; value: string }[];
  playerWatch: { name: string; role: string; metric: string }[];
  weather: { label: string; value: string }[];
};

const matchSelections: MatchSelection[] = [
  {
    id: "chittoor-royals",
    title: "Chittoor Titans vs Rayalaseema Royals",
    shortTitle: "CT vs RR",
    status: "In play",
    battingTeam: "Chittoor Titans",
    bowlingTeam: "Rayalaseema Royals",
    scoreboard: "186/6",
    overs: "18.3",
    target: "204",
    needs: "18 runs needed",
    venue: "Chittoor Stadium",
    winProbability: "61%",
    lastOvers: ["4", "1", "6", "0", "2", "1", "4", "W", "1"],
    battingSummary: [
      { label: "Runs", value: "186/6" },
      { label: "Overs", value: "18.3" },
      { label: "RR", value: "10.12" },
      { label: "Target", value: "204" },
    ],
    bowlingStats: [
      { label: "Dot balls", value: "31" },
      { label: "Wides", value: "4" },
      { label: "Extras", value: "12" },
      { label: "Required RR", value: "9.4" },
    ],
    innings: [
      { player: "R. Sharma", runs: 64, balls: 39, fours: 7, sixes: 2, strikeRate: 164.1 },
      { player: "K. Singh", runs: 42, balls: 27, fours: 5, sixes: 1, strikeRate: 155.6 },
      { player: "S. Reddy", runs: 28, balls: 14, fours: 2, sixes: 2, strikeRate: 200.0 },
      { player: "A. Naidu", runs: 18, balls: 9, fours: 2, sixes: 1, strikeRate: 200.0 },
      { player: "Extras", runs: 12, balls: "-", fours: "-", sixes: "-", strikeRate: "-" },
    ],
    commentary: [
      {
        over: "18.3",
        text: "R. Sharma pulls a short ball over deep midwicket for six! This match has tilted sharply in the last 3 overs.",
        kind: "Boundary",
      },
      {
        over: "18.1",
        text: "A slower delivery and a good scramble for two. 10 runs needed off 11 balls now.",
        kind: "Runs",
      },
      {
        over: "17.6",
        text: "Wicket! A. Naidu holes out at deep square leg after a brilliant spell from the leg-spinner.",
        kind: "Wicket",
      },
      {
        over: "17.4",
        text: "S. Reddy picks the length early and drives through extra cover for four. Pressure release for the chasing side.",
        kind: "Boundary",
      },
    ],
    insights: [
      { name: "Powerplay", value: 72, accent: "bg-amber-500" },
      { name: "Middle Overs", value: 58, accent: "bg-emerald-500" },
      { name: "Death Overs", value: 84, accent: "bg-violet-500" },
      { name: "Boundary %", value: 66, accent: "bg-sky-500" },
    ],
    fixtures: [
      { teamA: "Chittoor Strikers", teamB: "Rayalaseema Royals", time: "Today, 7:30 PM", venue: "Reddy Cricket Grounds" },
      { teamA: "Visakhapatnam Titans", teamB: "AP Warriors", time: "Tomorrow, 6:15 PM", venue: "Kuppam Indoor Arena" },
      { teamA: "Tirupati Kings", teamB: "Nellore Sharks", time: "Thu, 5:45 PM", venue: "District Stadium" },
    ],
    sideStats: [
      { label: "Projected score", value: "206" },
      { label: "Best partnership", value: "48" },
      { label: "Control moment", value: "18th over" },
      { label: "Chat buzz", value: "742 mentions" },
    ],
    playerWatch: [
      { name: "R. Sharma", role: "Top-order anchor", metric: "64*" },
      { name: "S. Reddy", role: "Finisher", metric: "28" },
      { name: "A. Verma", role: "Death overs", metric: "2/24" },
    ],
    weather: [
      { label: "Temperature", value: "28°C" },
      { label: "Humidity", value: "62%" },
      { label: "Pitch report", value: "Batting-friendly" },
    ],
  },
  {
    id: "ap-vizag",
    title: "AP Warriors vs Vizag Chargers",
    shortTitle: "AP vs VC",
    status: "Completed",
    battingTeam: "AP Warriors",
    bowlingTeam: "Vizag Chargers",
    scoreboard: "178/7",
    overs: "20.0",
    target: "182",
    needs: "Won by 4 runs",
    venue: "Madanapalle Arena",
    winProbability: "82%",
    lastOvers: ["1", "0", "4", "1", "2", "W", "1", "4", "1"],
    battingSummary: [
      { label: "Runs", value: "178/7" },
      { label: "Overs", value: "20.0" },
      { label: "RR", value: "8.90" },
      { label: "Target", value: "182" },
    ],
    bowlingStats: [
      { label: "Dot balls", value: "26" },
      { label: "Wides", value: "3" },
      { label: "Extras", value: "9" },
      { label: "Required RR", value: "9.1" },
    ],
    innings: [
      { player: "P. Reddy", runs: 52, balls: 31, fours: 5, sixes: 2, strikeRate: 167.7 },
      { player: "N. Rao", runs: 44, balls: 26, fours: 3, sixes: 3, strikeRate: 169.2 },
      { player: "K. Yadav", runs: 36, balls: 18, fours: 2, sixes: 2, strikeRate: 200.0 },
      { player: "S. Kumar", runs: 22, balls: 14, fours: 1, sixes: 1, strikeRate: 157.1 },
      { player: "Extras", runs: 8, balls: "-", fours: "-", sixes: "-", strikeRate: "-" },
    ],
    commentary: [
      {
        over: "19.6",
        text: "A neat yorker from the pace bowler keeps the run flow minimal. AP Warriors clinch a thrilling finish.",
        kind: "Result",
      },
      {
        over: "19.3",
        text: "The field is deep and the batters are forced into a slower second run. Pressure building for the home side.",
        kind: "Pressure",
      },
      {
        over: "18.6",
        text: "A low full toss is launched over long on for four. The match has swung again.",
        kind: "Boundary",
      },
      {
        over: "18.1",
        text: "S. Kumar drills one straight back over the bowler's head as the crowd rises.",
        kind: "Boundary",
      },
    ],
    insights: [
      { name: "Powerplay", value: 68, accent: "bg-amber-500" },
      { name: "Middle Overs", value: 63, accent: "bg-emerald-500" },
      { name: "Death Overs", value: 78, accent: "bg-violet-500" },
      { name: "Boundary %", value: 59, accent: "bg-sky-500" },
    ],
    fixtures: [
      { teamA: "Tirupati Kings", teamB: "Nellore Sharks", time: "Today, 5:45 PM", venue: "District Stadium" },
      { teamA: "Chittoor Strikers", teamB: "Nellore Sharks", time: "Tomorrow, 7:15 PM", venue: "Rural Sports Complex" },
      { teamA: "Vijayawada United", teamB: "AP Warriors", time: "Fri, 6:10 PM", venue: "Lalbahadur Stadium" },
    ],
    sideStats: [
      { label: "Projected score", value: "184" },
      { label: "Best partnership", value: "39" },
      { label: "Control moment", value: "17th over" },
      { label: "Chat buzz", value: "510 mentions" },
    ],
    playerWatch: [
      { name: "P. Reddy", role: "Key batter", metric: "52" },
      { name: "K. Yadav", role: "Power hitter", metric: "36" },
      { name: "M. Iqbal", role: "Death bowler", metric: "3/29" },
    ],
    weather: [
      { label: "Temperature", value: "31°C" },
      { label: "Humidity", value: "57%" },
      { label: "Pitch report", value: "Slow surface" },
    ],
  },
];

export default function CricketLiveScorePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [selectedMatchId, setSelectedMatchId] = useState(matchSelections[0].id);

  const selectedMatch =
    matchSelections.find((match) => match.id === selectedMatchId) ?? matchSelections[0];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {selectedMatch.battingSummary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[26px] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-100 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Match pulse</h3>
                  <span className="flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    <CircleDot className="h-3.5 w-3.5 fill-current" />
                    {selectedMatch.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-white/80 p-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{selectedMatch.battingTeam}</p>
                      <p className="text-xs text-slate-500">Current innings</p>
                    </div>
                    <span className="text-xl font-black text-slate-900">{selectedMatch.scoreboard}</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Last 5 overs",
                        value: selectedMatch.scoreboard === "186/6" ? "51/1" : "42/2",
                        good: true,
                      },
                      {
                        label: "Partnership",
                        value: selectedMatch.scoreboard === "186/6" ? "48 off 27" : "39 off 21",
                        good: true,
                      },
                      { label: "Run rate", value: selectedMatch.battingSummary[2].value, good: true },
                      { label: "Requested", value: selectedMatch.needs, good: false },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
                        <p className={`mt-2 text-xl font-bold ${item.good ? "text-emerald-700" : "text-amber-700"}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      <span>Over trend</span>
                      <span>{selectedMatch.overs}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      {selectedMatch.lastOvers.map((ball, index) => (
                        <div key={`${ball}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                          <span
                            className={`inline-flex h-10 w-full items-center justify-center rounded-t-xl text-xs font-bold ${
                              ball === "W"
                                ? "bg-red-500 text-white"
                                : ball === "6"
                                  ? "bg-amber-400 text-slate-900"
                                  : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {ball}
                          </span>
                          <span className="text-[10px] text-slate-400">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Key metrics</h3>
                <div className="mt-5 space-y-4">
                  {selectedMatch.bowlingStats.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-bold text-slate-900">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-500">
                    <span>Pressure index</span>
                    <span>{selectedMatch.scoreboard === "186/6" ? "74/100" : "61/100"}</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{ width: selectedMatch.scoreboard === "186/6" ? "74%" : "61%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Scorecard":
        return (
          <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Batter</th>
                    <th className="px-4 py-3 font-semibold">R</th>
                    <th className="px-4 py-3 font-semibold">B</th>
                    <th className="px-4 py-3 font-semibold">4s</th>
                    <th className="px-4 py-3 font-semibold">6s</th>
                    <th className="px-4 py-3 font-semibold">SR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {selectedMatch.innings.map((player) => (
                    <tr key={player.player} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{player.player}</td>
                      <td className="px-4 py-3 text-slate-700">{player.runs}</td>
                      <td className="px-4 py-3 text-slate-700">{player.balls}</td>
                      <td className="px-4 py-3 text-slate-700">{player.fours}</td>
                      <td className="px-4 py-3 text-slate-700">{player.sixes}</td>
                      <td className="px-4 py-3 text-slate-700">{player.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Commentary":
        return (
          <div className="space-y-4">
            {selectedMatch.commentary.map((item) => (
              <div key={`${item.over}-${item.text}`} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {item.over}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                        {item.kind}
                      </span>
                      <span className="text-xs text-slate-500">Match commentary</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "Insights":
        return (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Phase analysis</h3>
              <div className="mt-5 space-y-4">
                {selectedMatch.insights.map((insight) => (
                  <div key={insight.name}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                      <span>{insight.name}</span>
                      <span>{insight.value}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-200">
                      <div className={`h-2.5 rounded-full ${insight.accent}`} style={{ width: `${insight.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Player pressure map</h3>
              <div className="mt-5 space-y-4">
                {selectedMatch.playerWatch.map((player) => (
                  <div key={player.name} className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-800">{player.name}</span>
                      <span className="font-bold text-slate-900">{player.metric}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-slate-500">
                      <span>Role</span>
                      <span>{player.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Fixtures":
        return (
          <div className="space-y-4">
            {selectedMatch.fixtures.map((match) => (
              <div key={`${match.teamA}-${match.time}`} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {match.teamA} vs {match.teamB}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{match.time}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700">
                    Upcoming
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{match.venue}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="mx-auto max-w-[1320px] px-4 pb-12 pt-6 md:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/community/sports")}
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sports
      </button>

      <section className="mt-6 overflow-hidden rounded-[30px] border border-amber-200 bg-gradient-to-r from-[#0e1724] via-[#1a2943] to-[#3a2b1d] p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.16)] md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              <Sparkles className="h-4 w-4" />
              Live Match Centre
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.06em] md:text-5xl">{selectedMatch.title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
            <BellRing className="h-4 w-4 text-amber-200" />
            <span className="text-sm text-amber-100">Live alerts enabled</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {matchSelections.map((match) => (
            <button
              key={match.id}
              type="button"
              onClick={() => setSelectedMatchId(match.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                selectedMatchId === match.id
                  ? "border-amber-300 bg-amber-300/20 text-amber-100"
                  : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {match.shortTitle}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/25 text-lg font-black text-amber-100">
                  {selectedMatch.battingTeam.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{selectedMatch.battingTeam}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Current innings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white">{selectedMatch.scoreboard}</p>
                <p className="text-xs text-slate-300">{selectedMatch.overs} overs</p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/25 text-lg font-black text-sky-100">
                  {selectedMatch.bowlingTeam.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{selectedMatch.bowlingTeam}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-300">{selectedMatch.needs}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white">{selectedMatch.target}</p>
                <p className="text-xs text-slate-300">Target</p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm text-slate-200">
              <span>Match status</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                {selectedMatch.status}
              </span>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Target</span>
                <span className="font-semibold text-white">{selectedMatch.target}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Win probability</span>
                <span className="font-semibold text-white">{selectedMatch.winProbability}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Venue</span>
                <span className="font-semibold text-white">{selectedMatch.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-5">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[#1d3048] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5">{renderTabContent()}</div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Match snapshot</h3>
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-5 space-y-4">
              {selectedMatch.sideStats.map(({ label, value }) => {
                const icons = [Trophy, Users, Gauge, MessageSquareText];
                const Icon = icons[selectedMatch.sideStats.findIndex((item) => item.label === label) % icons.length];

                return (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#9a5b17] shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-slate-600">{label}</span>
                    </div>
                    <span className="font-bold text-slate-900">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Team watch</h3>
              <ShieldCheck className="h-5 w-5 text-amber-600" />
            </div>

            <div className="mt-5 space-y-4">
              {selectedMatch.playerWatch.map((player) => (
                <div key={player.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{player.name}</p>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{player.role}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                      {player.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Weather & pitch</h3>
              <Clock3 className="h-5 w-5 text-sky-600" />
            </div>

            <div className="mt-5 space-y-3 text-sm">
              {selectedMatch.weather.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-slate-600">
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
