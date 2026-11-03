import React from "react";
import { ScenePlateId } from "../types/domain";

interface DocumentaryPlateProps {
  sceneId: ScenePlateId;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "21:9";
  showOverlayBadge?: boolean;
  captionText?: string;
}

const SCENE_META: Record<
  ScenePlateId,
  {
    code: string;
    location: string;
    subject: string;
    skyTop: string;
    skyBottom: string;
    accentColor: string;
  }
> = {
  fleet_depot: {
    code: "ARXIV-FOTOLAVHA · 01",
    location: "Markaziy avtosaroy va logistika bazasi",
    subject: "Maxsus sanitariya avtotransport vositalari safi",
    skyTop: "#133A29",
    skyBottom: "#245C42",
    accentColor: "#176B45",
  },
  street_sanitation: {
    code: "ARXIV-FOTOLAVHA · 02",
    location: "Shahar markaziy yo'nalishi",
    subject: "Ertalabki sanitariya va maxsus texnika ishlari",
    skyTop: "#184330",
    skyBottom: "#2E6F4E",
    accentColor: "#176B45",
  },
  container_station: {
    code: "ARXIV-FOTOLAVHA · 03",
    location: "Namunaviy mahalla shoxobchasi",
    subject: "Zamonaviy chiqindi yig'ish va saralash maydonchasi",
    skyTop: "#163F2D",
    skyBottom: "#286247",
    accentColor: "#176B45",
  },
  regional_branch: {
    code: "ARXIV-FOTOLAVHA · 04",
    location: "Hududiy ekspluatatsiya filiali",
    subject: "Ma'muriy bino va navbatchi texnikalar bazasi",
    skyTop: "#123526",
    skyBottom: "#21543C",
    accentColor: "#104B33",
  },
  resolved_courtyard: {
    code: "ARXIV-FOTOLAVHA · 05",
    location: "Obodonlashtirilgan turar-joy hududi",
    subject: "Murojaat ijrosidan so'ng tartibga keltirilgan maydoncha",
    skyTop: "#174732",
    skyBottom: "#2F7252",
    accentColor: "#176B45",
  },
  gps_dispatch: {
    code: "ARXIV-FOTOLAVHA · 06",
    location: "Markaziy dispecherlik xizmati",
    subject: "Yo'nalishdagi texnikalarni raqamli GPS monitoring qilish",
    skyTop: "#0F2D20",
    skyBottom: "#1B4B35",
    accentColor: "#176B45",
  },
  sorting_line: {
    code: "ARXIV-FOTOLAVHA · 07",
    location: "Saralash va qayta yuklash majmuasi",
    subject: "Qattiq maishiy chiqindilarni saralash texnologik liniyasi",
    skyTop: "#163B2B",
    skyBottom: "#265E44",
    accentColor: "#104B33",
  },
  winter_readiness: {
    code: "ARXIV-FOTOLAVHA · 08",
    location: "Texnik xizmat ko'rsatish ustaxonasi",
    subject: "Kuz-qish mavsumi oldidan avtopark texnik ko'rigi",
    skyTop: "#143828",
    skyBottom: "#235740",
    accentColor: "#176B45",
  },
  eco_awareness: {
    code: "ARXIV-FOTOLAVHA · 09",
    location: "Mahalla obodonlashtirish uchastkasi",
    subject: "Sanitariya-tozalik va hududlarni ko'kalamzorlashtirish",
    skyTop: "#194A34",
    skyBottom: "#317756",
    accentColor: "#176B45",
  },
  meeting_hall: {
    code: "ARXIV-FOTOLAVHA · 10",
    location: "Bosh boshqarma yig'ilishlar zali",
    subject: "Hududiy filial rahbarlari ishtirokida sarhisob yig'ilishi",
    skyTop: "#113223",
    skyBottom: "#1F5039",
    accentColor: "#104B33",
  },
};

export const DocumentaryPlate: React.FC<DocumentaryPlateProps> = ({
  sceneId,
  className = "",
  aspectRatio = "16:9",
  showOverlayBadge = true,
}) => {
  const meta = SCENE_META[sceneId] || SCENE_META.fleet_depot;
  const aspectClass =
    aspectRatio === "16:9"
      ? "aspect-video"
      : aspectRatio === "21:9"
      ? "aspect-[21/9]"
      : "aspect-[4/3]";

  return (
    <div
      className={`relative overflow-hidden bg-[#103826] select-none ${aspectClass} ${className}`}
      role="img"
      aria-label={`${meta.subject} — ${meta.location}`}
    >
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`sky-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={meta.skyTop} />
            <stop offset="65%" stopColor={meta.skyBottom} />
            <stop offset="100%" stopColor="#0E291D" />
          </linearGradient>
          <linearGradient id="sunGlow" x1="80%" y1="10%" x2="20%" y2="90%">
            <stop offset="0%" stopColor="#EAF4ED" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#75B792" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#104B33" stopOpacity="0" />
          </linearGradient>
          <pattern
            id={`grid-${sceneId}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#EAF4ED"
              strokeWidth="0.6"
              strokeOpacity="0.07"
            />
          </pattern>
        </defs>

        {/* Background Sky & Atmospheric Lighting */}
        <rect width="800" height="500" fill={`url(#sky-${sceneId})`} />
        <rect width="800" height="500" fill="url(#sunGlow)" />
        <rect width="800" height="340" fill={`url(#grid-${sceneId})`} />

        {/* Fergana Valley Mountain Range Silhouette */}
        <path
          d="M0,290 L110,235 L210,265 L340,195 L460,250 L590,205 L710,248 L800,220 L800,340 L0,340 Z"
          fill="#153E2B"
          opacity="0.75"
        />
        <path
          d="M0,310 L150,270 L290,295 L430,240 L570,285 L700,255 L800,275 L800,350 L0,350 Z"
          fill="#103021"
          opacity="0.9"
        />

        {/* Ground / Paved Depot Surface */}
        <rect x="0" y="335" width="800" height="165" fill="#17241E" />
        <line
          x1="0"
          y1="335"
          x2="800"
          y2="335"
          stroke="#498768"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        {/* Perspective Road Markings */}
        <line
          x1="120"
          y1="500"
          x2="340"
          y2="335"
          stroke="#EAF4ED"
          strokeWidth="1"
          strokeOpacity="0.14"
        />
        <line
          x1="680"
          y1="500"
          x2="460"
          y2="335"
          stroke="#EAF4ED"
          strokeWidth="1"
          strokeOpacity="0.14"
        />

        {/* Scene-specific Documentary Architectural & Machinery Illustrations */}
        {(sceneId === "fleet_depot" ||
          sceneId === "winter_readiness" ||
          sceneId === "street_sanitation") && (
          <g>
            {/* Depot Hangar Structure */}
            <rect
              x="60"
              y="215"
              width="250"
              height="120"
              fill="#1E4633"
              stroke="#529471"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            <rect x="85" y="245" width="55" height="90" fill="#10291D" />
            <rect x="160" y="245" width="55" height="90" fill="#10291D" />
            <rect x="235" y="245" width="55" height="90" fill="#10291D" />

            {/* Primary Modern Sanitation Compactor Truck */}
            <g transform="translate(270, 235)">
              {/* Compactor Body */}
              <path
                d="M15,15 L220,15 L235,35 L235,105 L15,105 Z"
                fill="#EAF4ED"
                stroke="#176B45"
                strokeWidth="2"
              />
              {/* Green Institutional Stripe on Truck */}
              <rect x="25" y="55" width="195" height="22" fill="#176B45" />
              <line
                x1="65"
                y1="22"
                x2="65"
                y2="98"
                stroke="#176B45"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <line
                x1="125"
                y1="22"
                x2="125"
                y2="98"
                stroke="#176B45"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <line
                x1="185"
                y1="22"
                x2="185"
                y2="98"
                stroke="#176B45"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              {/* Truck Cabin */}
              <path
                d="M240,35 L305,35 L322,65 L322,105 L240,105 Z"
                fill="#D7E8DC"
                stroke="#176B45"
                strokeWidth="2"
              />
              {/* Windshield */}
              <polygon
                points="252,43 298,43 312,65 252,65"
                fill="#153B29"
              />
              {/* Chassis & Wheels */}
              <rect x="10" y="102" width="315" height="12" fill="#202923" />
              <circle cx="65" cy="118" r="22" fill="#151C18" stroke="#8CA395" strokeWidth="4" />
              <circle cx="65" cy="118" r="8" fill="#498768" />
              <circle cx="130" cy="118" r="22" fill="#151C18" stroke="#8CA395" strokeWidth="4" />
              <circle cx="130" cy="118" r="8" fill="#498768" />
              <circle cx="280" cy="118" r="22" fill="#151C18" stroke="#8CA395" strokeWidth="4" />
              <circle cx="280" cy="118" r="8" fill="#498768" />
            </g>

            {/* Secondary Truck in Perspective */}
            <g transform="translate(80, 265) scale(0.72)">
              <rect
                x="15"
                y="20"
                width="180"
                height="80"
                fill="#D4E5D9"
                stroke="#176B45"
                strokeWidth="2"
              />
              <rect x="20" y="55" width="170" height="16" fill="#176B45" />
              <path d="M198,35 L250,35 L262,60 L262,100 L198,100 Z" fill="#C4D9CB" />
              <circle cx="55" cy="108" r="18" fill="#151C18" stroke="#737D76" strokeWidth="3" />
              <circle cx="225" cy="108" r="18" fill="#151C18" stroke="#737D76" strokeWidth="3" />
            </g>
          </g>
        )}

        {(sceneId === "container_station" ||
          sceneId === "resolved_courtyard" ||
          sceneId === "eco_awareness") && (
          <g>
            {/* Residential Apartment Blocks in Background */}
            <rect
              x="70"
              y="170"
              width="140"
              height="165"
              fill="#1E4432"
              stroke="#4C8669"
              strokeWidth="1"
            />
            <rect
              x="590"
              y="185"
              width="150"
              height="150"
              fill="#1B3E2D"
              stroke="#4C8669"
              strokeWidth="1"
            />
            {/* Modern Covered Container Station */}
            <g transform="translate(220, 210)">
              {/* Canopy Roof */}
              <polygon
                points="0,25 360,25 380,42 -20,42"
                fill="#176B45"
                stroke="#EAF4ED"
                strokeWidth="1.5"
              />
              {/* Steel Pillars */}
              <rect x="10" y="42" width="8" height="105" fill="#9BB5A5" />
              <rect x="342" y="42" width="8" height="105" fill="#9BB5A5" />
              {/* Concrete Platform */}
              <rect x="-15" y="145" width="390" height="14" fill="#B8C9BE" />

              {/* 4 Modern Covered Sorting Containers */}
              {[35, 115, 195, 275].map((xPos, idx) => (
                <g key={idx} transform={`translate(${xPos}, 70)`}>
                  <path
                    d="M4,0 L56,0 L62,12 L-2,12 Z"
                    fill="#104B33"
                    stroke="#EAF4ED"
                    strokeWidth="1"
                  />
                  <rect
                    x="0"
                    y="12"
                    width="60"
                    height="56"
                    rx="3"
                    fill="#EAF4ED"
                    stroke="#176B45"
                    strokeWidth="1.5"
                  />
                  <rect x="8" y="26" width="44" height="14" fill="#176B45" />
                  <circle cx="10" cy="72" r="4" fill="#202923" />
                  <circle cx="50" cy="72" r="4" fill="#202923" />
                </g>
              ))}
            </g>
          </g>
        )}

        {(sceneId === "regional_branch" ||
          sceneId === "gps_dispatch" ||
          sceneId === "sorting_line" ||
          sceneId === "meeting_hall") && (
          <g>
            {/* Institutional Modern Regional Building / Center */}
            <rect
              x="160"
              y="165"
              width="480"
              height="170"
              fill="#1D4633"
              stroke="#75B792"
              strokeWidth="1.5"
            />
            <rect x="160" y="165" width="480" height="24" fill="#176B45" />
            {/* Glass Architectural Facade Grid */}
            {[195, 275, 355, 435, 515].map((xPos, idx) => (
              <rect
                key={idx}
                x={xPos}
                y="205"
                width="62"
                height="95"
                fill="#112B1F"
                stroke="#5A9A78"
                strokeWidth="1.2"
              />
            ))}
            <rect x="355" y="280" width="90" height="55" fill="#EAF4ED" opacity="0.85" />
          </g>
        )}

        {/* Bottom Scrim for High Contrast Readability */}
        <rect
          x="0"
          y="360"
          width="800"
          height="140"
          fill="url(#sky-fleet_depot)"
          opacity="0.72"
        />
      </svg>

      {showOverlayBadge && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B2218]/95 via-[#0B2218]/70 to-transparent px-3.5 py-2.5 flex items-center justify-between gap-3 text-[#EAF4ED]">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] sm:text-[11px] font-mono-tabular tracking-wider uppercase text-[#A7D4B8] truncate">
              {meta.code} · {meta.location}
            </div>
            <div className="text-xs font-medium text-white/95 truncate">
              {meta.subject}
            </div>
          </div>
          <span className="hidden sm:inline text-[11px] font-mono-tabular text-[#A7D4B8] shrink-0">
            VODIYTRANS ARXIVI
          </span>
        </div>
      )}
    </div>
  );
};
