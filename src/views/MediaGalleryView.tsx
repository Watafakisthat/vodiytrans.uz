import React, { useState } from "react";
import { Camera, Play, X, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { InlinePhoto, PhotoAlbum, VideoItem } from "../types/domain";
import { DocumentaryPlate } from "../components/DocumentaryPlate";

interface MediaGalleryViewProps {
  albums: PhotoAlbum[];
  videos: VideoItem[];
}

export const MediaGalleryView: React.FC<MediaGalleryViewProps> = ({
  albums,
  videos,
}) => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [albumTypeFilter, setAlbumTypeFilter] = useState<
    "Barchasi" | "Tadbir" | "Loyiha" | "Amaliy faoliyat"
  >("Barchasi");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    photo: InlinePhoto;
    albumTitle: string;
    index: number;
    list: { photo: InlinePhoto; albumTitle: string }[];
  } | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string>(
    videos[0]?.id || ""
  );

  const filteredAlbums = albums.filter((alb) => {
    if (albumTypeFilter !== "Barchasi" && alb.albumType !== albumTypeFilter) {
      return false;
    }
    if (selectedAlbumId !== "all" && alb.id !== selectedAlbumId) {
      return false;
    }
    return true;
  });

  const flattenedPhotos = filteredAlbums.flatMap((alb) =>
    alb.photos.map((photo) => ({ photo, albumTitle: alb.title }))
  );

  const activeVideo =
    videos.find((v) => v.id === activeVideoId) || videos[0];

  const handleStepLightbox = (dir: -1 | 1) => {
    if (!lightboxPhoto) return;
    const total = lightboxPhoto.list.length;
    const nextIdx = (lightboxPhoto.index + dir + total) % total;
    const nextItem = lightboxPhoto.list[nextIdx];
    setLightboxPhoto({
      photo: nextItem.photo,
      albumTitle: nextItem.albumTitle,
      index: nextIdx,
      list: lightboxPhoto.list,
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#DDE4DF] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#176B45]">
            VODIYTRANS.UZ · Hujjatli media arxiv
          </div>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-[#202923]">
            Foto va videogalereya
          </h1>
          <p className="mt-2 text-sm text-[#737D76] max-w-2xl">
            Hududiy filiallar faoliyati, maxsus texnikalar topshirilishi,
            qurilish-obodonlashtirish loyihalari hamda amaliy tozalash ishlari
            bo'yicha fotoalbomlar va YouTube videolavhalari.
          </p>
        </div>

        {/* Mode Switcher */}
        <div
          className="inline-flex items-center gap-1 p-1 bg-white border border-[#DDE4DF] rounded-lg self-start"
          role="tablist"
          aria-label="Media turi"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "photos"}
            onClick={() => setActiveTab("photos")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === "photos"
                ? "bg-[#176B45] text-white"
                : "text-[#202923] hover:bg-[#EAF4ED]"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Fotogalereya ({flattenedPhotos.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "videos"}
            onClick={() => setActiveTab("videos")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === "videos"
                ? "bg-[#176B45] text-white"
                : "text-[#202923] hover:bg-[#EAF4ED]"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Videolavhalar ({videos.length})</span>
          </button>
        </div>
      </div>

      {activeTab === "photos" ? (
        <div className="space-y-10">
          {/* Album Filter Controls */}
          <div className="bg-white border border-[#DDE4DF] rounded-lg p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                ["Barchasi", "Tadbir", "Loyiha", "Amaliy faoliyat"] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setAlbumTypeFilter(type);
                    setSelectedAlbumId("all");
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    albumTypeFilter === type
                      ? "bg-[#176B45] text-white font-semibold"
                      : "bg-[#F7F9F7] text-[#202923] hover:bg-[#EAF4ED]"
                  }`}
                >
                  {type === "Barchasi" ? "Barcha albomlar" : `${type} albomlari`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="album-select"
                className="text-xs font-medium text-[#737D76] whitespace-nowrap"
              >
                Albomni tanlash:
              </label>
              <select
                id="album-select"
                value={selectedAlbumId}
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="px-3 py-2 text-xs bg-[#F7F9F7] border border-[#DDE4DF] rounded-md text-[#202923] focus:outline-none focus:border-[#176B45]"
              >
                <option value="all">Barcha fotoalbomlar ({albums.length})</option>
                {albums.map((alb) => (
                  <option key={alb.id} value={alb.id}>
                    {alb.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Event & Project-Based Albums Overview */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#202923]">
              Mavzuli va loyihaviy fotoalbomlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {albums.map((alb) => {
                const isSelected = selectedAlbumId === alb.id;
                return (
                  <div
                    key={alb.id}
                    className={`bg-white border rounded-lg overflow-hidden flex flex-col justify-between transition-colors ${
                      isSelected ? "border-[#176B45]" : "border-[#DDE4DF]"
                    }`}
                  >
                    <div>
                      <DocumentaryPlate
                        sceneId={alb.coverSceneId}
                        aspectRatio="16:9"
                        showOverlayBadge={false}
                      />
                      <div className="p-5">
                        <div className="text-xs text-[#737D76]">
                          <span className="font-semibold text-[#176B45]">
                            {alb.albumType}
                          </span>{" "}
                          · {alb.date} · {alb.photos.length} ta fotosurat
                        </div>
                        <h3 className="mt-2 text-base font-bold text-[#202923] leading-snug">
                          {alb.title}
                        </h3>
                        <p className="mt-2 text-xs text-[#737D76] leading-relaxed">
                          {alb.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 pb-4 pt-3 border-t border-[#DDE4DF]/70 flex items-center justify-between text-xs">
                      <span className="text-[#737D76] truncate">
                        {alb.location}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedAlbumId(isSelected ? "all" : alb.id)
                        }
                        className="font-semibold text-[#176B45] hover:text-[#104B33] whitespace-nowrap"
                      >
                        {isSelected ? "Barchasini ko'rsatish" : "Albomni ochish →"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Responsive Photo Grid with Lightbox Trigger */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#202923]">
                Fotosuratlar ro'yxati (Kattalashtirish uchun rasm ustiga bosing)
              </h2>
              <span className="text-xs font-mono-tabular text-[#737D76]">
                {flattenedPhotos.length} ta tasvir
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flattenedPhotos.map((item, idx) => (
                <figure
                  key={item.photo.id}
                  className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden flex flex-col justify-between group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxPhoto({
                        photo: item.photo,
                        albumTitle: item.albumTitle,
                        index: idx,
                        list: flattenedPhotos,
                      })
                    }
                    className="block w-full text-left overflow-hidden focus:outline-none"
                  >
                    <DocumentaryPlate
                      sceneId={item.photo.sceneId}
                      aspectRatio="4:3"
                      showOverlayBadge={false}
                      className="transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </button>
                  <figcaption className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#737D76]">
                      <span className="inline-flex items-center gap-1 text-[#176B45] font-medium">
                        <MapPin className="w-3 h-3" />
                        {item.photo.locationLabel}
                      </span>
                      <span className="font-mono-tabular">{item.photo.date}</span>
                    </div>
                    <p className="text-sm font-medium text-[#202923] leading-snug">
                      {item.photo.caption}
                    </p>
                    <div className="pt-1 text-[11px] text-[#737D76]">
                      Albom: {item.albumTitle}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Videos Tab (YouTube primary hosting) */
        <div className="space-y-10">
          {activeVideo && (
            <div className="bg-white border border-[#DDE4DF] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-[#10291D]">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="lg:col-span-4 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs text-[#737D76]">
                    <span className="font-semibold text-[#176B45]">
                      {activeVideo.category}
                    </span>{" "}
                    · {activeVideo.publishedDate} · Davomiyligi:{" "}
                    {activeVideo.duration}
                  </div>
                  <h2 className="text-xl font-bold text-[#202923] leading-snug">
                    {activeVideo.title}
                  </h2>
                  <p className="text-sm text-[#737D76] leading-relaxed">
                    {activeVideo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE4DF] text-xs text-[#737D76]">
                  <strong>Texnik ma'lumot:</strong> Videolavhalar serverga
                  to'g'ridan-to'g'ri yuklanmasdan, rasmiy YouTube platformasi
                  orqali namoyish etiladi.
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const isCurrent = vid.id === activeVideo?.id;
              return (
                <div
                  key={vid.id}
                  className={`bg-white border rounded-lg overflow-hidden flex flex-col justify-between ${
                    isCurrent ? "border-[#176B45]" : "border-[#DDE4DF]"
                  }`}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(vid.id)}
                      className="relative block w-full text-left"
                    >
                      <DocumentaryPlate
                        sceneId={vid.thumbnailSceneId}
                        aspectRatio="16:9"
                        showOverlayBadge={false}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#176B45] text-white flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 ml-0.5" />
                        </div>
                      </div>
                    </button>
                    <div className="p-5">
                      <div className="text-xs text-[#737D76]">
                        <span className="font-semibold text-[#176B45]">
                          {vid.category}
                        </span>{" "}
                        · {vid.publishedDate} · {vid.duration}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-[#202923] leading-snug">
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(vid.id)}
                          className="text-left hover:text-[#176B45]"
                        >
                          {vid.title}
                        </button>
                      </h3>
                      <p className="mt-2 text-xs text-[#737D76] line-clamp-2">
                        {vid.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-4 pt-3 border-t border-[#DDE4DF]/70 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(vid.id)}
                      className="text-xs font-semibold text-[#176B45] hover:text-[#104B33]"
                    >
                      {isCurrent ? "Hozir namoyish etilmoqda" : "Videoni ko'rish →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Large Image Preview */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#0B2218]/90 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Fotosuratni kattalashtirib ko'rish"
        >
          <div className="bg-white border border-[#DDE4DF] rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-[#DDE4DF] flex items-center justify-between gap-4">
              <div className="text-xs text-[#737D76] truncate">
                <strong className="text-[#202923]">
                  {lightboxPhoto.albumTitle}
                </strong>{" "}
                · Tasvir {lightboxPhoto.index + 1} / {lightboxPhoto.list.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Kattalashtirilgan tasvirni yopish"
                className="p-1.5 text-[#737D76] hover:text-[#202923] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#10291D]">
              <DocumentaryPlate
                sceneId={lightboxPhoto.photo.sceneId}
                aspectRatio="16:9"
              />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F9F7]">
              <div className="space-y-1">
                <div className="text-xs text-[#176B45] font-semibold">
                  {lightboxPhoto.photo.locationLabel} · {lightboxPhoto.photo.date}
                </div>
                <p className="text-sm font-bold text-[#202923]">
                  {lightboxPhoto.photo.caption}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStepLightbox(-1)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-white border border-[#DDE4DF] rounded-md hover:bg-[#EAF4ED]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Oldingi</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStepLightbox(1)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-white border border-[#DDE4DF] rounded-md hover:bg-[#EAF4ED]"
                >
                  <span>Keyingi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
