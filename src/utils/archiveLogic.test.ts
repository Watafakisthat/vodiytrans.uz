import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAppealAggregateStats,
  createSlugFromTitle,
  filterCompletedAppealCases,
  filterNewsArticles,
  paginateItems,
  validateAppealCaseInput,
  validateArticleDraftInput,
} from "./archiveLogic";
import { CompletedAppealCase, DistrictPerformanceStat, NewsArticle } from "../types/domain";

const sampleArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "chiqindilarni-olib-chiqish-sarhisob",
    title: "Chiqindilarni o'z vaqtida olib chiqish bo'yicha hududlarda amalga oshirilgan ishlar sarhisob qilindi",
    summary: "Farg'ona vodiysi hududiy filiallarida oktyabr oyi yakunlari bo'yicha hisobot.",
    category: "Hisobotlar",
    publishedAt: "2026-10-28",
    displayDate: "28-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 5,
    coverSceneId: "fleet_depot",
    coverCaption: "Maxsus texnikalar",
    paragraphs: ["Sanitariya va tozalik ishlari tahlil qilindi."],
    inlinePhotos: [],
    status: "published",
    districtTag: "Farg'ona viloyati",
  },
  {
    id: "2",
    slug: "yangi-maxsus-texnikalar-topshirildi",
    title: "Hududiy filiallarga yangi maxsus texnikalar topshirildi",
    summary: "Transport parkini yangilash dasturi doirasida yangi chiqindi tashish mashinalari yetkazib berildi.",
    category: "Texnika",
    publishedAt: "2026-08-14",
    displayDate: "14-avgust, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 4,
    coverSceneId: "street_sanitation",
    coverCaption: "Texnika topshirish jarayoni",
    paragraphs: ["Qo'qon va Marg'ilon yo'nalishlariga biriktirildi."],
    inlinePhotos: [],
    status: "published",
    districtTag: "Marg'ilon shahri",
  },
  {
    id: "3",
    slug: "qoralama-maqola",
    title: "Kelgusi mavsumga tayyorgarlik bo'yicha ichki qoralama",
    summary: "Hali nashr etilmagan qoralama material.",
    category: "Yangiliklar",
    publishedAt: "2026-11-01",
    displayDate: "1-noyabr, 2026",
    author: "Tahririyat",
    readTimeMinutes: 3,
    coverSceneId: "winter_readiness",
    coverCaption: "Qoralama",
    paragraphs: ["Ichki ishchi matn."],
    inlinePhotos: [],
    status: "draft",
  },
];

test("filterNewsArticles excludes drafts by default and filters by category and search query", () => {
  const published = filterNewsArticles(sampleArticles, {});
  assert.equal(published.length, 2);
  assert.equal(published[0].id, "1");

  const texnikaOnly = filterNewsArticles(sampleArticles, { category: "Texnika" });
  assert.equal(texnikaOnly.length, 1);
  assert.equal(texnikaOnly[0].slug, "yangi-maxsus-texnikalar-topshirildi");

  const searchByKeyword = filterNewsArticles(sampleArticles, { searchQuery: "Qo'qon" });
  assert.equal(searchByKeyword.length, 1);
  assert.equal(searchByKeyword[0].id, "2");

  const q4Only = filterNewsArticles(sampleArticles, { datePeriod: "2026-q4" });
  assert.equal(q4Only.length, 1);
  assert.equal(q4Only[0].id, "1");
});

test("paginateItems slices items accurately and clamps out-of-range pages", () => {
  const list = [1, 2, 3, 4, 5, 6, 7];
  const page1 = paginateItems(list, 1, 3);
  assert.deepEqual(page1.items, [1, 2, 3]);
  assert.equal(page1.totalPages, 3);
  assert.equal(page1.safePage, 1);

  const pageOut = paginateItems(list, 99, 3);
  assert.deepEqual(pageOut.items, [7]);
  assert.equal(pageOut.safePage, 3);
});

test("calculateAppealAggregateStats computes totals and resolution percentage accurately", () => {
  const stats: DistrictPerformanceStat[] = [
    {
      id: "d1",
      districtName: "1-hududiy filial (Namuna)",
      receivedCount: 120,
      reviewedCount: 120,
      resolvedCount: 114,
      inProgressCount: 6,
      coverageNote: "Namuna",
    },
    {
      id: "d2",
      districtName: "2-hududiy filial (Namuna)",
      receivedCount: 80,
      reviewedCount: 80,
      resolvedCount: 76,
      inProgressCount: 4,
      coverageNote: "Namuna",
    },
  ];
  const agg = calculateAppealAggregateStats(stats);
  assert.equal(agg.totalReceived, 200);
  assert.equal(agg.totalResolved, 190);
  assert.equal(agg.totalInProgress, 10);
  assert.equal(agg.resolutionRatePercent, 95);
});

test("validateArticleDraftInput and validateAppealCaseInput reject incomplete inputs", () => {
  const invalidArticle = validateArticleDraftInput({
    title: "Qisqa",
    summary: "Qisqa",
    bodyText: "Kam",
    category: "Yangiliklar",
    author: "",
  });
  assert.equal(invalidArticle.valid, false);
  assert.equal(invalidArticle.errors.length, 4);

  const validArticle = validateArticleDraftInput({
    title: "Hududlarda sanitariya tozalash ishlari yakunlandi",
    summary: "Barcha belgilangan mahallalarda maxsus texnikalar yordamida tozalash ishlari bajarildi.",
    bodyText: "Tashkilotning hududiy bo'linmalari tomonidan tasdiqlangan reja-jadval asosida amaliy ishlar olib borildi.",
    category: "Hududiy faoliyat",
    author: "VODIYTRANS Matbuot xizmati",
  });
  assert.equal(validArticle.valid, true);

  const validCase = validateAppealCaseInput({
    title: "Marg'ilon shahrida chiqindilarni olib chiqish muammosi bartaraf etildi",
    issueSummary: "Jadvaldan kechikish holati bo'yicha kelib tushgan ma'lumot o'rganildi.",
    district: "Marg'ilon shahar bo'linmasi (Namuna)",
    reportingPeriod: "2026-yil oktabr",
    actionsTakenText: "Qo'shimcha maxsus texnika ajratildi va konteyner maydonchasi tozalandi.",
    outcome: "Kunlik qatnov grafigi to'liq tiklandi.",
  });
  assert.equal(validCase.valid, true);
});

test("createSlugFromTitle normalizes Uzbek apostrophes and spaces", () => {
  const slug = createSlugFromTitle("Marg'ilon shahrida o'z vaqtida olib chiqish!");
  assert.equal(slug, "margilon-shahrida-oz-vaqtida-olib-chiqish");
});

test("filterCompletedAppealCases filters by district and keyword", () => {
  const sampleCases: CompletedAppealCase[] = [
    {
      id: "c1",
      slug: "margilon-case",
      title: "Marg'ilon shahrida chiqindilarni o'z vaqtida olib chiqish bo'yicha aniqlangan muammo bartaraf etildi",
      issueSummary: "Maxsus konteyner nuqtasida to'planib qolish holati.",
      district: "Marg'ilon yo'nalishi (Namuna)",
      reportingPeriod: "2026-yil oktabr",
      completedDate: "2026-10-22",
      measuresTaken: ["Qo'shimcha texnika jalb etildi"],
      outcome: "To'liq tozalandi",
      verifiedMetricLabel: "4 ta konteyner yangilandi (Namuna)",
      coverSceneId: "resolved_courtyard",
      beforeAfterNote: "Fotohisobot tasdiqlangan",
      supportingPhotos: [],
      status: "published",
    },
  ];

  const found = filterCompletedAppealCases(sampleCases, {
    district: "Marg'ilon yo'nalishi (Namuna)",
    searchQuery: "konteyner",
  });
  assert.equal(found.length, 1);
});
