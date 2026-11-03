import React, { useState } from "react";
import { Download, Eye, FileText, Info, Search, X } from "lucide-react";
import { DocumentCategory, OfficialDocument } from "../types/domain";
import { filterOfficialDocuments } from "../utils/archiveLogic";

interface DocumentsArchiveViewProps {
  documents: OfficialDocument[];
}

const DOC_CATEGORIES: (DocumentCategory | "Barchasi")[] = [
  "Barchasi",
  "Rasmiy hujjatlar",
  "Hisobotlar",
  "Faoliyatga oid ma'lumotlar",
  "E'lonlar",
  "Boshqa materiallar",
];

export const DocumentsArchiveView: React.FC<DocumentsArchiveViewProps> = ({
  documents,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    DocumentCategory | "Barchasi"
  >("Barchasi");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDoc, setPreviewDoc] = useState<OfficialDocument | null>(null);

  const filteredDocs = filterOfficialDocuments(
    documents,
    selectedCategory,
    searchQuery
  );

  const handleDownloadSample = (doc: OfficialDocument) => {
    const text = [
      "«VODIY MAXSUS SANITAR TRANS» MCHJ — OCHIQ HUJJATLAR ARXIVI (NAMUNA)",
      "====================================================================",
      `Hujjat raqami: ${doc.code}`,
      `Nomi: ${doc.title}`,
      `Turkum: ${doc.category}`,
      `Sana: ${doc.publishedDate}`,
      "",
      "QISQACHA TAVSIF:",
      doc.summary,
      "",
      ...doc.sampleContentSections.flatMap((s) => [s.heading, s.body, ""]),
      "ESLATMA: Ushbu fayl prototip namunasidir. Haqiqiy qonunchilik hujjatlari yoki imzolar o'ylab topilmagan.",
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${doc.code.toLowerCase().replace(/[^a-z0-9-]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#DDE4DF] pb-6 space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
          VODIYTRANS.UZ · Ochiq ma'lumotlar reestri (/hujjatlar)
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#202923]">
          Hujjatlar va hisobotlar arxivi
        </h1>
        <p className="text-sm text-[#737D76] max-w-3xl leading-relaxed">
          Tashkilot tomonidan jamoatchilik uchun ochiq e'lon qilingan hisobotlar,
          faoliyatga oid ma'lumotnomalar va rasmiy e'lonlar arxivi.
        </p>

        <div className="p-4 rounded-md bg-[#EAF4ED] border border-[#176B45]/30 flex items-start gap-3 text-xs text-[#104B33]">
          <Info className="w-4 h-4 text-[#176B45] shrink-0 mt-0.5" />
          <div>
            <strong>Namuna hujjatlar bo'yicha eslatma:</strong> Prototipda
            joylashtirilgan barcha hujjatlar maket namunasi (sample document)
            sifatida belgilangan bo'lib, ularda uydirma qarorlar, soxta imzolar
            yoki davlat gerblari ishlatilmagan.
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#DDE4DF] rounded-lg p-5 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#737D76] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hujjat nomi, kodi yoki qisqacha mazmuni bo'yicha qidirish..."
            aria-label="Hujjatlardan qidirish"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-[#202923] focus:outline-none focus:border-[#176B45]"
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#DDE4DF]"
          role="group"
          aria-label="Hujjat toifalari"
        >
          {DOC_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#176B45] text-white font-semibold"
                  : "bg-[#F7F9F7] text-[#202923] hover:bg-[#EAF4ED]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.length === 0 ? (
          <div className="bg-white border border-[#DDE4DF] rounded-lg p-10 text-center text-sm text-[#737D76]">
            Tanlangan toifa yoki qidiruv so'zi bo'yicha hujjatlar topilmadi.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <article
              key={doc.id}
              className="bg-white border border-[#DDE4DF] rounded-lg p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#737D76]">
                  <span className="font-semibold text-[#176B45]">
                    {doc.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">Kod: {doc.code}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    Sana: {doc.publishedDate}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    PDF namunasi ({doc.fileSize}, {doc.pageCount} bet)
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[#202923] leading-snug">
                  {doc.title}
                </h2>

                <p className="text-sm text-[#737D76] leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#202923] bg-[#F7F9F7] hover:bg-[#EAF4ED] border border-[#DDE4DF] rounded-md transition-colors whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 text-[#176B45]" />
                  <span>Ko'zdan kechirish</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSample(doc)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] hover:bg-[#104B33] rounded-md transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF yuklab olish</span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-[#202923]/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Hujjat namunasini ko'zdan kechirish"
        >
          <div className="bg-white border border-[#DDE4DF] rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-[#DDE4DF] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#176B45] font-semibold">
                <FileText className="w-4 h-4" />
                <span>{previewDoc.code} · NAMUNA HUJJAT KO'RINISHI</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                aria-label="Hujjat oynasini yopish"
                className="p-1 text-[#737D76] hover:text-[#202923] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="text-xs text-[#737D76]">
                {previewDoc.category} · E'lon qilingan: {previewDoc.publishedDate}
              </div>
              <h3 className="text-xl font-bold text-[#202923]">
                {previewDoc.title}
              </h3>
              <p className="text-sm text-[#737D76] leading-relaxed">
                {previewDoc.summary}
              </p>

              <div className="border-t border-[#DDE4DF] pt-4 space-y-4">
                {previewDoc.sampleContentSections.map((sec, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#F7F9F7] border border-[#DDE4DF] rounded-md space-y-1.5"
                  >
                    <h4 className="text-sm font-bold text-[#202923]">
                      {sec.heading}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#737D76] leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F7F9F7] border-t border-[#DDE4DF] flex items-center justify-between">
              <span className="text-xs text-[#737D76]">
                Hajmi: {previewDoc.fileSize} · {previewDoc.pageCount} bet
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-3.5 py-2 text-xs font-medium text-[#202923] bg-white border border-[#DDE4DF] rounded-md"
                >
                  Yopish
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadSample(previewDoc)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#176B45] rounded-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Yuklab olish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
