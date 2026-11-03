import {
  CompletedAppealCase,
  DistrictPerformanceStat,
  DocumentCategory,
  NewsArticle,
  NewsCategory,
  OfficialDocument,
} from "../types/domain";

export interface NewsFilterOptions {
  searchQuery?: string;
  category?: NewsCategory | "Barchasi";
  datePeriod?: "all" | "2026-q4" | "2026-q3" | "2026-h1";
  onlyPublished?: boolean;
}

export function filterNewsArticles(
  articles: NewsArticle[],
  options: NewsFilterOptions
): NewsArticle[] {
  const query = (options.searchQuery || "").trim().toLowerCase();
  const category = options.category || "Barchasi";
  const datePeriod = options.datePeriod || "all";
  const onlyPublished = options.onlyPublished ?? true;

  return articles
    .filter((article) => {
      if (onlyPublished && article.status !== "published") {
        return false;
      }
      if (category !== "Barchasi" && article.category !== category) {
        return false;
      }
      if (datePeriod !== "all") {
        const month = parseInt(article.publishedAt.slice(5, 7), 10);
        const year = parseInt(article.publishedAt.slice(0, 4), 10);
        if (year !== 2026) return false;
        if (datePeriod === "2026-q4" && (month < 10 || month > 12)) return false;
        if (datePeriod === "2026-q3" && (month < 7 || month > 9)) return false;
        if (datePeriod === "2026-h1" && (month < 1 || month > 6)) return false;
      }
      if (query.length > 0) {
        const haystack = [
          article.title,
          article.summary,
          article.category,
          article.districtTag || "",
          ...article.paragraphs,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function paginateItems<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): {
  items: T[];
  totalPages: number;
  safePage: number;
  totalItems: number;
} {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * safePageSize;
  return {
    items: items.slice(startIndex, startIndex + safePageSize),
    totalPages,
    safePage,
    totalItems,
  };
}

export interface AppealCaseFilterOptions {
  searchQuery?: string;
  district?: string;
  onlyPublished?: boolean;
}

export function filterCompletedAppealCases(
  cases: CompletedAppealCase[],
  options: AppealCaseFilterOptions
): CompletedAppealCase[] {
  const query = (options.searchQuery || "").trim().toLowerCase();
  const district = options.district || "Barcha hududlar";
  const onlyPublished = options.onlyPublished ?? true;

  return cases
    .filter((item) => {
      if (onlyPublished && item.status !== "published") {
        return false;
      }
      if (district !== "Barcha hududlar" && item.district !== district) {
        return false;
      }
      if (query.length > 0) {
        const haystack = [
          item.title,
          item.issueSummary,
          item.district,
          item.outcome,
          ...item.measuresTaken,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => b.completedDate.localeCompare(a.completedDate));
}

export function filterOfficialDocuments(
  docs: OfficialDocument[],
  category: DocumentCategory | "Barchasi",
  searchQuery: string
): OfficialDocument[] {
  const query = searchQuery.trim().toLowerCase();
  return docs.filter((doc) => {
    if (!doc.isApprovedPublic) return false;
    if (category !== "Barchasi" && doc.category !== category) return false;
    if (query.length > 0) {
      const haystack = `${doc.code} ${doc.title} ${doc.summary} ${doc.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function calculateAppealAggregateStats(
  districtStats: DistrictPerformanceStat[]
): {
  totalReceived: number;
  totalReviewed: number;
  totalResolved: number;
  totalInProgress: number;
  resolutionRatePercent: number;
} {
  const totals = districtStats.reduce(
    (acc, row) => {
      acc.totalReceived += row.receivedCount;
      acc.totalReviewed += row.reviewedCount;
      acc.totalResolved += row.resolvedCount;
      acc.totalInProgress += row.inProgressCount;
      return acc;
    },
    {
      totalReceived: 0,
      totalReviewed: 0,
      totalResolved: 0,
      totalInProgress: 0,
    }
  );

  const resolutionRatePercent =
    totals.totalReceived > 0
      ? Math.round((totals.totalResolved / totals.totalReceived) * 1000) / 10
      : 0;

  return {
    ...totals,
    resolutionRatePercent,
  };
}

export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/o'/g, "o")
    .replace(/g'/g, "g")
    .replace(/['’`ʻʼ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export interface ArticleDraftInput {
  title: string;
  summary: string;
  bodyText: string;
  category: NewsCategory;
  author: string;
}

export function validateArticleDraftInput(
  input: ArticleDraftInput
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input.title || input.title.trim().length < 10) {
    errors.push("Sarlavha kamida 10 ta belgidan iborat bo'lishi zarur.");
  }
  if (!input.summary || input.summary.trim().length < 20) {
    errors.push("Qisqacha kirish matni kamida 20 ta belgidan iborat bo'lishi zarur.");
  }
  if (!input.bodyText || input.bodyText.trim().length < 30) {
    errors.push("Maqola asosiy matni kamida 30 ta belgidan iborat bo'lishi zarur.");
  }
  if (!input.author || input.author.trim().length < 3) {
    errors.push("Muallif yoki matbuot xizmati nomi ko'rsatilishi shart.");
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

export interface AppealCaseDraftInput {
  title: string;
  issueSummary: string;
  district: string;
  reportingPeriod: string;
  actionsTakenText: string;
  outcome: string;
}

export function validateAppealCaseInput(
  input: AppealCaseDraftInput
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input.title || input.title.trim().length < 10) {
    errors.push("Holat sarlavhasi kamida 10 ta belgidan iborat bo'lishi shart.");
  }
  if (!input.issueSummary || input.issueSummary.trim().length < 15) {
    errors.push("Aniqlangan muammo tavsifi to'ldirilishi shart.");
  }
  if (!input.district || input.district.trim().length < 3) {
    errors.push("Hudud yoki filial nomi ko'rsatilishi shart.");
  }
  if (!input.actionsTakenText || input.actionsTakenText.trim().length < 15) {
    errors.push("Amalga oshirilgan ishlar tafsiloti kiritilishi shart.");
  }
  if (!input.outcome || input.outcome.trim().length < 10) {
    errors.push("Erishilgan amaliy natija ko'rsatilishi shart.");
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}
