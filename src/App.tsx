import React, { useEffect, useState } from "react";
import {
  ActivityDirection,
  AppRoute,
  CompletedAppealCase,
  DistrictPerformanceStat,
  InstitutionalSettings,
  LeadershipPlaceholder,
  MonthlyPerformanceStat,
  NewsArticle,
  OfficialDocument,
  OrganizationalMetric,
  PhotoAlbum,
  RegionalBranch,
  VideoItem,
} from "./types/domain";
import {
  INITIAL_ACTIVITY_DIRECTIONS,
  INITIAL_ARTICLES,
  INITIAL_BRANCHES,
  INITIAL_COMPLETED_CASES,
  INITIAL_DISTRICT_STATS,
  INITIAL_DOCUMENTS,
  INITIAL_LEADERSHIP,
  INITIAL_MONTHLY_STATS,
  INITIAL_ORG_METRICS,
  INITIAL_PHOTO_ALBUMS,
  INITIAL_SETTINGS,
  INITIAL_VIDEOS,
} from "./data/mockData";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { ArticleDetailView } from "./views/ArticleDetailView";
import { NewsArchiveView } from "./views/NewsArchiveView";
import { MurojaatlarIjrosiView } from "./views/MurojaatlarIjrosiView";
import { MediaGalleryView } from "./views/MediaGalleryView";
import { DocumentsArchiveView } from "./views/DocumentsArchiveView";
import {
  AboutView,
  ActivitiesView,
  BranchesView,
  ContactView,
} from "./views/OrganizationViews";
import { AdminDashboardView } from "./views/AdminDashboardView";

function parsePathnameToRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return { page: "home" };
  if (clean === "/yangiliklar") return { page: "news" };
  if (clean.startsWith("/yangiliklar/")) {
    const slug = clean.replace("/yangiliklar/", "");
    return { page: "article", slug };
  }
  if (clean === "/murojaatlar-ijrosi") return { page: "appeals-results" };
  if (clean === "/hujjatlar") return { page: "documents" };
  if (clean === "/foto-va-video") return { page: "media" };
  if (clean === "/tashkilot-haqida") return { page: "about", tab: "umumiy" };
  if (clean === "/rahbariyat") return { page: "about", tab: "rahbariyat" };
  if (clean === "/faoliyat" || clean === "/faoliyatimiz")
    return { page: "activities" };
  if (clean === "/filiallar" || clean === "/hududiy-filiallar")
    return { page: "branches" };
  if (clean === "/aloqa") return { page: "contact" };
  if (clean.startsWith("/admin")) return { page: "admin", section: "overview" };
  return { page: "home" };
}

function routeToPathname(route: AppRoute): string {
  switch (route.page) {
    case "home":
      return "/";
    case "news":
      return "/yangiliklar";
    case "article":
      return `/yangiliklar/${route.slug}`;
    case "appeals-results":
      return "/murojaatlar-ijrosi";
    case "documents":
      return "/hujjatlar";
    case "media":
      return "/foto-va-video";
    case "about":
      return "/tashkilot-haqida";
    case "activities":
      return "/faoliyat";
    case "branches":
      return "/filiallar";
    case "contact":
      return "/aloqa";
    case "admin":
      return "/admin";
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    parsePathnameToRoute(window.location.pathname)
  );
  const [settings, setSettings] =
    useState<InstitutionalSettings>(INITIAL_SETTINGS);
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_ARTICLES);
  const [activities] = useState<ActivityDirection[]>(
    INITIAL_ACTIVITY_DIRECTIONS
  );
  const [metrics, setMetrics] =
    useState<OrganizationalMetric[]>(INITIAL_ORG_METRICS);
  const [branches, setBranches] = useState<RegionalBranch[]>(INITIAL_BRANCHES);
  const [completedCases, setCompletedCases] = useState<CompletedAppealCase[]>(
    INITIAL_COMPLETED_CASES
  );
  const [districtStats, setDistrictStats] = useState<DistrictPerformanceStat[]>(
    INITIAL_DISTRICT_STATS
  );
  const [monthlyStats] = useState<MonthlyPerformanceStat[]>(
    INITIAL_MONTHLY_STATS
  );
  const [albums, setAlbums] = useState<PhotoAlbum[]>(INITIAL_PHOTO_ALBUMS);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [documents, setDocuments] =
    useState<OfficialDocument[]>(INITIAL_DOCUMENTS);
  const [leadership] = useState<LeadershipPlaceholder[]>(INITIAL_LEADERSHIP);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parsePathnameToRoute(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleNavigate = (nextRoute: AppRoute) => {
    setRoute(nextRoute);
    const nextPath = routeToPathname(nextRoute);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
  };

  const handleSaveArticle = (article: NewsArticle) => {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === article.id);
      if (exists) {
        return prev.map((a) => (a.id === article.id ? article : a));
      }
      return [article, ...prev];
    });
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveCase = (item: CompletedAppealCase) => {
    setCompletedCases((prev) => {
      const exists = prev.some((c) => c.id === item.id);
      if (exists) {
        return prev.map((c) => (c.id === item.id ? item : c));
      }
      return [item, ...prev];
    });
  };

  if (route.page === "admin") {
    return (
      <AdminDashboardView
        initialSection={route.section}
        articles={articles}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        cases={completedCases}
        onSaveCase={handleSaveCase}
        albums={albums}
        onUpdateAlbums={setAlbums}
        videos={videos}
        onUpdateVideos={setVideos}
        documents={documents}
        onUpdateDocuments={setDocuments}
        metrics={metrics}
        onUpdateMetrics={setMetrics}
        districtStats={districtStats}
        onUpdateDistrictStats={setDistrictStats}
        branches={branches}
        onUpdateBranches={setBranches}
        settings={settings}
        onUpdateSettings={setSettings}
        onNavigate={handleNavigate}
      />
    );
  }

  const activeArticle =
    route.page === "article"
      ? articles.find((a) => a.slug === route.slug) || articles[0]
      : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F7] text-[#202923]">
      <Header
        currentRoute={route}
        onNavigate={handleNavigate}
        settings={settings}
        articles={articles}
        cases={completedCases}
        documents={documents}
      />

      <main className="flex-1">
        {route.page === "home" && (
          <HomeView
            articles={articles}
            activities={activities}
            metrics={metrics}
            branches={branches}
            completedCases={completedCases}
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {route.page === "article" && activeArticle && (
          <ArticleDetailView
            article={activeArticle}
            allArticles={articles}
            documents={documents}
            onNavigate={handleNavigate}
          />
        )}

        {route.page === "news" && (
          <NewsArchiveView articles={articles} onNavigate={handleNavigate} />
        )}

        {route.page === "appeals-results" && (
          <MurojaatlarIjrosiView
            cases={completedCases}
            districtStats={districtStats}
            monthlyStats={monthlyStats}
            documents={documents}
            onNavigate={handleNavigate}
          />
        )}

        {route.page === "media" && (
          <MediaGalleryView albums={albums} videos={videos} />
        )}

        {route.page === "documents" && (
          <DocumentsArchiveView documents={documents} />
        )}

        {route.page === "about" && (
          <AboutView
            initialTab={route.tab}
            settings={settings}
            leadership={leadership}
            activities={activities}
            onNavigate={handleNavigate}
          />
        )}

        {route.page === "activities" && (
          <ActivitiesView activities={activities} onNavigate={handleNavigate} />
        )}

        {route.page === "branches" && <BranchesView branches={branches} />}

        {route.page === "contact" && (
          <ContactView
            settings={settings}
            branches={branches}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer settings={settings} onNavigate={handleNavigate} />
    </div>
  );
}
