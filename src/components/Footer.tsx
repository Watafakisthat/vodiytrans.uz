import React from "react";
import { AppRoute, InstitutionalSettings } from "../types/domain";
import { VodiyTransLogo } from "./Header";

interface FooterProps {
  settings: InstitutionalSettings;
  onNavigate: (route: AppRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const go = (route: AppRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#104B33] text-[#EAF4ED] border-t border-[#176B45] mt-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#176B45]">
          {/* Col 1: Brand & Institutional Role */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <VodiyTransLogo className="w-9 h-9" />
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  VODIYTRANS.UZ
                </div>
                <div className="text-xs text-[#A7D4B8]">
                  Rasmiy axborot platformasi va raqamli arxiv
                </div>
              </div>
            </div>
            <p className="text-sm text-[#EAF4ED]/85 leading-relaxed max-w-md">
              {settings.organizationLegalName}. {settings.regionDescription}
            </p>
            <div className="p-3.5 rounded-md bg-[#0C3826] border border-[#176B45] text-xs text-[#EAF4ED]/90 leading-relaxed">
              <strong className="text-white block mb-1">
                Axborot platformasi maqomi bo'yicha eslatma:
              </strong>
              Ushbu veb-sayt fuqarolardan yangi murojaat yoki shikoyatlarni qabul
              qilish portali hisoblanmaydi. Platformada tashkilot tomonidan
              amalga oshirilgan ishlar, rasmiy kanallar orqali kelib tushgan
              masalalarning amaliy ijrosi hamda tasdiqlangan hisobotlar e'lon
              qilinadi.
            </div>
          </div>

          {/* Col 2: Asosiy bo'limlar */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A7D4B8]">
              Platforma bo'limlari
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "home" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "about", tab: "umumiy" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Tashkilot haqida va rahbariyat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "news" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Yangiliklar arxivi (/yangiliklar)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "activities" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Faoliyat yo'nalishlari
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "branches" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Hududiy filiallar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "appeals-results" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Murojaatlar ijrosi (/murojaatlar-ijrosi)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "media" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Foto va videogalereya
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go({ page: "documents" })}
                  className="text-[#EAF4ED]/85 hover:text-white transition-colors"
                >
                  Ochiq hujjatlar arxivi (/hujjatlar)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Placeholders */}
          <div className="lg:col-span-4 space-y-3" id="footer-socials">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A7D4B8]">
              Bog'lanish ma'lumotlari (Tahrirlanadigan namuna)
            </h3>
            <dl className="space-y-2.5 text-xs text-[#EAF4ED]/90">
              <div>
                <dt className="text-[#A7D4B8]">Manzil:</dt>
                <dd className="mt-0.5">{settings.addressPlaceholder}</dd>
              </div>
              <div>
                <dt className="text-[#A7D4B8]">Ishonch va ma'lumot telefoni:</dt>
                <dd className="mt-0.5">{settings.phonePlaceholder}</dd>
              </div>
              <div>
                <dt className="text-[#A7D4B8]">Elektron pochta:</dt>
                <dd className="mt-0.5">{settings.emailPlaceholder}</dd>
              </div>
              <div>
                <dt className="text-[#A7D4B8]">Ish tartibi:</dt>
                <dd className="mt-0.5">{settings.workingHoursPlaceholder}</dd>
              </div>
            </dl>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => go({ page: "contact" })}
                className="px-3 py-1.5 rounded bg-[#176B45] hover:bg-[#1E8255] text-white font-medium transition-colors"
              >
                Aloqa sahifasi
              </button>
              <button
                type="button"
                onClick={() => go({ page: "admin", section: "overview" })}
                className="px-3 py-1.5 rounded bg-[#0C3826] hover:bg-[#176B45] text-[#EAF4ED] border border-[#176B45] font-medium transition-colors"
              >
                Tahririyat paneli (/admin)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A7D4B8]">
          <div>
            © {new Date().getFullYear()} {settings.organizationLegalName}. Barcha
            huquqlar himoyalangan.
          </div>
          <div>
            Nashr uchun mas'ul: {settings.pressServiceAttribution}
          </div>
        </div>
      </div>
    </footer>
  );
};
