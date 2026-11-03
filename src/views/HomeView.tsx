import React from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, FileText, MapPin } from "lucide-react";
import {
  ActivityDirection,
  AppRoute,
  CompletedAppealCase,
  InstitutionalSettings,
  NewsArticle,
  OrganizationalMetric,
  RegionalBranch,
} from "../types/domain";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface HomeViewProps {
  articles: NewsArticle[];
  activities: ActivityDirection[];
  metrics: OrganizationalMetric[];
  branches: RegionalBranch[];
  completedCases: CompletedAppealCase[];
  settings: InstitutionalSettings;
  onNavigate: (route: AppRoute) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  activities,
  metrics,
  branches,
  completedCases,
  settings,
  onNavigate,
}) => {
  const publishedArticles = articles.filter((a) => a.status === "published");
  const leadArticle =
    publishedArticles.find((a) => a.featuredTier === "lead") ||
    publishedArticles[0];
  const secondaryFeatured = publishedArticles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 2);
  const latestSixArticles = publishedArticles.slice(0, 6);
  const featuredTransparencyCases = completedCases
    .filter((c) => c.status === "published")
    .slice(0, 3);

  const go = (route: AppRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-8">
      {/* Institutional Masthead & Editorial Hero Section */}
      <section className="bg-white border-b border-[#DDE4DF] pt-6 pb-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subdued Institutional Kicker Bar */}
          <div className="pb-5 mb-7 border-b border-[#DDE4DF] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#737D76]">
            <div>
              <strong className="text-[#202923] font-semibold">
                {settings.organizationLegalName}
              </strong>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>Rasmiy axborot platformasi, matbuot xonasi va raqamli arxiv</span>
            </div>
            <div className="font-mono-tabular text-[#176B45] font-medium">
              Farg'ona vodiysi · Sanitariya va kommunal xizmatlar
            </div>
          </div>

          {/* 3-Tier Editorial Hero Grid: 1 Large Lead + 2 Secondary Featured */}
          {leadArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Lead Featured Story (7 cols) */}
              <article className="lg:col-span-7 flex flex-col justify-between bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg overflow-hidden group">
                <div>
                  <button
                    type="button"
                    onClick={() => go({ page: "article", slug: leadArticle.slug })}
                    className="block w-full text-left overflow-hidden focus:outline-none"
                  >
                    <DocumentaryPlate
                      sceneId={leadArticle.coverSceneId}
                      aspectRatio="16:9"
                      className="transition-transform duration-200 group-hover:scale-[1.01]"
                    />
                  </button>
                  <div className="p-6 sm:p-8">
                    {/* Zero-pill metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#737D76]">
                      <span className="font-semibold text-[#176B45]">
                        {leadArticle.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{leadArticle.displayDate}</span>
                      {leadArticle.districtTag && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{leadArticle.districtTag}</span>
                        </>
                      )}
                    </div>

                    <h1 className="mt-3 text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#202923] leading-[1.22] tracking-tight">
                      <button
                        type="button"
                        onClick={() => go({ page: "article", slug: leadArticle.slug })}
                        className="text-left hover:text-[#176B45] transition-colors"
                      >
                        {leadArticle.title}
                      </button>
                    </h1>

                    <p className="mt-3.5 text-sm sm:text-base text-[#202923]/80 leading-relaxed">
                      {leadArticle.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-[#DDE4DF]/70 flex items-center justify-between gap-4">
                  <span className="text-xs text-[#737D76]">{leadArticle.author}</span>
                  <button
                    type="button"
                    onClick={() => go({ page: "article", slug: leadArticle.slug })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Maqolani to'liq o'qish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* Two Smaller Featured Articles (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {secondaryFeatured.map((secArticle) => (
                  <article
                    key={secArticle.id}
                    className="flex-1 bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => go({ page: "article", slug: secArticle.slug })}
                        className="block w-full text-left overflow-hidden"
                      >
                        <DocumentaryPlate
                          sceneId={secArticle.coverSceneId}
                          aspectRatio="21:9"
                          showOverlayBadge={false}
                          className="transition-transform duration-200 group-hover:scale-[1.01]"
                        />
                      </button>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-[#737D76]">
                          <span className="font-semibold text-[#176B45]">
                            {secArticle.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular">
                            {secArticle.displayDate}
                          </span>
                        </div>

                        <h2 className="mt-2 text-lg font-bold text-[#202923] leading-snug">
                          <button
                            type="button"
                            onClick={() =>
                              go({ page: "article", slug: secArticle.slug })
                            }
                            className="text-left hover:text-[#176B45] transition-colors"
                          >
                            {secArticle.title}
                          </button>
                        </h2>

                        <p className="mt-2 text-xs sm:text-sm text-[#737D76] line-clamp-2 leading-relaxed">
                          {secArticle.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-4 pt-2 border-t border-[#DDE4DF]/60 flex items-center justify-between">
                      <span className="text-xs text-[#737D76]">
                        {secArticle.districtTag || "Farg'ona vodiysi"}
                      </span>
                      <button
                        type="button"
                        onClick={() => go({ page: "article", slug: secArticle.slug })}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Batafsil</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section: So'nggi yangiliklar (6 editorial news cards) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#DDE4DF]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
              Rasmiy axborot xonasi
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#202923]">
              So'nggi yangiliklar
            </h2>
          </div>
          <button
            type="button"
            onClick={() => go({ page: "news" })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Barcha yangiliklar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestSixArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <button
                  type="button"
                  onClick={() => go({ page: "article", slug: article.slug })}
                  className="block w-full text-left overflow-hidden"
                >
                  <DocumentaryPlate
                    sceneId={article.coverSceneId}
                    aspectRatio="4:3"
                    showOverlayBadge={false}
                    className="transition-transform duration-200 group-hover:scale-[1.01]"
                  />
                </button>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#737D76]">
                    <span className="font-semibold text-[#176B45]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{article.displayDate}</span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold text-[#202923] leading-snug">
                    <button
                      type="button"
                      onClick={() => go({ page: "article", slug: article.slug })}
                      className="text-left hover:text-[#176B45] transition-colors"
                    >
                      {article.title}
                    </button>
                  </h3>

                  <p className="mt-2.5 text-sm text-[#737D76] line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-[#DDE4DF]/70 flex items-center justify-between">
                <span className="text-xs text-[#737D76]">
                  {article.readTimeMinutes} daqiqa o'qish
                </span>
                <button
                  type="button"
                  onClick={() => go({ page: "article", slug: article.slug })}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Batafsil</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section: Faoliyat yo'nalishlari (4 visual sections) */}
      <section className="bg-white border-y border-[#DDE4DF] py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#DDE4DF]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                Asosiy vazifalar va xizmatlar
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#202923]">
                Faoliyat yo'nalishlari
              </h2>
            </div>
            <button
              type="button"
              onClick={() => go({ page: "activities" })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Barcha yo'nalishlar tavsifi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-12"
              >
                <div className="sm:col-span-5">
                  <DocumentaryPlate
                    sceneId={act.sceneId}
                    aspectRatio="4:3"
                    showOverlayBadge={false}
                    className="h-full w-full"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular font-semibold text-[#176B45]">
                      {act.numberLabel}. YO'NALISH
                    </div>
                    <h3 className="mt-1.5 text-lg font-bold text-[#202923]">
                      {act.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#737D76] leading-relaxed">
                      {act.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#DDE4DF] flex items-center justify-between text-xs">
                    <span className="text-[#202923] font-medium">
                      {act.keyIndicatorPlaceholder}
                    </span>
                    <button
                      type="button"
                      onClick={() => go({ page: "activities" })}
                      className="font-semibold text-[#176B45] hover:text-[#104B33] whitespace-nowrap"
                    >
                      Batafsil →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Amalga oshirilgan ishlar (Verified Organizational Results - Illustrative Placeholders) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#104B33] text-[#EAF4ED] rounded-xl p-6 sm:p-10 border border-[#176B45]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#176B45]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8CD1A8]">
                Ochiq hisobdorlik ko'rsatkichlari
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                Amalga oshirilgan ishlar
              </h2>
              <p className="mt-2 text-sm text-[#EAF4ED]/85 max-w-2xl">
                Hududlarda sanitariya tozalash, qattiq maishiy chiqindilarni olib
                chiqish, maxsus texnikalar parkini yangilash va infratuzilmani
                yaxshilash bo'yicha asosiy natijalar.
              </p>
            </div>
            <div className="text-xs text-[#A7D4B8] bg-[#0C3826] border border-[#176B45] px-3.5 py-2 rounded-md max-w-sm">
              <strong>Izoh:</strong> Barcha raqamlar dizayn prototipi uchun namuna
              sifatida keltirilgan bo'lib, tasdiqlangan rasmiy ma'lumotlar bilan
              almashtiriladi.
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-[#0C3826]/90 border border-[#176B45] rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#A7D4B8]">{metric.periodNote}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-mono-tabular text-white">
                      {metric.value}
                    </span>
                    <span className="text-xs text-[#8CD1A8]">{metric.unit}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {metric.label}
                  </h3>
                </div>
                <p className="mt-3 pt-3 border-t border-[#176B45]/60 text-xs text-[#EAF4ED]/75 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Murojaatlar ijrosi — amaliy natijalar (Public Transparency Section) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#DDE4DF]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
              Jamoatchilik oldida ochiqlik va amaliy hisobot
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#202923]">
              Murojaatlar ijrosi — amaliy natijalar
            </h2>
            <p className="mt-2 text-sm text-[#737D76] max-w-3xl leading-relaxed">
              Belgilangan davlat va rasmiy aloqa kanallari orqali kelib tushgan
              murojaatlar asosida hududlarda aniqlangan muammolarni o'rganish,
              ularni joyida bartaraf etish hamda erishilgan amaliy o'zgarishlar
              haqida tasdiqlangan ma'lumotlar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go({ page: "appeals-results" })}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <span>Barcha natijalar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredTransparencyCases.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div>
                <DocumentaryPlate
                  sceneId={item.coverSceneId}
                  aspectRatio="16:9"
                  showOverlayBadge={false}
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#737D76]">
                    <span className="font-semibold text-[#176B45]">
                      {item.district}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">
                      Yakunlandi: {item.completedDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#202923] leading-snug">
                    {item.title}
                  </h3>

                  <div className="space-y-3 pt-2 border-t border-[#DDE4DF] text-xs leading-relaxed">
                    <div>
                      <span className="font-semibold text-[#202923] block">
                        Aniqlangan masala:
                      </span>
                      <span className="text-[#737D76]">{item.issueSummary}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#202923] block">
                        Ko'rilgan amaliy chora:
                      </span>
                      <span className="text-[#737D76]">{item.measuresTaken[0]}</span>
                    </div>
                    <div className="p-3 rounded bg-[#EAF4ED]/70 text-[#104B33]">
                      <span className="font-semibold block mb-0.5">
                        Amaliy natija:
                      </span>
                      <span>{item.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-5 pt-3 border-t border-[#DDE4DF]/70 flex items-center justify-between text-xs">
                <span className="font-mono-tabular text-[#737D76]">
                  {item.verifiedMetricLabel}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    item.relatedArticleSlug
                      ? go({ page: "article", slug: item.relatedArticleSlug })
                      : go({ page: "appeals-results" })
                  }
                  className="font-semibold text-[#176B45] hover:text-[#104B33] whitespace-nowrap"
                >
                  To'liq tafsilot →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section: Hududiy filiallar (Regional Branches Overview) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#DDE4DF]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
              Mintaqaviy tuzilma
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#202923]">
              Hududiy filiallar
            </h2>
            <p className="mt-1 text-sm text-[#737D76]">
              Filiallar nomi, manzili va aloqa raqamlari tasdiqlangan rasmiy
              ro'yxat asosida to'ldiriladigan namuna ko'rinishida berilgan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go({ page: "branches" })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B45] hover:text-[#104B33] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Barcha filiallar ma'lumoti</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div>
                <DocumentaryPlate
                  sceneId={branch.sceneId}
                  aspectRatio="4:3"
                  showOverlayBadge={false}
                />
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#176B45] font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{branch.locationPlaceholder}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-[#202923] leading-snug">
                    {branch.branchNamePlaceholder}
                  </h3>
                  <p className="mt-2 text-xs text-[#737D76] leading-relaxed">
                    {branch.serviceAreaDescription}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-[#DDE4DF]/70 space-y-1 text-xs text-[#737D76]">
                <div>
                  <strong className="text-[#202923]">Texnika parki:</strong>{" "}
                  {branch.machineryCountPlaceholder}
                </div>
                <div>
                  <strong className="text-[#202923]">Aloqa:</strong>{" "}
                  {branch.phonePlaceholder}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
