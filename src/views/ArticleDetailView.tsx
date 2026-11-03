import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Download,
  FileText,
  Share2,
  User,
  Video,
} from "lucide-react";
import { AppRoute, NewsArticle, OfficialDocument } from "../types/domain";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface ArticleDetailViewProps {
  article: NewsArticle;
  allArticles: NewsArticle[];
  documents: OfficialDocument[];
  onNavigate: (route: AppRoute) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  allArticles,
  documents,
  onNavigate,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false);

  const attachedDoc = article.attachedDocumentId
    ? documents.find((d) => d.id === article.attachedDocumentId)
    : undefined;

  const relatedArticles = allArticles
    .filter((a) => a.status === "published" && a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleDownloadSamplePdf = (doc: OfficialDocument) => {
    const content = [
      "VODIY MAXSUS SANITAR TRANS MCHJ — RASMIY AXBOROT PLATFORMASI (VODIYTRANS.UZ)",
      "============================================================================",
      `Hujjat kodi: ${doc.code}`,
      `Sarlavha: ${doc.title}`,
      `Toifa: ${doc.category}`,
      `E'lon qilingan sana: ${doc.publishedDate}`,
      "",
      "QISQACHA MAZMUNI:",
      doc.summary,
      "",
      ...doc.sampleContentSections.flatMap((s) => [s.heading, s.body, ""]),
      "ESLATMA: Ushbu fayl dizayn prototipi uchun namuna hujjat hisoblanadi.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.code.toLowerCase().replace(/[^a-z0-9-]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const go = (route: AppRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white border-b border-[#DDE4DF]">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-[#F7F9F7] border-b border-[#DDE4DF]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#737D76]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => go({ page: "home" })}
              className="hover:text-[#176B45] transition-colors"
            >
              Bosh sahifa
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => go({ page: "news" })}
              className="hover:text-[#176B45] transition-colors"
            >
              Yangiliklar
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#202923] font-medium truncate max-w-xs sm:max-w-md">
              {article.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={() => go({ page: "news" })}
            className="inline-flex items-center gap-1 font-medium text-[#176B45] hover:text-[#104B33]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Yangiliklar ro'yxatiga qaytish</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Article Container */}
      <article className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Article Header */}
        <header className="max-w-3xl mx-auto">
          {/* Unboxed Zero-Pill Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#737D76]">
            <span className="font-semibold text-[#176B45] uppercase tracking-wider">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono-tabular">
              <Calendar className="w-3.5 h-3.5 text-[#176B45]" />
              {article.displayDate}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} daqiqa o'qish</span>
            {article.districtTag && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.districtTag}</span>
              </>
            )}
          </div>

          {/* Large Editorial Headline */}
          <h1 className="mt-3 text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#202923] leading-[1.18] tracking-tight">
            {article.title}
          </h1>

          {/* Short Introduction Deck */}
          <p className="mt-4 text-base sm:text-lg text-[#202923]/85 leading-relaxed font-medium">
            {article.summary}
          </p>

          {/* Attribution & Social Share Strip */}
          <div className="mt-6 pt-4 border-t border-[#DDE4DF] flex flex-wrap items-center justify-between gap-4 text-xs text-[#737D76]">
            <div className="inline-flex items-center gap-2">
              <User className="w-4 h-4 text-[#176B45]" />
              <span>
                Manba va muallif:{" "}
                <strong className="text-[#202923]">{article.author}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#DDE4DF] bg-[#F7F9F7] hover:bg-[#EAF4ED] text-[#202923] font-medium transition-colors"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#176B45]" />
                    <span>Havola nusxalandi</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#176B45]" />
                    <span>Maqola havolasini ulashish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Large Cover Photograph + Caption */}
        <figure className="mt-8 max-w-4xl mx-auto">
          <div className="rounded-lg overflow-hidden border border-[#DDE4DF]">
            <DocumentaryPlate
              sceneId={article.coverSceneId}
              aspectRatio="16:9"
            />
          </div>
          <figcaption className="mt-2.5 text-xs text-[#737D76] italic">
            Tasvir: {article.coverCaption}
          </figcaption>
        </figure>

        {/* Long-form Editorial Prose Column */}
        <div className="mt-10 max-w-2xl mx-auto space-y-6">
          {article.paragraphs.map((para, index) => (
            <p
              key={index}
              className={`font-serif-editorial text-base sm:text-[18px] text-[#202923] leading-[1.8] ${
                index === 0
                  ? "first-letter:text-5xl first-letter:font-bold first-letter:text-[#176B45] first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                  : ""
              }`}
            >
              {para}
            </p>
          ))}

          {/* Pull Quote (No thick left accent border — uses top & bottom hairline dividers) */}
          {article.pullQuote && (
            <blockquote className="my-8 py-6 border-y border-[#DDE4DF] text-center">
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#104B33] leading-relaxed">
                «{article.pullQuote}»
              </p>
              <footer className="mt-2 text-xs font-sans text-[#737D76] uppercase tracking-wider">
                — {article.author}
              </footer>
            </blockquote>
          )}

          {/* 5-Point Editorial Structure for Resolved Issues */}
          {article.resolvedStructure && (
            <section
              aria-label="Muammo va amaliy yechim tafsiloti"
              className="my-10 bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg p-6 sm:p-8 space-y-5"
            >
              <div className="pb-3 border-b border-[#DDE4DF]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                  Amaliy natija pasporti
                </div>
                <h2 className="mt-1 text-lg sm:text-xl font-bold text-[#202923]">
                  O'rganilgan masala va bajarilgan ishlar tuzilmasi
                </h2>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="pb-4 border-b border-[#DDE4DF]/80">
                  <dt className="font-bold text-[#202923]">1. Muammo:</dt>
                  <dd className="mt-1 text-[#202923]/85 leading-relaxed">
                    {article.resolvedStructure.muammo}
                  </dd>
                </div>

                <div className="pb-4 border-b border-[#DDE4DF]/80">
                  <dt className="font-bold text-[#202923]">2. Hudud:</dt>
                  <dd className="mt-1 text-[#202923]/85 leading-relaxed">
                    {article.resolvedStructure.hudud}
                  </dd>
                </div>

                <div className="pb-4 border-b border-[#DDE4DF]/80">
                  <dt className="font-bold text-[#202923]">
                    3. Amalga oshirilgan ishlar:
                  </dt>
                  <dd className="mt-2">
                    <ul className="space-y-2">
                      {article.resolvedStructure.amalgaOshirilganIshlar.map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="font-mono-tabular text-xs font-semibold text-[#176B45] mt-0.5">
                              0{idx + 1}.
                            </span>
                            <span className="text-[#202923]/85 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </dd>
                </div>

                <div className="pb-4 border-b border-[#DDE4DF]/80">
                  <dt className="font-bold text-[#104B33]">4. Natija:</dt>
                  <dd className="mt-1 p-3.5 rounded bg-[#EAF4ED] text-[#104B33] font-medium leading-relaxed">
                    {article.resolvedStructure.natija}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-[#202923]">
                    5. Tasdiqlovchi materiallar:
                  </dt>
                  <dd className="mt-1 text-[#737D76] leading-relaxed">
                    {article.resolvedStructure.tasdiqlovchiMateriallar}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {/* Inline Photographs with Captions */}
          {article.inlinePhotos.length > 0 && (
            <div className="space-y-6 pt-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#737D76]">
                Maqolaga ilova qilingan fotolavhalar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {article.inlinePhotos.map((photo, idx) => (
                  <figure
                    key={photo.id}
                    className="bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg overflow-hidden"
                  >
                    <DocumentaryPlate
                      sceneId={photo.sceneId}
                      aspectRatio="4:3"
                      showOverlayBadge={false}
                    />
                    <figcaption className="p-3.5 text-xs text-[#737D76] space-y-1">
                      <div className="font-mono-tabular text-[11px] text-[#176B45]">
                        Tasvir {idx + 1} · {photo.locationLabel} · {photo.date}
                      </div>
                      <div className="text-[#202923]">{photo.caption}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Embedded YouTube Video Section */}
          {article.youtubeEmbedId && (
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B45]">
                <Video className="w-4 h-4" />
                <span>Videolavha (YouTube rasmiy kanali)</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-[#DDE4DF] bg-[#10291D]">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${article.youtubeEmbedId}`}
                    title={article.youtubeTitle || article.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3.5 bg-[#F7F9F7] border-t border-[#DDE4DF] text-xs text-[#737D76]">
                  {article.youtubeTitle ||
                    "Amalga oshirilgan ishlar bo'yicha rasmiy videolavha"}
                </div>
              </div>
            </div>
          )}

          {/* Optional Downloadable PDF Document */}
          {attachedDoc && (
            <div className="pt-6">
              <div className="bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#176B45] font-semibold">
                    <FileText className="w-4 h-4" />
                    <span>Ilova qilingan rasmiy hujjat ({attachedDoc.code})</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#202923]">
                    {attachedDoc.title}
                  </h4>
                  <p className="text-xs text-[#737D76]">
                    Toifa: {attachedDoc.category} · Hajmi: {attachedDoc.fileSize} ·{" "}
                    {attachedDoc.pageCount} sahifa
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowDocPreview(!showDocPreview)}
                    className="px-3 py-2 text-xs font-medium text-[#202923] bg-white hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md transition-colors whitespace-nowrap"
                  >
                    {showDocPreview ? "Matnni yopish" : "Ko'zdan kechirish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadSamplePdf(attachedDoc)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Yuklab olish</span>
                  </button>
                </div>
              </div>

              {showDocPreview && (
                <div className="mt-3 p-5 bg-white border border-[#DDE4DF] rounded-lg space-y-3 text-xs">
                  <div className="font-mono-tabular text-[#737D76]">
                    HUJJAT MATNIDAN KO'CHIRMA ({attachedDoc.code})
                  </div>
                  {attachedDoc.sampleContentSections.map((sec, i) => (
                    <div key={i} className="space-y-1">
                      <div className="font-bold text-[#202923]">{sec.heading}</div>
                      <p className="text-[#737D76] leading-relaxed">{sec.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        <section className="mt-16 pt-10 border-t border-[#DDE4DF]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#202923]">
              Mavzuga oid boshqa maqolalar
            </h2>
            <button
              type="button"
              onClick={() => go({ page: "news" })}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#176B45] hover:text-[#104B33]"
            >
              <span>Barcha yangiliklar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <article
                key={rel.id}
                className="bg-[#F7F9F7] border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => go({ page: "article", slug: rel.slug })}
                    className="block w-full text-left"
                  >
                    <DocumentaryPlate
                      sceneId={rel.coverSceneId}
                      aspectRatio="4:3"
                      showOverlayBadge={false}
                    />
                  </button>
                  <div className="p-4">
                    <div className="text-xs text-[#737D76]">
                      <span className="font-semibold text-[#176B45]">
                        {rel.category}
                      </span>{" "}
                      · {rel.displayDate}
                    </div>
                    <h3 className="mt-1.5 text-sm font-bold text-[#202923] leading-snug">
                      <button
                        type="button"
                        onClick={() => go({ page: "article", slug: rel.slug })}
                        className="text-left hover:text-[#176B45]"
                      >
                        {rel.title}
                      </button>
                    </h3>
                  </div>
                </div>
                <div className="px-4 pb-3 pt-2 border-t border-[#DDE4DF]/70 flex justify-end">
                  <button
                    type="button"
                    onClick={() => go({ page: "article", slug: rel.slug })}
                    className="text-xs font-semibold text-[#176B45] hover:text-[#104B33]"
                  >
                    Batafsil →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
