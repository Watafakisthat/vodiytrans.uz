import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  Info,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import {
  ActivityDirection,
  AppRoute,
  InstitutionalSettings,
  LeadershipPlaceholder,
  RegionalBranch,
} from "../types/domain";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface AboutViewProps {
  initialTab?: "umumiy" | "rahbariyat" | "faoliyatimiz";
  settings: InstitutionalSettings;
  leadership: LeadershipPlaceholder[];
  activities: ActivityDirection[];
  onNavigate: (route: AppRoute) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  initialTab = "umumiy",
  settings,
  leadership,
  activities,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    "umumiy" | "rahbariyat" | "faoliyatimiz"
  >(initialTab);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Sub-navigation */}
      <div className="border-b border-[#DDE4DF] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            VODIYTRANS.UZ · Rasmiy ma'lumotnoma
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-[#202923]">
            Tashkilot haqida
          </h1>
          <p className="mt-2 text-sm text-[#737D76] max-w-2xl">
            {settings.organizationLegalName} ustav vazifalari, boshqaruv
            tuzilmasi va asosiy faoliyat yo'nalishlari.
          </p>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#DDE4DF] rounded-lg"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "umumiy"}
            onClick={() => setActiveTab("umumiy")}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === "umumiy"
                ? "bg-[#176B45] text-white"
                : "text-[#202923] hover:bg-[#EAF4ED]"
            }`}
          >
            Tashkilot haqida
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "rahbariyat"}
            onClick={() => setActiveTab("rahbariyat")}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === "rahbariyat"
                ? "bg-[#176B45] text-white"
                : "text-[#202923] hover:bg-[#EAF4ED]"
            }`}
          >
            Rahbariyat
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "faoliyatimiz"}
            onClick={() => setActiveTab("faoliyatimiz")}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === "faoliyatimiz"
                ? "bg-[#176B45] text-white"
                : "text-[#202923] hover:bg-[#EAF4ED]"
            }`}
          >
            Faoliyatimiz
          </button>
        </div>
      </div>

      {activeTab === "umumiy" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-[#DDE4DF] rounded-lg p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-bold text-[#202923]">
              {settings.organizationLegalName}
            </h2>
            <p className="text-sm sm:text-base text-[#202923]/85 leading-relaxed">
              {settings.regionDescription}
            </p>
            <p className="text-sm text-[#737D76] leading-relaxed">
              Tashkilotning asosiy maqsadi — Farg'ona vodiysi shahar va
              tumanlarida sanitariya-epidemiologik barqarorlikni saqlash, qattiq
              maishiy va xavfsiz chiqindilarni belgilangan marshrut jadvallari
              asosida o'z vaqtida yig'ish va olib chiqish, zamonaviy chiqindi
              shoxobchalarini barpo etish hamda maxsus avtotransport parkidan
              samarali foydalanishdan iborat.
            </p>

            <div className="pt-4 border-t border-[#DDE4DF] space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#176B45]">
                VODIYTRANS.UZ raqamli platformasining vazifasi:
              </h3>
              <ul className="space-y-2 text-sm text-[#202923]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                  <span>
                    Tashkilotning kundalik amaliy ishlari, loyihalari va
                    hududiy filiallar faoliyatini haqqoniy yoritib borish;
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                  <span>
                    Xarid qilingan yangi maxsus texnikalar, konteynerlar va
                    infratuzilma o'zgarishlari haqida jamoatchilikka hisobot
                    berish;
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                  <span>
                    Rasmiy kanallar orqali kelib tushgan murojaatlar bo'yicha
                    joylarda ko'rilgan amaliy choralar va erishilgan natijalarni
                    fotodalillar bilan arxivlash.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden">
              <DocumentaryPlate sceneId="regional_branch" aspectRatio="16:9" />
              <div className="p-5 space-y-3 text-xs text-[#737D76]">
                <div className="font-bold text-sm text-[#202923]">
                  Tashkiliy rekvizitlar (Tahrirlanadigan namuna)
                </div>
                <div>
                  <strong className="text-[#202923]">Rasmiy nomi:</strong>{" "}
                  {settings.organizationLegalName}
                </div>
                <div>
                  <strong className="text-[#202923]">Manzil:</strong>{" "}
                  {settings.addressPlaceholder}
                </div>
                <div>
                  <strong className="text-[#202923]">Ish tartibi:</strong>{" "}
                  {settings.workingHoursPlaceholder}
                </div>
                <div>
                  <strong className="text-[#202923]">Matbuot xizmati:</strong>{" "}
                  {settings.pressServiceAttribution}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "rahbariyat" && (
        <div className="space-y-6">
          <div className="p-4 rounded-md bg-[#EAF4ED] border border-[#176B45]/30 text-xs text-[#104B33]">
            <strong>Eslatma:</strong> Rahbariyat tarkibi bo'yicha ism-shariflar,
            qabul kunlari va xizmat telefonlari tasdiqlangan rasmiy ma'lumotlar
            taqdim etilgach kiritilishi uchun namuna (placeholder) shaklida
            qoldirilgan.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-[#DDE4DF] rounded-lg p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-md bg-[#EAF4ED] text-[#176B45] flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                    {member.roleTitle}
                  </div>
                  <h3 className="text-lg font-bold text-[#202923]">
                    {member.fullNamePlaceholder}
                  </h3>
                  <p className="text-xs text-[#737D76] leading-relaxed">
                    {member.responsibilities}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE4DF] space-y-1.5 text-xs text-[#737D76]">
                  <div>
                    <strong className="text-[#202923]">Qabul vaqti:</strong>{" "}
                    {member.receptionSchedulePlaceholder}
                  </div>
                  <div>
                    <strong className="text-[#202923]">Telefon:</strong>{" "}
                    {member.phonePlaceholder}
                  </div>
                  <div>
                    <strong className="text-[#202923]">E-pochta:</strong>{" "}
                    {member.emailPlaceholder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "faoliyatimiz" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-4"
              >
                <div className="text-xs font-mono-tabular font-semibold text-[#176B45]">
                  {act.numberLabel} · ASOSIY FAOLIYAT YO'NALISHI
                </div>
                <h3 className="text-xl font-bold text-[#202923]">{act.title}</h3>
                <p className="text-sm text-[#737D76] leading-relaxed">
                  {act.shortDescription}
                </p>
                <ul className="space-y-2 pt-2 border-t border-[#DDE4DF] text-xs sm:text-sm text-[#202923]">
                  {act.detailedPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ActivitiesViewProps {
  activities: ActivityDirection[];
  onNavigate: (route: AppRoute) => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  activities,
  onNavigate,
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#DDE4DF] pb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
          VODIYTRANS.UZ · Asosiy vazifalar
        </div>
        <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-[#202923]">
          Faoliyat yo'nalishlari
        </h1>
        <p className="mt-2 text-sm text-[#737D76] max-w-3xl">
          «VODIY MAXSUS SANITAR TRANS» MCHJ tomonidan Farg'ona vodiysi
          hududlarida amalga oshiriladigan sanitariya tozalash, transport va
          obodonlashtirish yo'nalishlari.
        </p>
      </div>

      <div className="space-y-8">
        {activities.map((act) => (
          <section
            key={act.id}
            className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <DocumentaryPlate
                sceneId={act.sceneId}
                aspectRatio="16:9"
                className="h-full w-full"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-mono-tabular font-semibold text-[#176B45]">
                  YO'NALISH {act.numberLabel}
                </div>
                <h2 className="text-2xl font-bold text-[#202923]">
                  {act.title}
                </h2>
                <p className="text-sm sm:text-base text-[#737D76] leading-relaxed">
                  {act.shortDescription}
                </p>

                <div className="pt-3 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#202923]">
                    Amaliy jarayonlar tarkibi:
                  </div>
                  <ul className="space-y-2 text-sm text-[#202923]/90">
                    {act.detailedPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDE4DF] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-mono-tabular font-semibold text-[#176B45]">
                  {act.keyIndicatorPlaceholder}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: "news" })}
                  className="font-semibold text-[#176B45] hover:text-[#104B33]"
                >
                  Shu yo'nalishdagi yangiliklar →
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

interface BranchesViewProps {
  branches: RegionalBranch[];
}

export const BranchesView: React.FC<BranchesViewProps> = ({ branches }) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#DDE4DF] pb-6 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
          VODIYTRANS.UZ · Mintaqaviy bo'linmalar
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#202923]">
          Hududiy filiallar
        </h1>
        <p className="text-sm text-[#737D76] max-w-3xl">
          Tashkilotning Farg'ona vodiysi shahar va tumanlarida xizmat
          ko'rsatuvchi hududiy bo'linmalari haqida ma'lumot.
        </p>
        <div className="p-3.5 rounded-md bg-[#EAF4ED] border border-[#176B45]/30 text-xs text-[#104B33]">
          <strong>Izoh:</strong> Filiallar nomi, aniq manzillari va telefon
          raqamlari tasdiqlangan rasmiy ro'yxat taqdim etilgunga qadar tahrirlanadigan
          namuna (placeholder) ko'rinishida berilgan.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <article
            key={branch.id}
            className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between"
          >
            <div>
              <DocumentaryPlate
                sceneId={branch.sceneId}
                aspectRatio="16:9"
                showOverlayBadge={false}
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#176B45]">
                  <MapPin className="w-4 h-4" />
                  <span>{branch.locationPlaceholder}</span>
                </div>
                <h2 className="text-xl font-bold text-[#202923]">
                  {branch.branchNamePlaceholder}
                </h2>
                <p className="text-sm text-[#737D76] leading-relaxed">
                  {branch.serviceAreaDescription}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-4 border-t border-[#DDE4DF] bg-[#F7F9F7] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#737D76] block">Biriktirilgan texnika:</span>
                <strong className="text-[#202923]">
                  {branch.machineryCountPlaceholder}
                </strong>
              </div>
              <div>
                <span className="text-[#737D76] block">Ish vaqti:</span>
                <strong className="text-[#202923]">
                  {branch.workingHoursPlaceholder}
                </strong>
              </div>
              <div>
                <span className="text-[#737D76] block">Aloqa raqami:</span>
                <strong className="text-[#202923]">
                  {branch.phonePlaceholder}
                </strong>
              </div>
              <div>
                <span className="text-[#737D76] block">Manzil joyi:</span>
                <strong className="text-[#202923]">
                  {branch.addressPlaceholder}
                </strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

interface ContactViewProps {
  settings: InstitutionalSettings;
  branches: RegionalBranch[];
  onNavigate: (route: AppRoute) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  settings,
  branches,
  onNavigate,
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-[#DDE4DF] pb-6 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
          VODIYTRANS.UZ · Rasmiy bog'lanish ma'lumotlari
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#202923]">
          Aloqa va ma'lumotnomalar
        </h1>
        <p className="text-sm text-[#737D76] max-w-3xl">
          «VODIY MAXSUS SANITAR TRANS» MCHJ bosh ofisi, matbuot xizmati va
          hududiy bo'linmalarining rasmiy aloqa ma'lumotlari (tahrirlanadigan
          namunalar).
        </p>
      </div>

      {/* Important Non-Complaint Notice */}
      <div className="p-5 rounded-lg bg-[#EAF4ED] border border-[#176B45]/30 flex items-start gap-3.5 text-sm text-[#104B33]">
        <Info className="w-5 h-5 text-[#176B45] shrink-0 mt-0.5" />
        <div className="space-y-1.5 leading-relaxed">
          <strong className="block text-base">
            Muhim eslatma: Ushbu veb-sayt orqali fuqarolar murojaatlari yoki
            shikoyatlari qabul qilinmaydi
          </strong>
          <p>
            Fuqarolarning murojaatlari amaldagi davlat axborot tizimlari va
            belgilangan rasmiy tartibda qabul qilinadi. VODIYTRANS.UZ
            platformasi esa tashkilot tomonidan amalga oshirilgan ishlar,
            o'rganilgan masalalar va erishilgan amaliy natijalarni e'lon qilib
            boruvchi rasmiy axborot nashri hamda raqamli arxiv hisoblanadi.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onNavigate({ page: "appeals-results" })}
              className="font-semibold text-[#176B45] underline hover:text-[#104B33]"
            >
              Amalda hal etilgan murojaatlar natijalari arxivini ko'rish →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-2">
          <Building2 className="w-5 h-5 text-[#176B45]" />
          <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76]">
            Bosh boshqarma manzili
          </div>
          <div className="text-sm font-bold text-[#202923]">
            {settings.addressPlaceholder}
          </div>
          <p className="text-xs text-[#737D76]">
            Tasdiqlangan yuridik va pochta manzili joyi.
          </p>
        </div>

        <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-2">
          <Phone className="w-5 h-5 text-[#176B45]" />
          <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76]">
            Ma'lumot va dispecherlik telefoni
          </div>
          <div className="text-sm font-bold text-[#202923]">
            {settings.phonePlaceholder}
          </div>
          <p className="text-xs text-[#737D76]">
            Tasdiqlangan xizmat raqami kiritiladi.
          </p>
        </div>

        <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-2">
          <Mail className="w-5 h-5 text-[#176B45]" />
          <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76]">
            Matbuot xizmati va devonxona
          </div>
          <div className="text-sm font-bold text-[#202923]">
            {settings.emailPlaceholder}
          </div>
          <p className="text-xs text-[#737D76]">
            OAV va tashkilotlar bilan axborot almashinuvi uchun.
          </p>
        </div>

        <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-2">
          <Clock className="w-5 h-5 text-[#176B45]" />
          <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76]">
            Ish tartibi
          </div>
          <div className="text-sm font-bold text-[#202923]">
            {settings.workingHoursPlaceholder}
          </div>
          <p className="text-xs text-[#737D76]">
            Hududiy navbatchi brigadalar tasdiqlangan jadval asosida ishlaydi.
          </p>
        </div>
      </div>

      {/* Regional Branches Quick Directory */}
      <div className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#DDE4DF] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#202923]">
            Hududiy filiallar aloqa ma'lumotlari (Tahrirlanadigan namunalar)
          </h2>
          <button
            type="button"
            onClick={() =>
              onNavigate({ page: "admin", section: "settings" })
            }
            className="text-xs font-semibold text-[#176B45] hover:underline"
          >
            Tahririyat panelida o'zgartirish →
          </button>
        </div>
        <div className="divide-y divide-[#DDE4DF]">
          {branches.map((b) => (
            <div
              key={b.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs sm:text-sm"
            >
              <div>
                <div className="font-bold text-[#202923]">
                  {b.branchNamePlaceholder}
                </div>
                <div className="text-xs text-[#737D76]">
                  {b.locationPlaceholder} · {b.addressPlaceholder}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#737D76]">
                <span>
                  <strong className="text-[#202923]">Tel:</strong>{" "}
                  {b.phonePlaceholder}
                </span>
                <span>
                  <strong className="text-[#202923]">E-pochta:</strong>{" "}
                  {b.emailPlaceholder}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
