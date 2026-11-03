import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  Globe,
  Clock,
  Phone,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
import {
  AppRoute,
  CompletedAppealCase,
  InstitutionalSettings,
  NewsArticle,
  OfficialDocument,
} from "../types/domain";

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  settings: InstitutionalSettings;
  articles: NewsArticle[];
  cases: CompletedAppealCase[];
  documents: OfficialDocument[];
}

export const VodiyTransLogo: React.FC<{ className?: string }> = ({
  className = "w-9 h-9",
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="6" fill="#176B45" />
    {/* Geometric environmental responsibility, cleanliness & movement motif */}
    <path
      d="M9 20.5L16.5 28L31 13.5"
      stroke="#EAF4ED"
      strokeWidth="3.2"
      strokeLinecap="square"
    />
    <path
      d="M9 13.5H21.5L16.5 18.5H9V13.5Z"
      fill="#75B792"
    />
    <path
      d="M21 26.5H31V29.5H18L21 26.5Z"
      fill="#EAF4ED"
      fillOpacity="0.85"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  settings,
  articles,
  cases,
  documents,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState<"UZ" | "КИР" | "RU">("UZ");
  const [langNotice, setLangNotice] = useState<string | null>(null);

  const navItems: { label: string; route: AppRoute; matchPage: AppRoute["page"] }[] = [
    { label: "Bosh sahifa", route: { page: "home" }, matchPage: "home" },
    { label: "Tashkilot haqida", route: { page: "about", tab: "umumiy" }, matchPage: "about" },
    { label: "Yangiliklar", route: { page: "news" }, matchPage: "news" },
    { label: "Faoliyat yo'nalishlari", route: { page: "activities" }, matchPage: "activities" },
    { label: "Hududiy filiallar", route: { page: "branches" }, matchPage: "branches" },
    { label: "Murojaatlar ijrosi", route: { page: "appeals-results" }, matchPage: "appeals-results" },
    { label: "Foto va video", route: { page: "media" }, matchPage: "media" },
    { label: "Hujjatlar", route: { page: "documents" }, matchPage: "documents" },
    { label: "Aloqa", route: { page: "contact" }, matchPage: "contact" },
  ];

  const isRouteActive = (matchPage: AppRoute["page"]) => {
    if (matchPage === "news" && currentRoute.page === "article") return true;
    return currentRoute.page === matchPage;
  };

  const handleNavClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLanguageSelect = (lang: "UZ" | "КИР" | "RU") => {
    setSelectedLang(lang);
    if (lang !== "UZ") {
      setLangNotice(
        "Prototipning asosiy tahririyat tili — O'zbek tili (Lotin alifbosi)."
      );
      setTimeout(() => setLangNotice(null), 4000);
    } else {
      setLangNotice(null);
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchedArticles =
    normalizedQuery.length > 1
      ? articles
          .filter(
            (a) =>
              a.status === "published" &&
              `${a.title} ${a.summary} ${a.category}`
                .toLowerCase()
                .includes(normalizedQuery)
          )
          .slice(0, 4)
      : [];

  const matchedCases =
    normalizedQuery.length > 1
      ? cases
          .filter(
            (c) =>
              c.status === "published" &&
              `${c.title} ${c.issueSummary} ${c.district}`
                .toLowerCase()
                .includes(normalizedQuery)
          )
          .slice(0, 3)
      : [];

  const matchedDocs =
    normalizedQuery.length > 1
      ? documents
          .filter((d) =>
            `${d.title} ${d.code} ${d.summary}`
              .toLowerCase()
              .includes(normalizedQuery)
          )
          .slice(0, 3)
      : [];

  return (
    <>
      {/* Top Institutional Utility Bar */}
      <div className="bg-[#104B33] text-[#EAF4ED] border-b border-[#176B45]/50 text-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[#EAF4ED]/90">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#8CD1A8] shrink-0" />
              <span>{settings.phonePlaceholder}</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#8CD1A8]/50">
              ·
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8CD1A8] shrink-0" />
              <span>{settings.workingHoursPlaceholder}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Social Media Official Placeholders */}
            <div className="hidden sm:flex items-center gap-3 text-[#EAF4ED]/85">
              <a
                href="#footer-socials"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("site-footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                Telegram
              </a>
              <span aria-hidden="true" className="text-[#8CD1A8]/40">
                /
              </span>
              <a
                href="#footer-socials"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick({ page: "media" });
                }}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                YouTube
              </a>
              <span aria-hidden="true" className="text-[#8CD1A8]/40">
                /
              </span>
              <a
                href="#footer-socials"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("site-footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                Facebook
              </a>
            </div>

            <span aria-hidden="true" className="hidden sm:inline text-[#8CD1A8]/40">
              |
            </span>

            {/* Language Selector */}
            <div
              className="inline-flex items-center gap-1"
              role="group"
              aria-label="Tilni tanlash"
            >
              <Globe className="w-3.5 h-3.5 text-[#8CD1A8] mr-0.5" />
              {(["UZ", "КИР", "RU"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageSelect(lang)}
                  className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    selectedLang === lang
                      ? "bg-[#EAF4ED] text-[#104B33] font-semibold"
                      : "text-[#EAF4ED]/80 hover:text-white"
                  }`}
                >
                  {lang === "UZ" ? "O'zb (Lotin)" : lang}
                </button>
              ))}
            </div>

            <span aria-hidden="true" className="text-[#8CD1A8]/40">
              |
            </span>

            {/* Admin Newsroom Switch */}
            <button
              type="button"
              onClick={() => handleNavClick({ page: "admin", section: "overview" })}
              className="inline-flex items-center gap-1.5 text-[#EAF4ED] hover:text-white font-medium transition-colors whitespace-nowrap shrink-0"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#8CD1A8]" />
              <span>Tahririyat paneli (/admin)</span>
            </button>
          </div>
        </div>
        {langNotice && (
          <div className="bg-[#176B45] text-white text-center py-1 px-4 text-xs">
            {langNotice}
          </div>
        )}
      </div>

      {/* Main Institutional Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#DDE4DF]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-17">
            {/* Zone 1: Brand Identity */}
            <button
              type="button"
              onClick={() => handleNavClick({ page: "home" })}
              className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
            >
              <VodiyTransLogo className="w-8 h-8 shrink-0 transition-transform duration-150 group-hover:scale-[1.02]" />
              <span className="text-base sm:text-[17px] font-bold tracking-tight text-[#202923] whitespace-nowrap shrink-0">
                VODIYTRANS.UZ
              </span>
            </button>

            {/* Zone 2: Primary Desktop Navigation */}
            <nav
              aria-label="Asosiy navigatsiya"
              className="hidden xl:flex items-center gap-3 2xl:gap-4 text-[13px] font-medium text-[#202923]"
            >
              {navItems.map((item) => {
                const active = isRouteActive(item.matchPage);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.route)}
                    className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                      active
                        ? "border-[#176B45] text-[#176B45] font-semibold"
                        : "border-transparent text-[#202923]/80 hover:text-[#176B45]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Search & Contextual Published Results Link (Never a complaint submission button) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Arxivdan qidirish"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#202923] bg-[#F7F9F7] hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <Search className="w-3.5 h-3.5 text-[#176B45]" />
                <span className="hidden sm:inline">Qidiruv</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick({ page: "appeals-results" })}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <span>Amaliy natijalar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
                aria-expanded={mobileMenuOpen}
                className="xl:hidden p-2 text-[#202923] hover:bg-[#EAF4ED] rounded-md transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Mobile & Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-[#DDE4DF] px-4 pt-3 pb-5 shadow-lg">
            <div className="text-xs text-[#737D76] mb-3 pb-2 border-b border-[#DDE4DF]">
              {settings.organizationLegalName}
            </div>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1" aria-label="Mobil navigatsiya">
              {navItems.map((item) => {
                const active = isRouteActive(item.matchPage);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.route)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors ${
                      active
                        ? "bg-[#EAF4ED] text-[#104B33] font-semibold"
                        : "text-[#202923] hover:bg-[#F7F9F7]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-4 pt-3 border-t border-[#DDE4DF] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleNavClick({ page: "appeals-results" })}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
              >
                <span>Murojaatlar ijrosi — amaliy natijalar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick({ page: "admin", section: "overview" })}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#104B33] bg-[#EAF4ED] rounded-md"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Tahririyat paneli</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Archive Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#202923]/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Sayt arxivi bo'yicha qidiruv"
        >
          <div className="bg-white border border-[#DDE4DF] rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
            <div className="p-4 border-b border-[#DDE4DF] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#176B45] shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Yangiliklar, murojaatlar ijrosi yoki hujjatlardan qidirish..."
                aria-label="Arxivdan qidirish maydoni"
                autoFocus
                className="w-full text-sm text-[#202923] placeholder:text-[#737D76] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                aria-label="Qidiruv oynasini yopish"
                className="p-1.5 text-[#737D76] hover:text-[#202923] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5">
              {normalizedQuery.length <= 1 ? (
                <div className="text-xs text-[#737D76] space-y-2">
                  <p>
                    Tashkilot faoliyati, hududiy filiallar, maxsus texnikalar yoki
                    bartaraf etilgan muammolar bo'yicha kalit so'zni kiriting
                    (masalan: <strong className="text-[#202923]">Marg'ilon</strong>,{" "}
                    <strong className="text-[#202923]">texnika</strong>,{" "}
                    <strong className="text-[#202923]">sarhisob</strong>).
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76] mb-2">
                      Yangiliklar va maqolalar ({matchedArticles.length})
                    </div>
                    {matchedArticles.length === 0 ? (
                      <p className="text-xs text-[#737D76]">Mos maqolalar topilmadi.</p>
                    ) : (
                      <div className="divide-y divide-[#DDE4DF]">
                        {matchedArticles.map((art) => (
                          <button
                            key={art.id}
                            type="button"
                            onClick={() => {
                              setSearchModalOpen(false);
                              handleNavClick({ page: "article", slug: art.slug });
                            }}
                            className="w-full text-left py-2.5 hover:bg-[#F7F9F7] px-2 rounded transition-colors"
                          >
                            <div className="text-xs text-[#737D76]">
                              {art.category} · {art.displayDate}
                            </div>
                            <div className="text-sm font-semibold text-[#202923] mt-0.5">
                              {art.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76] mb-2">
                      Murojaatlar ijrosi arxivi ({matchedCases.length})
                    </div>
                    {matchedCases.length === 0 ? (
                      <p className="text-xs text-[#737D76]">Mos holatlar topilmadi.</p>
                    ) : (
                      <div className="divide-y divide-[#DDE4DF]">
                        {matchedCases.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setSearchModalOpen(false);
                              handleNavClick({ page: "appeals-results" });
                            }}
                            className="w-full text-left py-2.5 hover:bg-[#F7F9F7] px-2 rounded transition-colors"
                          >
                            <div className="text-xs text-[#737D76]">
                              {c.district} · {c.completedDate}
                            </div>
                            <div className="text-sm font-semibold text-[#202923] mt-0.5">
                              {c.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#737D76] mb-2">
                      Hujjatlar ({matchedDocs.length})
                    </div>
                    {matchedDocs.length === 0 ? (
                      <p className="text-xs text-[#737D76]">Mos hujjatlar topilmadi.</p>
                    ) : (
                      <div className="divide-y divide-[#DDE4DF]">
                        {matchedDocs.map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              setSearchModalOpen(false);
                              handleNavClick({ page: "documents" });
                            }}
                            className="w-full text-left py-2.5 hover:bg-[#F7F9F7] px-2 rounded transition-colors"
                          >
                            <div className="text-xs text-[#737D76]">
                              {d.category} · {d.publishedDate}
                            </div>
                            <div className="text-sm font-semibold text-[#202923] mt-0.5">
                              {d.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
