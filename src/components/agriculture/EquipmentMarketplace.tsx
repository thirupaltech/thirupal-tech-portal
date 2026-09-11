import { MapPin, Tractor } from "lucide-react";

import { equipmentServices } from "./agricultureData";

export default function EquipmentMarketplace() {
  return (
    <div className="rounded-[28px] border border-[#dfe7df] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7a53]">Farm Equipment & Services</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Village service marketplace</h3>
        </div>
        <div className="rounded-full bg-[#eefaf9] p-2 text-[#24806d]">
          <Tractor className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {equipmentServices.map((service) => (
          <div key={service.title} className="rounded-[22px] border border-[#eaf0ea] bg-[#f8faf8] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-slate-800">{service.title}</div>
                <div className="mt-2 text-base font-semibold text-[#1f6a4f]">{service.rate}</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-[#4f7a53]" />
                  {service.location}
                </div>
              </div>
              <button type="button" className="rounded-full bg-[#1d8f72] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#166e5a]">
                {service.label}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
