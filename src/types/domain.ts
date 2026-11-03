export type NewsCategory =
  | "Yangiliklar"
  | "E'lonlar"
  | "Texnika"
  | "Loyihalar"
  | "Hududiy faoliyat"
  | "Tadbirlar"
  | "Hisobotlar";

export type DocumentCategory =
  | "Rasmiy hujjatlar"
  | "Hisobotlar"
  | "Faoliyatga oid ma'lumotlar"
  | "E'lonlar"
  | "Boshqa materiallar";

export type ScenePlateId =
  | "fleet_depot"
  | "street_sanitation"
  | "container_station"
  | "regional_branch"
  | "resolved_courtyard"
  | "gps_dispatch"
  | "sorting_line"
  | "winter_readiness"
  | "eco_awareness"
  | "meeting_hall";

export interface InlinePhoto {
  id: string;
  sceneId: ScenePlateId;
  caption: string;
  locationLabel: string;
  date: string;
}

export interface ResolvedIssueStructure {
  muammo: string;
  hudud: string;
  amalgaOshirilganIshlar: string[];
  natija: string;
  tasdiqlovchiMateriallar: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  publishedAt: string; // YYYY-MM-DD
  displayDate: string; // e.g. "18-oktabr, 2026"
  author: string;
  readTimeMinutes: number;
  featuredTier?: "lead" | "secondary" | "regular";
  coverSceneId: ScenePlateId;
  coverCaption: string;
  paragraphs: string[];
  pullQuote?: string;
  resolvedStructure?: ResolvedIssueStructure;
  inlinePhotos: InlinePhoto[];
  youtubeEmbedId?: string;
  youtubeTitle?: string;
  attachedDocumentId?: string;
  status: "published" | "draft";
  districtTag?: string;
}

export interface CompletedAppealCase {
  id: string;
  slug: string;
  title: string;
  issueSummary: string;
  district: string;
  reportingPeriod: string;
  completedDate: string;
  measuresTaken: string[];
  outcome: string;
  verifiedMetricLabel: string;
  coverSceneId: ScenePlateId;
  beforeAfterNote: string;
  supportingPhotos: InlinePhoto[];
  relatedDocumentId?: string;
  relatedArticleSlug?: string;
  isFeaturedCaseStudy?: boolean;
  status: "published" | "draft";
}

export interface DistrictPerformanceStat {
  id: string;
  districtName: string;
  receivedCount: number;
  reviewedCount: number;
  resolvedCount: number;
  inProgressCount: number;
  coverageNote: string;
}

export interface MonthlyPerformanceStat {
  month: string;
  completedOperations: number;
  resolvedCases: number;
}

export interface OrganizationalMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  periodNote: string;
  description: string;
}

export interface ActivityDirection {
  id: string;
  numberLabel: string;
  title: string;
  shortDescription: string;
  detailedPoints: string[];
  keyIndicatorPlaceholder: string;
  sceneId: ScenePlateId;
}

export interface RegionalBranch {
  id: string;
  branchNamePlaceholder: string;
  locationPlaceholder: string;
  serviceAreaDescription: string;
  machineryCountPlaceholder: string;
  workingHoursPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  sceneId: ScenePlateId;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  albumType: "Tadbir" | "Loyiha" | "Amaliy faoliyat";
  date: string;
  location: string;
  description: string;
  coverSceneId: ScenePlateId;
  photos: InlinePhoto[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  duration: string;
  youtubeId: string;
  category: string;
  thumbnailSceneId: ScenePlateId;
}

export interface OfficialDocument {
  id: string;
  code: string;
  title: string;
  category: DocumentCategory;
  publishedDate: string;
  fileSize: string;
  pageCount: number;
  summary: string;
  sampleContentSections: {
    heading: string;
    body: string;
  }[];
  isApprovedPublic: boolean;
}

export interface LeadershipPlaceholder {
  id: string;
  roleTitle: string;
  fullNamePlaceholder: string;
  receptionSchedulePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  responsibilities: string;
}

export interface InstitutionalSettings {
  organizationLegalName: string;
  shortBrandName: string;
  domain: string;
  regionDescription: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  workingHoursPlaceholder: string;
  telegramPlaceholder: string;
  youtubeChannelPlaceholder: string;
  facebookPlaceholder: string;
  instagramPlaceholder: string;
  pressServiceAttribution: string;
}

export type AppRoute =
  | { page: "home" }
  | { page: "about"; tab?: "umumiy" | "rahbariyat" | "faoliyatimiz" }
  | { page: "news" }
  | { page: "article"; slug: string }
  | { page: "activities" }
  | { page: "branches" }
  | { page: "appeals-results" }
  | { page: "media" }
  | { page: "documents" }
  | { page: "contact" }
  | { page: "admin"; section?: AdminSectionId };

export type AdminSectionId =
  | "overview"
  | "news-list"
  | "article-create"
  | "media-library"
  | "videos"
  | "documents"
  | "appeals-editor"
  | "statistics"
  | "branches"
  | "settings";
