                                                                                    import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CalendarRange,
  Crown,
  Medal,
  ShieldCheck,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

export type SportsModule = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  border: string;
  tag: string;
  highlights: string[];
};

export type SportsUpdate = {
  date: string;
  month: string;
  year: string;
  title: string;
  detail: string;
  badge: string;
  action: string;
};

export const sportsModules: SportsModule[] = [
  {
    title: "Cricket Live Score",
    description: "Track live cricket action with match updates, scorecards, and instant commentary from local and national games.",
    icon: Activity,
    accent: "bg-[#fff9eb]",
    border: "border-[#f8e7b7]",
    tag: "Priority 01",
    highlights: ["Live Matches", "Scorecard", "Commentary"],
  },
  {
    title: "Tournaments",
    description: "Discover upcoming events, fixtures, and standings to stay ahead of every tournament in the community and district.",
    icon: Trophy,
    accent: "bg-[#edf7ef]",
    border: "border-[#dfeee3]",
    tag: "Priority 02",
    highlights: ["Upcoming", "Fixtures", "Points Table"],
  },
  {
    title: "Teams & Players",
    description: "Explore player profiles, team rosters, achievements and critical match statistics to celebrate local talent.",
    icon: Users,
    accent: "bg-[#eef4ff]",
    border: "border-[#dfe8ff]",
    tag: "Priority 03",
    highlights: ["Teams", "Players", "Statistics"],
  },
  {
    title: "Events & Leaderboard",
    description: "Join community sporting events, traditional games, and view rankings that keep every athlete motivated.",
    icon: Medal,
    accent: "bg-[#f8f0ff]",
    border: "border-[#e7dcff]",
    tag: "Priority 04",
    highlights: ["Community Events", "Traditional Games", "Rankings"],
  },
];

export const sportsUpdates: SportsUpdate[] = [
  {
    date: "14",
    month: "Sep",
    year: "2026",
    title: "Chittoor Community Cricket Cup",
    detail: "Semi-final fixtures and registration updates are now live for the weekend cricket showdown.",
    badge: "Live",
    action: "View Match",
  },
  {
    date: "18",
    month: "Sep",
    year: "2026",
    title: "Youth Volleyball League Opens",
    detail: "School and college teams can register for the new district youth league before the deadline.",
    badge: "Tournament",
    action: "Join Now",
  },
  {
    date: "24",
    month: "Sep",
    year: "2026",
    title: "Traditional Games Day",
    detail: "Community members will gather for kabaddi, kho-kho and village sports to celebrate local heritage.",
    badge: "Event",
    action: "Reserve Spot",
  },
];

export const sportsLeaderboard = [
  { name: "Rising Warriors", points: 28, badge: "Top Team" },
  { name: "Hill City Strikers", points: 24, badge: "Strong Form" },
  { name: "Green Valley CC", points: 22, badge: "Consistent" },
];

export const quickLinks = [
  "Live Match Centre",
  "Tournament Calendar",
  "Players Database",
  "Community Events",
];

export const sportsFocusAreas = [
  { label: "Community Sports", icon: ShieldCheck },
  { label: "Player Growth", icon: Crown },
  { label: "Fair Play", icon: Swords },
  { label: "District Events", icon: CalendarRange },
];
