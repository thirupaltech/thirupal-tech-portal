import { CalendarDays, MapPin, Package, PhoneCall, Wallet } from "lucide-react";

import { produceListings } from "./agricultureData";

export default function ProduceMarketplace() {
  return (
    <div className="rounded-[28px] border border-[#dfe7df] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7a53]">Sell Your Produce</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Fresh harvest marketplace</h3>
        </div>
        <button type="button" className="rounded-full border border-[#dbeadf] bg-[#f4faf5] px-3.5 py-2 text-xs font-semibold text-[#245f47]">
          List produce
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {produceListings.map((listing) => (
          <div key={listing.product} className="rounded-[22px] border border-[#edf1ec] bg-[#f8faf8] p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍅</span>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{listing.product}</div>
                    <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#4f7a53]">{listing.tag}</div>
                  </div>
                </div>
              </div>

              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-[#1d8f72] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#166e5a]">
                <PhoneCall className="h-3.5 w-3.5" />
                Contact Farmer
              </button>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-2"><span className="font-semibold text-slate-500">Farmer:</span> {listing.farmer}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#4f7a53]" /> {listing.location}</div>
              <div className="flex items-center gap-2"><Package className="h-4 w-4 text-[#4f7a53]" /> {listing.quantity}</div>
              <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-[#4f7a53]" /> {listing.price}</div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays className="h-4 w-4 text-[#4f7a53]" />
              Harvest: {listing.harvest}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
