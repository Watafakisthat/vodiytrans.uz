import React, { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  Eye,
  FilePlus2,
  FileText,
  FolderKanban,
  Image,
  LayoutDashboard,
  Newspaper,
  Plus,
  Save,
  Settings,
  Trash2,
  Video,
} from "lucide-react";
import {
  AdminSectionId,
  AppRoute,
  CompletedAppealCase,
  DistrictPerformanceStat,
  DocumentCategory,
  InstitutionalSettings,
  NewsArticle,
  NewsCategory,
  OfficialDocument,
  OrganizationalMetric,
  PhotoAlbum,
  RegionalBranch,
  ScenePlateId,
  VideoItem,
} from "../types/domain";
import {
  createSlugFromTitle,
  validateAppealCaseInput,
  validateArticleDraftInput,
} from "../utils/archiveLogic";
import { DocumentaryPlate } from "../components/DocumentaryPlate";
import { VodiyTransLogo } from "../components/Header";

interface AdminDashboardViewProps {
  initialSection?: AdminSectionId;
  articles: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  cases: CompletedAppealCase[];
  onSaveCase: (item: CompletedAppealCase) => void;
  albums: PhotoAlbum[];
  onUpdateAlbums: (albums: PhotoAlbum[]) => void;
  videos: VideoItem[];
  onUpdateVideos: (videos: VideoItem[]) => void;
  documents: OfficialDocument[];
  onUpdateDocuments: (docs: OfficialDocument[]) => void;
  metrics: OrganizationalMetric[];
  onUpdateMetrics: (metrics: OrganizationalMetric[]) => void;
  districtStats: DistrictPerformanceStat[];
  onUpdateDistrictStats: (stats: DistrictPerformanceStat[]) => void;
  branches: RegionalBranch[];
  onUpdateBranches: (branches: RegionalBranch[]) => void;
  settings: InstitutionalSettings;
  onUpdateSettings: (settings: InstitutionalSettings) => void;
  onNavigate: (route: AppRoute) => void;
}

const SCENE_OPTIONS: { id: ScenePlateId; label: string }[] = [
  { id: "fleet_depot", label: "Markaziy avtosaroy va maxsus texnikalar safi" },
  { id: "street_sanitation", label: "Shahar ko'chasida sanitariya va texnika ishlari" },
  { id: "container_station", label: "Zamonaviy chiqindi yig'ish shoxobchasi" },
  { id: "resolved_courtyard", label: "Obodonlashtirilgan va tozalangan mahalla hududi" },
  { id: "regional_branch", label: "Hududiy filial ma'muriy va texnik bazasi" },
  { id: "gps_dispatch", label: "Markaziy GPS dispecherlik monitoring xizmati" },
  { id: "sorting_line", label: "Saralash va qayta yuklash majmuasi" },
  { id: "winter_readiness", label: "Kuz-qish mavsumi texnik ko'rigi" },
  { id: "eco_awareness", label: "Mahalla obodonlashtirish tadbiri" },
];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  initialSection = "overview",
  articles,
  onSaveArticle,
  onDeleteArticle,
  cases,
  onSaveCase,
  albums,
  onUpdateAlbums,
  videos,
  onUpdateVideos,
  documents,
  onUpdateDocuments,
  metrics,
  onUpdateMetrics,
  districtStats,
  onUpdateDistrictStats,
  branches,
  onUpdateBranches,
  settings,
  onUpdateSettings,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] =
    useState<AdminSectionId>(initialSection);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Article Editor State
  const [artTitle, setArtTitle] = useState("");
  const [artSummary, setArtSummary] = useState("");
  const [artBody, setArtBody] = useState("");
  const [artCategory, setArtCategory] = useState<NewsCategory>("Yangiliklar");
  const [artDate, setArtDate] = useState("2026-11-03");
  const [artAuthor, setArtAuthor] = useState(settings.pressServiceAttribution);
  const [artCoverScene, setArtCoverScene] = useState<ScenePlateId>("fleet_depot");
  const [artCoverCaption, setArtCoverCaption] = useState(
    "Hududiy bo'linmada amalga oshirilgan amaliy ishlar lavhasi. Foto: Matbuot xizmati."
  );
  const [artInlineScene, setArtInlineScene] =
    useState<ScenePlateId>("street_sanitation");
  const [artInlineCaption, setArtInlineCaption] = useState("");
  const [artYoutubeUrl, setArtYoutubeUrl] = useState("");
  const [artErrors, setArtErrors] = useState<string[]>([]);
  const [artPreviewMode, setArtPreviewMode] = useState(false);

  // Murojaatlar Ijrosi Editor State (Publishing tool for completed work)
  const [caseTitle, setCaseTitle] = useState("");
  const [caseIssueSummary, setCaseIssueSummary] = useState("");
  const [caseDistrict, setCaseDistrict] = useState("Marg'ilon yo'nalishi (Namuna)");
  const [casePeriod, setCasePeriod] = useState("2026-yil noyabr, 1-dekada");
  const [caseActionsText, setCaseActionsText] = useState("");
  const [caseOutcome, setCaseOutcome] = useState("");
  const [caseMetricLabel, setCaseMetricLabel] = useState(
    "2 ta yangi konteyner · Kunlik grafik tiklandi (Namuna)"
  );
  const [caseScene, setCaseScene] = useState<ScenePlateId>("resolved_courtyard");
  const [caseDocId, setCaseDocId] = useState<string>("doc-3");
  const [caseStatus, setCaseStatus] = useState<"published" | "draft">("published");
  const [caseErrors, setCaseErrors] = useState<string[]>([]);

  // Media Upload / Edit State
  const [targetAlbumId, setTargetAlbumId] = useState(albums[0]?.id || "alb-1");
  const [newPhotoScene, setNewPhotoScene] =
    useState<ScenePlateId>("container_station");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoLocation, setNewPhotoLocation] = useState(
    "1-hududiy filial (Namuna)"
  );
  const [newPhotoDate, setNewPhotoDate] = useState("3-noyabr, 2026");

  // Video Add State
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDesc, setNewVideoDesc] = useState("");
  const [newVideoYoutubeId, setNewVideoYoutubeId] = useState("M7lc1UVf-VE");
  const [newVideoDate, setNewVideoDate] = useState("3-noyabr, 2026");

  // Document Add State
  const [newDocCode, setNewDocCode] = useState("NAMUNA-HUJJAT-2026/11");
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocCategory, setNewDocCategory] =
    useState<DocumentCategory>("Hisobotlar");
  const [newDocSummary, setNewDocSummary] = useState("");

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const publishedArticlesCount = articles.filter(
    (a) => a.status === "published"
  ).length;
  const draftArticlesCount = articles.filter((a) => a.status === "draft").length;
  const totalPhotosCount = albums.reduce((sum, a) => sum + a.photos.length, 0);

  const navLinks: { id: AdminSectionId; label: string; icon: React.ReactNode }[] =
    [
      {
        id: "overview",
        label: "Boshqaruv paneli",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        id: "news-list",
        label: "Yangiliklar",
        icon: <Newspaper className="w-4 h-4" />,
      },
      {
        id: "article-create",
        label: "Maqola yaratish",
        icon: <FilePlus2 className="w-4 h-4" />,
      },
      {
        id: "appeals-editor",
        label: "Murojaatlar ijrosi materiallari",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      {
        id: "media-library",
        label: "Media kutubxonasi",
        icon: <Image className="w-4 h-4" />,
      },
      {
        id: "videos",
        label: "Videolar",
        icon: <Video className="w-4 h-4" />,
      },
      {
        id: "documents",
        label: "Hujjatlar",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "statistics",
        label: "Statistik ma'lumotlar",
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        id: "branches",
        label: "Hududiy filiallar",
        icon: <Building2 className="w-4 h-4" />,
      },
      {
        id: "settings",
        label: "Sozlamalar",
        icon: <Settings className="w-4 h-4" />,
      },
    ];

  const handlePublishOrDraftArticle = (status: "published" | "draft") => {
    const validation = validateArticleDraftInput({
      title: artTitle,
      summary: artSummary,
      bodyText: artBody,
      category: artCategory,
      author: artAuthor,
    });

    if (!validation.valid) {
      setArtErrors(validation.errors);
      return;
    }

    setArtErrors([]);
    const slug = createSlugFromTitle(artTitle) || `maqola-${Date.now()}`;
    const paragraphs = artBody
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    const newArticle: NewsArticle = {
      id: `art-${Date.now()}`,
      slug,
      title: artTitle.trim(),
      summary: artSummary.trim(),
      category: artCategory,
      publishedAt: artDate,
      displayDate: artDate,
      author: artAuthor.trim(),
      readTimeMinutes: Math.max(2, Math.ceil(artBody.length / 600)),
      featuredTier: "regular",
      coverSceneId: artCoverScene,
      coverCaption: artCoverCaption,
      paragraphs,
      inlinePhotos: artInlineCaption.trim()
        ? [
            {
              id: `in-${Date.now()}`,
              sceneId: artInlineScene,
              caption: artInlineCaption.trim(),
              locationLabel: "Hududiy bo'linma",
              date: artDate,
            },
          ]
        : [],
      youtubeEmbedId: artYoutubeUrl.trim() ? "M7lc1UVf-VE" : undefined,
      youtubeTitle: artYoutubeUrl.trim() || undefined,
      status,
    };

    onSaveArticle(newArticle);
    setArtTitle("");
    setArtSummary("");
    setArtBody("");
    setArtInlineCaption("");
    setArtPreviewMode(false);
    notify(
      status === "published"
        ? "Maqola muvaffaqiyatli nashr etildi va /yangiliklar sahifasiga qo'shildi."
        : "Maqola qoralama (draft) sifatida saqlandi."
    );
    setActiveSection("news-list");
  };

  const handleSaveAppealCase = () => {
    const validation = validateAppealCaseInput({
      title: caseTitle,
      issueSummary: caseIssueSummary,
      district: caseDistrict,
      reportingPeriod: casePeriod,
      actionsTakenText: caseActionsText,
      outcome: caseOutcome,
    });

    if (!validation.valid) {
      setCaseErrors(validation.errors);
      return;
    }

    setCaseErrors([]);
    const measures = caseActionsText
      .split(/\n+/)
      .map((m) => m.trim())
      .filter(Boolean);

    const newCase: CompletedAppealCase = {
      id: `case-${Date.now()}`,
      slug: createSlugFromTitle(caseTitle) || `holat-${Date.now()}`,
      title: caseTitle.trim(),
      issueSummary: caseIssueSummary.trim(),
      district: caseDistrict.trim(),
      reportingPeriod: casePeriod.trim(),
      completedDate: "2026-11-03",
      measuresTaken: measures,
      outcome: caseOutcome.trim(),
      verifiedMetricLabel: caseMetricLabel.trim(),
      coverSceneId: caseScene,
      beforeAfterNote: "Fotohisobot va dalolatnoma bilan tasdiqlangan.",
      supportingPhotos: [
        {
          id: `cp-${Date.now()}`,
          sceneId: caseScene,
          caption: caseTitle.trim(),
          locationLabel: caseDistrict.trim(),
          date: "3-noyabr, 2026",
        },
      ],
      relatedDocumentId: caseDocId || undefined,
      status: caseStatus,
    };

    onSaveCase(newCase);
    setCaseTitle("");
    setCaseIssueSummary("");
    setCaseActionsText("");
    setCaseOutcome("");
    notify(
      "Murojaat ijrosi bo'yicha yakunlangan amaliy material muvaffaqiyatli saqlandi."
    );
  };

  const handleAddPhotoToAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoCaption.trim()) return;
    const updated = albums.map((alb) => {
      if (alb.id !== targetAlbumId) return alb;
      return {
        ...alb,
        photos: [
          {
            id: `ph-${Date.now()}`,
            sceneId: newPhotoScene,
            caption: newPhotoCaption.trim(),
            locationLabel: newPhotoLocation.trim(),
            date: newPhotoDate.trim(),
          },
          ...alb.photos,
        ],
      };
    });
    onUpdateAlbums(updated);
    setNewPhotoCaption("");
    notify("Fotosurat tanlangan albomga qo'shildi.");
  };

  const handleSetAlbumCover = (albumId: string, sceneId: ScenePlateId) => {
    const updated = albums.map((alb) =>
      alb.id === albumId ? { ...alb, coverSceneId: sceneId } : alb
    );
    onUpdateAlbums(updated);
    notify("Albom muqova tasviri yangilandi.");
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim()) return;
    const newVid: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideoTitle.trim(),
      description:
        newVideoDesc.trim() ||
        "Tashkilot faoliyati bo'yicha rasmiy YouTube videolavha.",
      publishedDate: newVideoDate,
      duration: "03:50",
      youtubeId: newVideoYoutubeId.trim() || "M7lc1UVf-VE",
      category: "Faoliyat sharhi",
      thumbnailSceneId: "fleet_depot",
    };
    onUpdateVideos([newVid, ...videos]);
    setNewVideoTitle("");
    setNewVideoDesc("");
    notify("YouTube videolavha galereyaga qo'shildi.");
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    const newDoc: OfficialDocument = {
      id: `doc-${Date.now()}`,
      code: newDocCode.trim(),
      title: newDocTitle.trim(),
      category: newDocCategory,
      publishedDate: "3-noyabr, 2026",
      fileSize: "860 KB",
      pageCount: 6,
      summary:
        newDocSummary.trim() ||
        "Jamoatchilik uchun e'lon qilingan ochiq ma'lumotnoma (Namuna).",
      sampleContentSections: [
        {
          heading: "1. Asosiy qism",
          body:
            newDocSummary.trim() ||
            "Tasdiqlangan ochiq ma'lumotnoma matni.",
        },
      ],
      isApprovedPublic: true,
    };
    onUpdateDocuments([newDoc, ...documents]);
    setNewDocTitle("");
    setNewDocSummary("");
    notify("Tasdiqlangan hujjat /hujjatlar arxiviga qo'shildi.");
  };

  const handleDeleteDocument = (id: string) => {
    onUpdateDocuments(documents.filter((d) => d.id !== id));
    notify("Hujjat ro'yxatdan o'chirildi.");
  };

  return (
    <div className="min-h-screen bg-[#F7F9F7] flex flex-col lg:flex-row">
      {/* Left Publishing Sidebar */}
      <aside className="w-full lg:w-72 bg-[#104B33] text-[#EAF4ED] shrink-0 flex flex-col justify-between border-r border-[#176B45]">
        <div>
          <div className="p-5 border-b border-[#176B45] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <VodiyTransLogo className="w-8 h-8" />
              <div>
                <div className="text-sm font-bold text-white tracking-tight">
                  VODIYTRANS CMS
                </div>
                <div className="text-[11px] text-[#8CD1A8]">
                  Tahririyat va nashr tizimi
                </div>
              </div>
            </div>
          </div>

          <nav
            aria-label="Tahririyat bo'limlari"
            className="p-3 space-y-1 flex lg:flex-col overflow-x-auto"
          >
            {navLinks.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 text-left ${
                    active
                      ? "bg-[#176B45] text-white font-semibold"
                      : "text-[#EAF4ED]/80 hover:bg-[#176B45]/50 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#176B45] space-y-3">
          <div className="text-[11px] text-[#A7D4B8] leading-relaxed">
            Namoyish rejimi: Barcha o'zgarishlar saytning ommaviy sahifalarida
            darhol aks etadi.
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: "home" })}
            className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold bg-[#EAF4ED] text-[#104B33] rounded-md hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Saytga qaytish</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl space-y-8">
        {statusMessage && (
          <div
            role="status"
            className="p-4 rounded-md bg-[#EAF4ED] border border-[#176B45] text-xs sm:text-sm font-medium text-[#104B33] flex items-center justify-between"
          >
            <span>{statusMessage}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs underline ml-4"
            >
              Yopish
            </button>
          </div>
        )}

        {/* 1. OVERVIEW (Boshqaruv paneli) */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE4DF] pb-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                  VODIYTRANS.UZ · Matbuot xizmati boshqaruv paneli
                </div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#202923]">
                  Boshqaruv paneli
                </h1>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveSection("article-create")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi maqola yaratish</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("appeals-editor")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#104B33] bg-[#EAF4ED] hover:bg-[#D5E9DC] rounded-md transition-colors"
                >
                  <span>Amaliy natija qo'shish</span>
                </button>
              </div>
            </div>

            {/* 4 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
                <div className="text-xs text-[#737D76]">
                  Nashr etilgan maqolalar
                </div>
                <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#176B45]">
                  {publishedArticlesCount}
                </div>
                <div className="mt-1 text-xs text-[#737D76]">
                  Ochiq yangiliklar lentasida
                </div>
              </div>

              <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
                <div className="text-xs text-[#737D76]">
                  Qoralama maqolalar (Draft)
                </div>
                <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
                  {draftArticlesCount}
                </div>
                <div className="mt-1 text-xs text-[#737D76]">
                  Tahrir va tasdiqlash jarayonida
                </div>
              </div>

              <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
                <div className="text-xs text-[#737D76]">
                  Jami media materiallar
                </div>
                <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
                  {totalPhotosCount + videos.length}
                </div>
                <div className="mt-1 text-xs text-[#737D76]">
                  {totalPhotosCount} foto · {videos.length} YouTube video
                </div>
              </div>

              <div className="bg-white border border-[#DDE4DF] rounded-lg p-5">
                <div className="text-xs text-[#737D76]">
                  E'lon qilingan hujjatlar
                </div>
                <div className="mt-2 text-3xl font-bold font-mono-tabular text-[#202923]">
                  {documents.length}
                </div>
                <div className="mt-1 text-xs text-[#737D76]">
                  Ochiq PDF hujjatlar reestrida
                </div>
              </div>
            </div>

            {/* Recently Updated Content */}
            <div className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#DDE4DF] flex items-center justify-between">
                <h2 className="text-base font-bold text-[#202923]">
                  So'nggi yangilangan materiallar
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSection("news-list")}
                  className="text-xs font-semibold text-[#176B45]"
                >
                  Barchasini boshqarish →
                </button>
              </div>
              <div className="divide-y divide-[#DDE4DF]">
                {articles.slice(0, 5).map((art) => (
                  <div
                    key={art.id}
                    className="p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="text-[#737D76]">
                        <span className="font-semibold text-[#176B45]">
                          {art.category}
                        </span>{" "}
                        · {art.displayDate} · Holati:{" "}
                        <strong className="text-[#202923]">
                          {art.status === "published"
                            ? "Nashr etilgan"
                            : "Qoralama"}
                        </strong>
                      </div>
                      <div className="text-sm font-bold text-[#202923]">
                        {art.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate({ page: "article", slug: art.slug })
                        }
                        className="px-3 py-1.5 rounded border border-[#DDE4DF] bg-[#F7F9F7] hover:bg-[#EAF4ED] text-[#202923] font-medium"
                      >
                        Sahifani ko'rish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. NEWS LIST (Yangiliklar) */}
        {activeSection === "news-list" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#DDE4DF] pb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#202923]">
                  Yangiliklar va maqolalar ro'yxati
                </h1>
                <p className="text-xs text-[#737D76]">
                  Nashr etilgan maqolalar va qoralamalarni boshqarish.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection("article-create")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
              >
                <Plus className="w-4 h-4" />
                <span>Maqola yaratish</span>
              </button>
            </div>

            <div className="bg-white border border-[#DDE4DF] rounded-lg divide-y divide-[#DDE4DF]">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="text-xs text-[#737D76]">
                      <span className="font-semibold text-[#176B45]">
                        {art.category}
                      </span>{" "}
                      · {art.displayDate} · {art.author} ·{" "}
                      <span className="font-semibold text-[#202923]">
                        {art.status === "published"
                          ? "Nashr etilgan"
                          : "Qoralama"}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#202923]">
                      {art.title}
                    </h2>
                    <p className="text-xs text-[#737D76] line-clamp-2">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        onSaveArticle({
                          ...art,
                          status:
                            art.status === "published" ? "draft" : "published",
                        })
                      }
                      className="px-3 py-1.5 text-xs font-medium border border-[#DDE4DF] rounded bg-[#F7F9F7] hover:bg-[#EAF4ED]"
                    >
                      {art.status === "published"
                        ? "Qoralamaga o'tkazish"
                        : "Nashr etish"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ page: "article", slug: art.slug })
                      }
                      className="px-3 py-1.5 text-xs font-semibold text-[#176B45] border border-[#DDE4DF] rounded bg-white hover:bg-[#EAF4ED]"
                    >
                      Ko'rish
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteArticle(art.id)}
                      aria-label={`O'chirish ${art.title}`}
                      className="p-1.5 text-[#737D76] hover:text-red-700 rounded border border-[#DDE4DF]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ARTICLE EDITOR (Maqola yaratish) */}
        {activeSection === "article-create" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#202923]">
                  Yangi maqola yaratish va tahrirlash
                </h1>
                <p className="text-xs text-[#737D76]">
                  Tashkilot faoliyati, maxsus texnikalar yoki hududiy sarhisob
                  bo'yicha maqola tayyorlash.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setArtPreviewMode(!artPreviewMode)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#104B33] bg-[#EAF4ED] rounded-md"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {artPreviewMode
                    ? "Tahrirlash rejimiga qaytish"
                    : "Oldindan ko'rish (Preview)"}
                </span>
              </button>
            </div>

            {artErrors.length > 0 && (
              <div className="p-4 rounded-md bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
                <div className="font-bold">
                  Quyidagi maydonlarni to'ldirish zarur:
                </div>
                <ul className="list-disc pl-5">
                  {artErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {artPreviewMode ? (
              <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 sm:p-8 space-y-5">
                <div className="text-xs text-[#176B45] font-semibold">
                  OLDINDAN KO'RISH REJIMI · {artCategory} · {artDate}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#202923]">
                  {artTitle || "[Maqola sarlavhasi kiritilmagan]"}
                </h2>
                <p className="text-base text-[#737D76]">
                  {artSummary || "[Qisqacha kirish matni kiritilmagan]"}
                </p>
                <DocumentaryPlate sceneId={artCoverScene} aspectRatio="16:9" />
                <div className="space-y-3 text-sm text-[#202923] leading-relaxed">
                  {(artBody || "[Asosiy maqola matni]").split(/\n+/).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="art-title"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Maqola sarlavhasi (Headline)
                    </label>
                    <input
                      id="art-title"
                      type="text"
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      placeholder="Masalan: Farg'ona vodiysida sanitariya tozalash ishlari sarhisob qilindi"
                      className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="art-category"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Rukn (Toifa)
                    </label>
                    <select
                      id="art-category"
                      value={artCategory}
                      onChange={(e) =>
                        setArtCategory(e.target.value as NewsCategory)
                      }
                      className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    >
                      <option value="Yangiliklar">Yangiliklar</option>
                      <option value="E'lonlar">E'lonlar</option>
                      <option value="Texnika">Texnika</option>
                      <option value="Loyihalar">Loyihalar</option>
                      <option value="Hududiy faoliyat">Hududiy faoliyat</option>
                      <option value="Tadbirlar">Tadbirlar</option>
                      <option value="Hisobotlar">Hisobotlar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="art-summary"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Qisqacha kirish matni (Lide / Lid)
                  </label>
                  <textarea
                    id="art-summary"
                    rows={2}
                    value={artSummary}
                    onChange={(e) => setArtSummary(e.target.value)}
                    placeholder="Maqolaning asosiy mazmuni haqida 1-2 jumladan iborat kirish..."
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="art-body"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Maqola asosiy matni (Rich-text tahrir maydoni)
                  </label>
                  <textarea
                    id="art-body"
                    rows={6}
                    value={artBody}
                    onChange={(e) => setArtBody(e.target.value)}
                    placeholder="Maqolaning to'liq tahliliy matnini kiriting..."
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md font-serif-editorial"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#DDE4DF]">
                  <div>
                    <label
                      htmlFor="art-cover-scene"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Muqova fotosuratini tanlash
                    </label>
                    <select
                      id="art-cover-scene"
                      value={artCoverScene}
                      onChange={(e) =>
                        setArtCoverScene(e.target.value as ScenePlateId)
                      }
                      className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    >
                      {SCENE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="art-cover-caption"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Muqova fotosurati izohi
                    </label>
                    <input
                      id="art-cover-caption"
                      type="text"
                      value={artCoverCaption}
                      onChange={(e) => setArtCoverCaption(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="art-inline-caption"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Ichki fotosurat izohi (ixtiyoriy)
                    </label>
                    <input
                      id="art-inline-caption"
                      type="text"
                      value={artInlineCaption}
                      onChange={(e) => setArtInlineCaption(e.target.value)}
                      placeholder="Maqola ichidagi qo'shimcha surat izohi..."
                      className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="art-youtube"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      YouTube video havolasi (ixtiyoriy)
                    </label>
                    <input
                      id="art-youtube"
                      type="text"
                      value={artYoutubeUrl}
                      onChange={(e) => setArtYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="art-author"
                      className="block text-xs font-semibold text-[#202923] mb-1"
                    >
                      Muallif / Matbuot xizmati
                    </label>
                    <input
                      id="art-author"
                      type="text"
                      value={artAuthor}
                      onChange={(e) => setArtAuthor(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DDE4DF] flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => handlePublishOrDraftArticle("draft")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#202923] bg-[#F7F9F7] hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Qoralama sifatida saqlash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePublishOrDraftArticle("published")}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Nashr etish (Publish)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. MUROJAATLAR IJROSI CONTENT EDITOR (Publishing tool for completed work) */}
        {activeSection === "appeals-editor" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                Bajarilgan ishlarni hujjatlashtirish moduli
              </div>
              <h1 className="mt-1 text-2xl font-bold text-[#202923]">
                Murojaatlar ijrosi materiallari muharriri
              </h1>
              <p className="mt-1 text-xs text-[#737D76]">
                Eslatma: Ushbu modul murojaat qabul qilish tizimi emas. Bu yerda
                faqat rasmiy kanallar orqali kelib tushgan va joyida amalda hal
                etilgan holatlar bo'yicha hisobot materiallari nashrga
                tayyorlanadi. Fuqarolarning shaxsiy ma'lumotlari kiritilmaydi.
              </p>
            </div>

            {caseErrors.length > 0 && (
              <div className="p-4 rounded-md bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
                <div className="font-bold">Xatoliklar:</div>
                <ul className="list-disc pl-5">
                  {caseErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="case-title"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Maqola yoki bajarilgan ish sarlavhasi
                  </label>
                  <input
                    id="case-title"
                    type="text"
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    placeholder="Masalan: Marg'ilon shahrida chiqindilarni olib chiqish bo'yicha aniqlangan muammo bartaraf etildi"
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="case-district"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Hudud yoki xizmat uchastkasi
                  </label>
                  <input
                    id="case-district"
                    type="text"
                    value={caseDistrict}
                    onChange={(e) => setCaseDistrict(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="case-issue"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Aniqlangan muammo qisqacha tavsifi
                  </label>
                  <textarea
                    id="case-issue"
                    rows={3}
                    value={caseIssueSummary}
                    onChange={(e) => setCaseIssueSummary(e.target.value)}
                    placeholder="Qanday masala aniqlangani haqida..."
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="case-actions"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Amalga oshirilgan ishlar (har bir qatorda bittadan chora)
                  </label>
                  <textarea
                    id="case-actions"
                    rows={3}
                    value={caseActionsText}
                    onChange={(e) => setCaseActionsText(e.target.value)}
                    placeholder="Qo'shimcha maxsus texnika jalb etildi&#10;Maydoncha tozalandi va dezinfeksiya qilindi"
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="case-outcome"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Erishilgan amaliy natija
                  </label>
                  <input
                    id="case-outcome"
                    type="text"
                    value={caseOutcome}
                    onChange={(e) => setCaseOutcome(e.target.value)}
                    placeholder="Hudud to'liq tozalandi va kunlik qatnov grafigi tiklandi."
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="case-metric"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Tasdiqlangan ko'rsatkich (Statistik yorliq)
                  </label>
                  <input
                    id="case-metric"
                    type="text"
                    value={caseMetricLabel}
                    onChange={(e) => setCaseMetricLabel(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="case-scene"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Tasdiqlovchi fotolavha
                  </label>
                  <select
                    id="case-scene"
                    value={caseScene}
                    onChange={(e) =>
                      setCaseScene(e.target.value as ScenePlateId)
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    {SCENE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="case-doc"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Tasdiqlangan hisobot hujjatini biriktirish
                  </label>
                  <select
                    id="case-doc"
                    value={caseDocId}
                    onChange={(e) => setCaseDocId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    <option value="">Hujjat biriktirilmagan</option>
                    {documents.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.code} — {d.title.slice(0, 45)}...
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="case-status"
                    className="block text-xs font-semibold text-[#202923] mb-1"
                  >
                    Nashr holati
                  </label>
                  <select
                    id="case-status"
                    value={caseStatus}
                    onChange={(e) =>
                      setCaseStatus(e.target.value as "published" | "draft")
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    <option value="published">
                      Nashr etish (/murojaatlar-ijrosi)
                    </option>
                    <option value="draft">Qoralama sifatida saqlash</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDE4DF] flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAppealCase}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Amaliy natijani saqlash va e'lon qilish</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. MEDIA LIBRARY (Media kutubxonasi) */}
        {activeSection === "media-library" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                Media kutubxonasi va fotoalbomlar boshqaruvi
              </h1>
              <p className="text-xs text-[#737D76]">
                Albomlarga yangi fotosuratlar qo'shish, izoh va sanalarni
                tahrirlash hamda muqova suratini belgilash.
              </p>
            </div>

            <form
              onSubmit={handleAddPhotoToAlbum}
              className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-4"
            >
              <h2 className="text-sm font-bold text-[#202923]">
                Albomga yangi fotosurat biriktirish
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Maqsadli albom
                  </label>
                  <select
                    value={targetAlbumId}
                    onChange={(e) => setTargetAlbumId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    {albums.map((alb) => (
                      <option key={alb.id} value={alb.id}>
                        {alb.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Arxiv tasvir sahnasi
                  </label>
                  <select
                    value={newPhotoScene}
                    onChange={(e) =>
                      setNewPhotoScene(e.target.value as ScenePlateId)
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    {SCENE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Fotosurat izohi (Caption)
                  </label>
                  <input
                    type="text"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    placeholder="Masalan: Yangi o'rnatilgan konteyner shoxobchasi ko'rinishi"
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Sana
                  </label>
                  <input
                    type="text"
                    value={newPhotoDate}
                    onChange={(e) => setNewPhotoDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
                >
                  Fotosuratni albomga qo'shish
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {albums.map((alb) => (
                <div
                  key={alb.id}
                  className="bg-white border border-[#DDE4DF] rounded-lg p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-[#176B45]">
                        {alb.albumType}
                      </span>{" "}
                      · <strong className="text-sm">{alb.title}</strong>
                    </div>
                    <span className="text-xs text-[#737D76]">
                      {alb.photos.length} ta surat
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {alb.photos.map((ph) => (
                      <div
                        key={ph.id}
                        className="border border-[#DDE4DF] rounded p-3 bg-[#F7F9F7] space-y-2 text-xs"
                      >
                        <DocumentaryPlate
                          sceneId={ph.sceneId}
                          aspectRatio="16:9"
                          showOverlayBadge={false}
                        />
                        <div className="font-medium text-[#202923]">
                          {ph.caption}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#737D76]">
                          <span>{ph.date}</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleSetAlbumCover(alb.id, ph.sceneId)
                            }
                            className="text-[#176B45] font-semibold hover:underline"
                          >
                            Muqova qilish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. VIDEOS (Videolar) */}
        {activeSection === "videos" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                YouTube videolavhalar boshqaruvi
              </h1>
              <p className="text-xs text-[#737D76]">
                Rasmiy YouTube kanalidagi videolavhalar havolasini qo'shish va
                tahrirlash.
              </p>
            </div>

            <form
              onSubmit={handleAddVideo}
              className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Videolavha sarlavhasi
                  </label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="Masalan: Hududiy bo'linmalarda kuz-qish mavsumiga tayyorgarlik"
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    value={newVideoYoutubeId}
                    onChange={(e) => setNewVideoYoutubeId(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md font-mono-tabular"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Qisqacha tavsif
                </label>
                <input
                  type="text"
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  placeholder="Videolavha haqida qisqacha izoh..."
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
                >
                  Videolavhani qo'shish
                </button>
              </div>
            </form>

            <div className="bg-white border border-[#DDE4DF] rounded-lg divide-y divide-[#DDE4DF]">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="p-4 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="text-[#737D76]">
                      YouTube ID: {v.youtubeId} · {v.publishedDate}
                    </div>
                    <div className="text-sm font-bold text-[#202923]">
                      {v.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateVideos(videos.filter((item) => item.id !== v.id))
                    }
                    className="px-3 py-1.5 text-red-700 border border-[#DDE4DF] rounded hover:bg-red-50"
                  >
                    O'chirish
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. DOCUMENTS (Hujjatlar) */}
        {activeSection === "documents" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                Ochiq hujjatlar arxivi boshqaruvi
              </h1>
              <p className="text-xs text-[#737D76]">
                Tasdiqlangan hisobotlar va ma'lumotnomalarni qo'shish yoki
                o'chirish.
              </p>
            </div>

            <form
              onSubmit={handleAddDocument}
              className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Hujjat kodi (Namuna)
                  </label>
                  <input
                    type="text"
                    value={newDocCode}
                    onChange={(e) => setNewDocCode(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md font-mono-tabular"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Toifa
                  </label>
                  <select
                    value={newDocCategory}
                    onChange={(e) =>
                      setNewDocCategory(e.target.value as DocumentCategory)
                    }
                    className="w-full px-3 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  >
                    <option value="Rasmiy hujjatlar">Rasmiy hujjatlar</option>
                    <option value="Hisobotlar">Hisobotlar</option>
                    <option value="Faoliyatga oid ma'lumotlar">
                      Faoliyatga oid ma'lumotlar
                    </option>
                    <option value="E'lonlar">E'lonlar</option>
                    <option value="Boshqa materiallar">
                      Boshqa materiallar
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Hujjat sarlavhasi
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="Masalan: 2026-yil noyabr oyi sanitariya-tozalash ishlari rejasi (Namuna)"
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Qisqacha mazmuni
                </label>
                <textarea
                  rows={2}
                  value={newDocSummary}
                  onChange={(e) => setNewDocSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
                >
                  Hujjatni ro'yxatga qo'shish
                </button>
              </div>
            </form>

            <div className="bg-white border border-[#DDE4DF] rounded-lg divide-y divide-[#DDE4DF]">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="text-[#737D76]">
                      {doc.code} · {doc.category} · {doc.publishedDate}
                    </div>
                    <div className="text-sm font-bold text-[#202923]">
                      {doc.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="px-3 py-1.5 text-red-700 border border-[#DDE4DF] rounded hover:bg-red-50 shrink-0"
                  >
                    O'chirish
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. STATISTICS (Statistik ma'lumotlar) */}
        {activeSection === "statistics" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                Statistik ko'rsatkichlarni boshqarish (Namuna raqamlar)
              </h1>
              <p className="text-xs text-[#737D76]">
                Bosh sahifadagi «Amalga oshirilgan ishlar» hamda «Murojaatlar
                ijrosi» bo'limidagi ko'rsatkichlarni yangilash.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={m.id}
                  className="bg-white border border-[#DDE4DF] rounded-lg p-4 space-y-2"
                >
                  <div className="text-xs font-bold text-[#202923]">
                    {m.label}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => {
                        const next = [...metrics];
                        next[idx] = { ...m, value: e.target.value };
                        onUpdateMetrics(next);
                      }}
                      className="px-3 py-1.5 text-sm font-mono-tabular font-bold bg-[#F7F9F7] border border-[#DDE4DF] rounded w-36"
                    />
                    <span className="text-xs text-[#737D76]">{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  notify("Statistik ko'rsatkichlar muvaffaqiyatli yangilandi.")
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
              >
                O'zgarishlarni tasdiqlash
              </button>
            </div>
          </div>
        )}

        {/* 9. BRANCHES (Hududiy filiallar) */}
        {activeSection === "branches" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                Hududiy filiallar ma'lumotlarini tahrirlash
              </h1>
              <p className="text-xs text-[#737D76]">
                Tasdiqlangan filial nomlari, manzillari va telefon raqamlarini
                kiritish.
              </p>
            </div>

            <div className="space-y-4">
              {branches.map((b, idx) => (
                <div
                  key={b.id}
                  className="bg-white border border-[#DDE4DF] rounded-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#202923] mb-1">
                      Filial nomi
                    </label>
                    <input
                      type="text"
                      value={b.branchNamePlaceholder}
                      onChange={(e) => {
                        const next = [...branches];
                        next[idx] = {
                          ...b,
                          branchNamePlaceholder: e.target.value,
                        };
                        onUpdateBranches(next);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#F7F9F7] border border-[#DDE4DF] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#202923] mb-1">
                      Hudud / Manzil
                    </label>
                    <input
                      type="text"
                      value={b.locationPlaceholder}
                      onChange={(e) => {
                        const next = [...branches];
                        next[idx] = {
                          ...b,
                          locationPlaceholder: e.target.value,
                        };
                        onUpdateBranches(next);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#F7F9F7] border border-[#DDE4DF] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#202923] mb-1">
                      Telefon raqami
                    </label>
                    <input
                      type="text"
                      value={b.phonePlaceholder}
                      onChange={(e) => {
                        const next = [...branches];
                        next[idx] = { ...b, phonePlaceholder: e.target.value };
                        onUpdateBranches(next);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-[#F7F9F7] border border-[#DDE4DF] rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. SETTINGS (Sozlamalar) */}
        {activeSection === "settings" && (
          <div className="space-y-6">
            <div className="border-b border-[#DDE4DF] pb-4">
              <h1 className="text-2xl font-bold text-[#202923]">
                Platforma umumiy sozlamalari va aloqa rekvizitlari
              </h1>
              <p className="text-xs text-[#737D76]">
                Yuqori panel (Utility bar) va pastki qismdagi (Footer)
                tashkilot rekvizitlarini boshqarish.
              </p>
            </div>

            <div className="bg-white border border-[#DDE4DF] rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Tashkilot rasmiy yuridik nomi
                  </label>
                  <input
                    type="text"
                    value={settings.organizationLegalName}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        organizationLegalName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Aloqa telefoni (Utility bar & Aloqa)
                  </label>
                  <input
                    type="text"
                    value={settings.phonePlaceholder}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        phonePlaceholder: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Rasmiy elektron pochta
                  </label>
                  <input
                    type="text"
                    value={settings.emailPlaceholder}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        emailPlaceholder: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Ish vaqti
                  </label>
                  <input
                    type="text"
                    value={settings.workingHoursPlaceholder}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        workingHoursPlaceholder: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Bosh ofis manzili
                </label>
                <input
                  type="text"
                  value={settings.addressPlaceholder}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      addressPlaceholder: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() =>
                    notify("Tashkilot rekvizitlari yangilandi.")
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
