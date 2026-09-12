import SportsHero from "../components/sports/SportsHero";
import SportsProgramGrid from "../components/sports/SportsProgramGrid";
import SportsUpdatesPanel from "../components/sports/SportsUpdatesPanel";

export default function SportsPage() {
  return (
    <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-6 lg:px-8">
      <SportsHero />
      <SportsProgramGrid />
      <SportsUpdatesPanel />
    </main>
  );
}
