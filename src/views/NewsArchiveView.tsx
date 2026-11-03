import React, { useState } from "react";
import { ArrowRight, Calendar, Search, RotateCcw } from "lucide-react";
import { AppRoute, NewsArticle, NewsCategory } from "../types/domain";
import { filterNewsArticles, paginateItems } from "../utils/archiveLogic";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface NewsArchiveViewProps {
  articles: NewsArticle[];
  onNavigate: (route: AppRoute) => void;
}

const CATEGORIES: (NewsCategory | "Barchasi")[] = [
  "Barchasi",
  "Yangiliklar",
  "E'lonlar",
  "Texnika",
  "Loyihalar",
  "Hududiy faoliyat",
  "Tadbirlar",
  "Hisobotlar",
];

export const NewsArchiveView: React.FC<NewsArchiveViewProps> = ({
  articles,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    NewsCategory | "Barchasi"
  >("Barchasi");
  const [datePeriod, setDatePeriod] = useState<
    "all" | "2026-q4" | "2026-q3" | "2026-h1"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const publishedAll = articles.filter((a) => a.status === "published");
  const featuredArticle =
    publishedAll.find((a) => a.featuredTier === "lead") || publishedAll[0];

  const filtered = filterNewsArticles(articles, {
    searchQuery,
    category: selectedCategory,
    datePeriod,
    onlyPublished: true,
  });

  const { items: pageArticles, totalPages, safePage, totalItems } =
    paginateItems(filtered, currentPage, 6);

  const go = (route: AppRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Barchasi");
    setDatePeriod("all");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#DDE4DF] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            VODIYTRANS.UZ · Raqamli matbuot arxivi (/yangiliklar)
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-[#202923]">
            Yangiliklar va rasmiy xabarlar arxivi
          </h1>
          <p className="mt-2 text-sm text-[#737D76] max-w-2xl">
            Tashkilot faoliyati, hududiy bo'linmalar ishi, maxsus texnikalar
            taqsimoti, amalga oshirilgan loyihalar va davriy hisobotlar bo'yicha
            tasdiqlangan materiallar.
          </p>
        </div>
        <div className="text-xs font-mono-tabular text-[#737D76]">
          Jami nashr etilgan maqolalar:{" "}
          <strong className="text-[#202923]">{publishedAll.length} ta</strong>
        </div>
      </div>

      {/* Featured Story Highlight */}
      {featuredArticle &&
        selectedCategory === "Barchasi" &&
        !searchQuery.trim() &&
        datePeriod === "all" && (
          <section
            aria-label="Asosiy maqola"
            className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <DocumentaryPlate
                sceneId={featuredArticle.coverSceneId}
                aspectRatio="16:9"
                className="h-full w-full"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#737D76]">
                  <span className="font-semibold text-[#176B45] uppercase tracking-wider">
                    Asosiy mavzu · {featuredArticle.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {featuredArticle.displayDate}
                  </span>
                </div>
                <h2 className="mt-3 text-xl sm:text-2xl font-bold text-[#202923] leading-snug">
                  <button
                    type="button"
                    onClick={() =>
                      go({ page: "article", slug: featuredArticle.slug })
                    }
                    className="text-left hover:text-[#176B45] transition-colors"
                  >
                    {featuredArticle.title}
                  </button>
                </h2>
                <p className="mt-3 text-sm text-[#737D76] leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DDE4DF] flex items-center justify-between">
                <span className="text-xs text-[#737D76]">
                  {featuredArticle.author}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    go({ page: "article", slug: featuredArticle.slug })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:text-[#104B33] whitespace-nowrap"
                >
                  <span>To'liq o'qish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        )}

      {/* Search, Category & Date Filtering Bar */}
      <section
        aria-label="Qidiruv va saralash"
        className="bg-white border border-[#DDE4DF] rounded-lg p-5 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-[#737D76] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Sarlavha, hudud yoki kalit so'z bo'yicha qidirish..."
              aria-label="Yangiliklardan qidirish"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-[#202923] placeholder:text-[#737D76] focus:outline-none focus:border-[#176B45]"
            />
          </div>

          {/* Date Filter Select */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#176B45] shrink-0" />
            <select
              value={datePeriod}
              onChange={(e) => {
                setDatePeriod(
                  e.target.value as "all" | "2026-q4" | "2026-q3" | "2026-h1"
                );
                setCurrentPage(1);
              }}
              aria-label="Sana davri bo'yicha saralash"
              className="w-full px-3 py-2.5 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-[#202923] focus:outline-none focus:border-[#176B45]"
            >
              <option value="all">Barcha davrlar (2026)</option>
              <option value="2026-q4">2026-yil IV chorak (Oktabr – Noyabr)</option>
              <option value="2026-q3">2026-yil III chorak (Iyul – Sentabr)</option>
              <option value="2026-h1">2026-yil I yarim yillik</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex justify-end">
            <button
              type="button"
              onClick={handleResetFilters}
              title="Filtrlarni tozalash"
              aria-label="Filtrlarni tozalash"
              className="w-full md:w-auto px-3 py-2.5 text-xs font-medium text-[#737D76] hover:text-[#202923] bg-[#F7F9F7] hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="md:hidden">Tozalash</span>
            </button>
          </div>
        </div>

        {/* Interactive Category Segmented Filter Buttons */}
        <div
          className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#DDE4DF]"
          role="group"
          aria-label="Yangiliklar ruknlari"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-[#176B45] text-white font-semibold"
                    : "bg-[#F7F9F7] text-[#202923]/80 hover:bg-[#EAF4ED] hover:text-[#104B33]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#737D76]">
        <div>
          Topilgan maqolalar:{" "}
          <strong className="text-[#202923] font-mono-tabular">
            {totalItems} ta
          </strong>
          {selectedCategory !== "Barchasi" && (
            <span> · Rukn: {selectedCategory}</span>
          )}
        </div>
        <div className="font-mono-tabular">
          Sahifa {safePage} / {totalPages}
        </div>
      </div>

      {/* Editorial News Grid */}
      {pageArticles.length === 0 ? (
        <div className="bg-white border border-[#DDE4DF] rounded-lg p-12 text-center space-y-3">
          <p className="text-base font-semibold text-[#202923]">
            Tanlangan mezonlar bo'yicha maqolalar topilmadi.
          </p>
          <p className="text-xs text-[#737D76]">
            Qidiruv so'zini o'zgartirib ko'ring yoki barcha ruknlarni qayta
            tanlang.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
          >
            Barcha maqolalarni ko'rsatish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageArticles.map((article) => (
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
                    <span className="font-mono-tabular">
                      {article.displayDate}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold text-[#202923] leading-snug">
                    <button
                      type="button"
                      onClick={() =>
                        go({ page: "article", slug: article.slug })
                      }
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
                  {article.districtTag || "Farg'ona vodiysi"}
                </span>
                <button
                  type="button"
                  onClick={() => go({ page: "article", slug: article.slug })}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B45] hover:text-[#104B33] whitespace-nowrap"
                >
                  <span>Batafsil</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="pt-6 border-t border-[#DDE4DF] flex items-center justify-center gap-2"
          role="navigation"
          aria-label="Sahifalash"
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3.5 py-2 text-xs font-medium rounded-md border border-[#DDE4DF] bg-white text-[#202923] disabled:opacity-40 hover:bg-[#EAF4ED] transition-colors"
          >
            Oldingi sahifa
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3.5 py-2 text-xs font-mono-tabular font-semibold rounded-md border transition-colors ${
                pageNum === safePage
                  ? "bg-[#176B45] text-white border-[#176B45]"
                  : "bg-white text-[#202923] border-[#DDE4DF] hover:bg-[#EAF4ED]"
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3.5 py-2 text-xs font-medium rounded-md border border-[#DDE4DF] bg-white text-[#202923] disabled:opacity-40 hover:bg-[#EAF4ED] transition-colors"
          >
            Keyingi sahifa
          </button>
        </div>
      )}
    </div>
  );
};
