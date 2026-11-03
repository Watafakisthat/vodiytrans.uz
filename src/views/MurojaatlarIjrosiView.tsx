import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Info,
  MapPin,
  Search,
} from "lucide-react";
import {
  AppRoute,
  CompletedAppealCase,
  DistrictPerformanceStat,
  MonthlyPerformanceStat,
  OfficialDocument,
} from "../types/domain";
import {
  calculateAppealAggregateStats,
  filterCompletedAppealCases,
} from "../utils/archiveLogic";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface MurojaatlarIjrosiViewProps {
  cases: CompletedAppealCase[];
  districtStats: DistrictPerformanceStat[];
  monthlyStats: MonthlyPerformanceStat[];
  documents: OfficialDocument[];
  onNavigate: (route: AppRoute) => void;
}

export const MurojaatlarIjrosiView: React.FC<MurojaatlarIjrosiViewProps> = ({
  cases,
  districtStats,
  monthlyStats,
  documents,
  onNavigate,
}) => {
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>("Barcha hududlar");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(
    cases[0]?.id || null
  );

  const aggregateStats = calculateAppealAggregateStats(districtStats);
  const districtsList = [
    "Barcha hududlar",
    ...Array.from(
      new Set(
        cases.filter((c) => c.status === "published").map((c) => c.district)
      )
    ),
  ];

  const filteredCases = filterCompletedAppealCases(cases, {
    searchQuery,
    district: selectedDistrict,
    onlyPublished: true,
  });

  const featuredCaseStudy =
    cases.find((c) => c.isFeaturedCaseStudy && c.status === "published") ||
    filteredCases[0];

  const go = (route: AppRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Page Title & Mandatory Institutional Introduction */}
      <header className="bg-white border border-[#DDE4DF] rounded-lg p-6 sm:p-10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#737D76]">
          <span className="font-semibold uppercase tracking-wider text-[#176B45]">
            VODIYTRANS.UZ · Amaliy natijalar arxivi (/murojaatlar-ijrosi)
          </span>
          <span className="font-mono-tabular">
            Faqat tasdiqlangan va yakunlangan ishlar arxivi
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#202923]">
          Murojaatlar ijrosi
        </h1>

        <p className="text-base sm:text-lg text-[#202923]/90 leading-relaxed max-w-4xl">
          Fuqarolardan kelib tushgan murojaatlar va mavjud muammolarni
          o'rganish, ularni belgilangan tartibda hal etish hamda amalga
          oshirilgan ishlar natijalarini jamoatchilikka yetkazish tashkilot
          faoliyatining muhim yo'nalishlaridan biridir.
        </p>

        {/* Strict Institutional Clarification Notice (No Submission Forms) */}
        <div className="p-4 rounded-md bg-[#EAF4ED] border border-[#176B45]/30 flex items-start gap-3 text-xs sm:text-sm text-[#104B33]">
          <Info className="w-5 h-5 text-[#176B45] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Axborot ma'lumotnomasi:</strong> Ushbu sahifa yangi murojaat
            yoki arizalarni qabul qilish portali hisoblanmaydi. Fuqarolar
            murojaatlari amaldagi davlat tizimlari va belgilangan rasmiy tartibda
            qabul qilinadi. Mazkur bo'limda esa tashkilot tomonidan joylarda
            o'rganilgan masalalar, ko'rilgan choralar va erishilgan amaliy
            natijalar hujjatlashtirilgan holda e'lon qilinadi.
          </div>
        </div>
      </header>

      {/* Section 1: Illustrative Performance Statistics & District Breakdown */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-[#DDE4DF]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
              Tahliliy ko'rsatkichlar (Namuna ma'lumotlar)
            </div>
            <h2 className="mt-1 text-2xl font-bold text-[#202923]">
              Ko'rib chiqilgan va hal etilgan masalar statistikasi
            </h2>
          </div>
          <div className="text-xs text-[#737D76] bg-white border border-[#DDE4DF] px-3.5 py-2 rounded-md">
            <strong>Eslatma:</strong> Quyidagi raqamlar dizayn namunasi (sample
            data) bo'lib, tasdiqlangan rasmiy hisobot raqamlari bilan
            almashtiriladi.
          </div>
        </div>

        {/* 4 Summary Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
            <div className="text-xs text-[#737D76]">
              Rasmiy kanallardan qabul qilingan (Namuna)
            </div>
            <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
              {aggregateStats.totalReceived}
            </div>
            <div className="mt-1 text-xs text-[#737D76]">
              Hisobot davrida jami kelib tushgan masalalar
            </div>
          </div>

          <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
            <div className="text-xs text-[#737D76]">
              Joyiga chiqib o'rganilgan (Namuna)
            </div>
            <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
              {aggregateStats.totalReviewed}
            </div>
            <div className="mt-1 text-xs text-[#737D76]">
              Hududiy ishchi guruhlar tomonidan ko'rib chiqilgan
            </div>
          </div>

          <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
            <div className="text-xs text-[#176B45] font-semibold">
              Amalda ijobiy hal etilgan (Namuna)
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono-tabular text-[#176B45]">
                {aggregateStats.totalResolved}
              </span>
              <span className="text-xs font-mono-tabular text-[#104B33]">
                ({aggregateStats.resolutionRatePercent}%)
              </span>
            </div>
            <div className="mt-1 text-xs text-[#737D76]">
              Fotohisobot va dalolatnoma bilan tasdiqlangan
            </div>
          </div>

          <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
            <div className="text-xs text-[#737D76]">
              Amaliy ijro jarayonida (Namuna)
            </div>
            <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
              {aggregateStats.totalInProgress}
            </div>
            <div className="mt-1 text-xs text-[#737D76]">
              Texnik va qurilish ishlari davom etayotgan obyektlar
            </div>
          </div>
        </div>

        {/* District Table & Monthly Visual Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Performance by District Table */}
          <div className="lg:col-span-7 bg-white border border-[#DDE4DF] rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-[#DDE4DF] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#202923]">
                Hududiy bo'linmalar kesimida ko'rsatkichlar (Namuna jadval)
              </h3>
              <span className="text-xs text-[#737D76] font-mono-tabular">
                2026-yil (Namuna)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F7F9F7] border-b border-[#DDE4DF] text-[#737D76] text-xs">
                    <th className="py-3 px-4 font-semibold">Hududiy bo'linma</th>
                    <th className="py-3 px-3 font-semibold text-right">
                      Kelib tushgan
                    </th>
                    <th className="py-3 px-3 font-semibold text-right">
                      Hal etilgan
                    </th>
                    <th className="py-3 px-4 font-semibold text-right">
                      Jarayonda
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE4DF]">
                  {districtStats.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F7F9F7]/60">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#202923]">
                          {row.districtName}
                        </div>
                        <div className="text-xs text-[#737D76]">
                          {row.coverageNote}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono-tabular text-[#202923]">
                        {row.receivedCount}
                      </td>
                      <td className="py-3 px-3 text-right font-mono-tabular font-semibold text-[#176B45]">
                        {row.resolvedCount}
                      </td>
                      <td className="py-3 px-4 text-right font-mono-tabular text-[#737D76]">
                        {row.inProgressCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monthly Visual Bar Representation */}
          <div className="lg:col-span-5 bg-white border border-[#DDE4DF] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#202923]">
                Oylar kesimida amaliy hal etilgan masalalar dinamikasi (Namuna)
              </h3>
              <p className="mt-1 text-xs text-[#737D76]">
                Oxirgi 6 oy davomida joylarda bartaraf etilgan muammolar soni
                (tasdiqlanishi lozim bo'lgan namuna grafik).
              </p>

              <div className="mt-5 space-y-3">
                {monthlyStats.map((m) => {
                  const widthPercent = Math.min(
                    100,
                    Math.round((m.resolvedCases / 100) * 100)
                  );
                  return (
                    <div key={m.month} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#202923] font-medium">
                          {m.month}
                        </span>
                        <span className="font-mono-tabular text-[#176B45] font-semibold">
                          {m.resolvedCases} ta holat · {m.completedOperations} reys
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#EAF4ED] rounded-sm overflow-hidden">
                        <div
                          className="h-full bg-[#176B45]"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#DDE4DF] text-[11px] text-[#737D76]">
              Manba: Dispecherlik va hududiy nazorat bo'limi yig'ma hisoboti
              (Namuna ko'rsatkichlar).
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Detailed Case Study */}
      {featuredCaseStudy && (
        <section
          aria-label="Namuna amaliy tahlil"
          className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden"
        >
          <div className="bg-[#104B33] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8CD1A8]">
              Amaliy misol (Case Study) · Tasdiqlangan natija tahlili
            </div>
            <div className="text-xs font-mono-tabular text-[#EAF4ED]">
              Yakunlangan sana: {featuredCaseStudy.completedDate}
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-lg overflow-hidden border border-[#DDE4DF]">
                <DocumentaryPlate
                  sceneId={featuredCaseStudy.coverSceneId}
                  aspectRatio="4:3"
                />
              </div>
              <div className="p-3.5 bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-xs text-[#737D76]">
                <strong className="text-[#202923] block mb-0.5">
                  Tasdiqlovchi hujjat va foto-dalil:
                </strong>
                {featuredCaseStudy.beforeAfterNote}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#737D76]">
                  <span className="font-semibold text-[#176B45]">
                    {featuredCaseStudy.district}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Davr: {featuredCaseStudy.reportingPeriod}</span>
                </div>

                <h2 className="text-2xl font-bold text-[#202923] leading-snug">
                  {featuredCaseStudy.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-md bg-[#F7F9F7] border border-[#DDE4DF]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#737D76]">
                      1. Aniqlangan muammo
                    </div>
                    <p className="mt-1.5 text-sm text-[#202923] leading-relaxed">
                      {featuredCaseStudy.issueSummary}
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-[#EAF4ED] border border-[#176B45]/30">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#104B33]">
                      2. Erishilgan amaliy natija
                    </div>
                    <p className="mt-1.5 text-sm text-[#104B33] font-medium leading-relaxed">
                      {featuredCaseStudy.outcome}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#737D76] mb-2">
                    3. Tashkilot tomonidan amalga oshirilgan chora-tadbirlar:
                  </h3>
                  <ul className="space-y-2 text-sm text-[#202923]">
                    {featuredCaseStudy.measuresTaken.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDE4DF] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono-tabular text-[#176B45] font-semibold">
                  Ko'rsatkich: {featuredCaseStudy.verifiedMetricLabel}
                </span>
                <div className="flex items-center gap-3">
                  {featuredCaseStudy.relatedArticleSlug && (
                    <button
                      type="button"
                      onClick={() =>
                        go({
                          page: "article",
                          slug: featuredCaseStudy.relatedArticleSlug!,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors"
                    >
                      <span>Batafsil maqolani o'qish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Completed Cases Archive with Search & District Filtering */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DDE4DF]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
              Hujjatlashtirilgan amaliy ishlar reestri
            </div>
            <h2 className="mt-1 text-2xl font-bold text-[#202923]">
              Bajarilgan ishlar va hal etilgan holatlar arxivi
            </h2>
          </div>
          <div className="text-xs font-mono-tabular text-[#737D76]">
            Ko'rsatilmoqda: <strong>{filteredCases.length} ta holat</strong>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-[#DDE4DF] rounded-lg p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#737D76] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Muammo tavsifi, hudud yoki bajarilgan chora bo'yicha qidirish..."
              aria-label="Murojaatlar ijrosi arxividan qidirish"
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-[#202923] focus:outline-none focus:border-[#176B45]"
            />
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Hudud bo'yicha saralash"
          >
            {districtsList.map((dist) => (
              <button
                key={dist}
                type="button"
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedDistrict === dist
                    ? "bg-[#176B45] text-white font-semibold"
                    : "bg-[#F7F9F7] text-[#202923]/80 hover:bg-[#EAF4ED]"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* Completed Cases List */}
        <div className="space-y-5">
          {filteredCases.map((caseItem) => {
            const isExpanded = expandedCaseId === caseItem.id;
            const relatedDoc = caseItem.relatedDocumentId
              ? documents.find((d) => d.id === caseItem.relatedDocumentId)
              : undefined;

            return (
              <article
                key={caseItem.id}
                className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden"
              >
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4">
                    <DocumentaryPlate
                      sceneId={caseItem.coverSceneId}
                      aspectRatio="16:9"
                      showOverlayBadge={false}
                      className="rounded-md border border-[#DDE4DF]"
                    />
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#737D76]">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#176B45]">
                        <MapPin className="w-3.5 h-3.5" />
                        {caseItem.district}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Hisobot davri: {caseItem.reportingPeriod}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">
                        Yakunlandi: {caseItem.completedDate}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#202923]">
                      {caseItem.title}
                    </h3>

                    <p className="text-sm text-[#737D76] leading-relaxed">
                      <strong className="text-[#202923]">Masala mazmuni:</strong>{" "}
                      {caseItem.issueSummary}
                    </p>

                    <div className="p-3.5 rounded bg-[#EAF4ED]/70 text-xs sm:text-sm text-[#104B33]">
                      <strong>Yakuniy natija:</strong> {caseItem.outcome}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-mono-tabular text-[#737D76]">
                        {caseItem.verifiedMetricLabel}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedCaseId(isExpanded ? null : caseItem.id)
                          }
                          className="px-3 py-1.5 text-xs font-semibold text-[#176B45] bg-[#F7F9F7] hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md transition-colors"
                        >
                          {isExpanded
                            ? "Tafsilotlarni yopish"
                            : "Ko'rilgan choralar va fotodalillar"}
                        </button>
                        {caseItem.relatedArticleSlug && (
                          <button
                            type="button"
                            onClick={() =>
                              go({
                                page: "article",
                                slug: caseItem.relatedArticleSlug!,
                              })
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B45] hover:text-[#104B33]"
                          >
                            <span>Maqolaga o'tish</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-4 bg-[#F7F9F7] border-t border-[#DDE4DF] space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#202923] mb-2">
                        Amalga oshirilgan ishlar ketma-ketligi:
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#202923]/90">
                        {caseItem.measuresTaken.map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono-tabular font-semibold text-[#176B45]">
                              0{i + 1}.
                            </span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {relatedDoc && (
                      <div className="p-3.5 bg-white border border-[#DDE4DF] rounded-md flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#176B45]" />
                          <span>
                            Tasdiqlangan hisobot hujjati:{" "}
                            <strong className="text-[#202923]">
                              {relatedDoc.title}
                            </strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => go({ page: "documents" })}
                          className="font-semibold text-[#176B45] hover:underline"
                        >
                          Hujjatlar arxivida ko'rish →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
