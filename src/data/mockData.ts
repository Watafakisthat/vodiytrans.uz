import {
  ActivityDirection,
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
} from "../types/domain";

export const INITIAL_SETTINGS: InstitutionalSettings = {
  organizationLegalName: "«VODIY MAXSUS SANITAR TRANS» mas'uliyati cheklangan jamiyati",
  shortBrandName: "VODIYTRANS",
  domain: "vodiytrans.uz",
  regionDescription: "Farg'ona vodiysi hududlarida sanitariya tozalash, qattiq maishiy va xavfsiz chiqindilarni yig'ish, olib chiqish hamda kommunal xizmatlar ko'rsatish bo'yicha ixtisoslashgan tashkilot.",
  phonePlaceholder: "[Aloqa raqami: tasdiqlangach kiritiladi]",
  emailPlaceholder: "[Rasmiy elektron pochta: info@vodiytrans.uz — namuna]",
  addressPlaceholder: "[Bosh ofis manzili: Farg'ona vodiysi, tasdiqlangan manzil joyi]",
  workingHoursPlaceholder: "Dushanba – Shanba, 08:00 – 18:00 [Ish vaqti namunasi]",
  telegramPlaceholder: "https://t.me/vodiytrans_rasmiy_namuna",
  youtubeChannelPlaceholder: "https://youtube.com/@vodiytrans_namuna",
  facebookPlaceholder: "https://facebook.com/vodiytrans_namuna",
  instagramPlaceholder: "https://instagram.com/vodiytrans_namuna",
  pressServiceAttribution: "VODIY MAXSUS SANITAR TRANS MCHJ Axborot va matbuot xizmati",
};

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: "art-1",
    slug: "chiqindilarni-oz-vaqtida-olib-chiqish-boyicha-hududlarda-amalga-oshirilgan-ishlar-sarhisob-qilindi",
    title: "Chiqindilarni o'z vaqtida olib chiqish bo'yicha hududlarda amalga oshirilgan ishlar sarhisob qilindi",
    summary:
      "Farg'ona vodiysidagi hududiy filiallarda qattiq maishiy chiqindilarni belgilangan jadval asosida yig'ish, maxsus texnikalar harakati intizomi va sanitariya maydonchalarining holati bo'yicha davriy tahlil natijalari e'lon qilindi.",
    category: "Hisobotlar",
    publishedAt: "2026-10-30",
    displayDate: "30-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 6,
    featuredTier: "lead",
    coverSceneId: "fleet_depot",
    coverCaption:
      "Hududiy bo'linmalarda navbatchi maxsus sanitariya texnikalarining ertalabki yo'nalish oldi texnik ko'rigi. Foto: Matbuot xizmati arxivi.",
    districtTag: "Farg'ona vodiysi bo'yicha",
    paragraphs: [
      "«VODIY MAXSUS SANITAR TRANS» MCHJ tomonidan xizmat ko'rsatilayotgan shahar va tuman hududlarida sanitariya-tozalik ishlarini tizimli tashkil etish, qattiq maishiy chiqindilarni belgilangan grafik asosida uzluksiz olib chiqish hamda mavjud texnika parkidan samarali foydalanish yuzasidan navbatdagi choraklik va oylik ish yakunlari sarhisob qilindi.",
      "Tahlil jarayonida har bir hududiy filial kesimida maxsus avtotransport vositalarining yo'nalishlarga chiqish intizomi, konteyner maydonchalarining sanitariya holati hamda dispecherlik monitoringi ma'lumotlari o'rganildi. Xususan, aholi zich joylashgan ko'p qavatli uylar atrofida va mahalla fuqarolar yig'inlarida chiqindilarning to'planib qolishiga yo'l qo'ymaslik bo'yicha qo'shimcha navbatchilik jadvallari joriy etildi.",
      "Hisobot davrida aniqlangan ayrim texnik uzilishlar va yo'nalish kechikishlari joyiga chiqqan holda bartaraf etilib, zaxira maxsus texnikalar hisobidan xizmat qamrovi barqarorlashtirildi. Shuningdek, kuz-qish mavsumida transport vositalarining uzluksiz ishlashini ta'minlash maqsadida ta'mirlash-profilaktika ustaxonalarida zarur ehtiyot qismlar zaxirasi shakllantirildi.",
      "Tashkilot faoliyatida asosiy e'tibor qog'ozdagi ko'rsatkichlarga emas, balki har bir mahalla va ko'chada amalda o'zgargan sanitariya holati, tozalangan hududlar va barqaror yo'lga qo'yilgan qatnov jadvaliga qaratilmoqda."
    ],
    pullQuote:
      "Har bir hududiy bo'linma faoliyatining asosiy mezoni — belgilangan qatnov jadvaliga qat'iy rioya etish va mahallalarda real tozalik muhitini ta'minlashdir.",
    resolvedStructure: {
      muammo:
        "Ayrim hududiy yo'nalishlarda yuklama ortishi sababli kechki soatlarda chiqindi yig'ish maydonchalarida rejaviy grafikdan kechikish holatlari kuzatilgan.",
      hudud:
        "Farg'ona vodiysi xizmat ko'rsatish hududlari — 1-sonli va 2-sonli hududiy filiallar qamrovidagi mahallalar [Hudud nomi namunasi].",
      amalgaOshirilganIshlar: [
        "Yo'nalishlar kesimida transport qatnov grafigi qayta ko'rib chiqilib, tig'iz soatlar uchun qo'shimcha navbatchi ekipajlar biriktirildi.",
        "Konteyner maydonchalarida sanitariya tozalash va dezinfeksiya ishlari tasdiqlangan reja asosida o'tkazildi.",
        "Dispecherlik markazi orqali maxsus texnikalar harakati ustidan kunlik marshrut nazorati kuchaytirildi."
      ],
      natija:
        "Barcha biriktirilgan yo'nalishlarda kunlik olib chiqish grafigi barqarorlashtirildi hamda maydonchalarda chiqindi to'planib qolish holatlari to'liq bartaraf etildi.",
      tasdiqlovchiMateriallar:
        "Hududiy bo'linmalar fotohisobotlari, dispecherlik qaydnomasi va e'lon qilingan oylik sarhisob ma'lumotnomasi (PDF)."
    },
    inlinePhotos: [
      {
        id: "in-1",
        sceneId: "street_sanitation",
        caption: "Shahar markaziy ko'chalarida ertalabki sanitariya va maxsus texnika ishlari.",
        locationLabel: "Markaziy xizmat hududi (Namuna)",
        date: "29-oktabr, 2026"
      },
      {
        id: "in-2",
        sceneId: "container_station",
        caption: "Tartibga keltirilgan va yangilangan zamonaviy chiqindi yig'ish shoxobchasi.",
        locationLabel: "Namuna mahalla hududi",
        date: "28-oktabr, 2026"
      }
    ],
    youtubeEmbedId: "M7lc1UVf-VE",
    youtubeTitle: "Maxsus texnikalar parki va hududiy sanitariya ishlari bo'yicha videolavha (Namuna)",
    attachedDocumentId: "doc-1",
    status: "published"
  },
  {
    id: "art-2",
    slug: "hududiy-filiallarga-yangi-maxsus-sanitariya-texnikalari-va-konteynerlar-yetkazib-berildi",
    title: "Hududiy filiallarga yangi maxsus sanitariya texnikalari va konteynerlar yetkazib berildi",
    summary:
      "Moddiy-texnik bazani mustahkamlash dasturi doirasida hududiy bo'linmalarga zamonaviy siqib yuklovchi chiqindi tashish mashinalari hamda metall konteynerlar topshirildi.",
    category: "Texnika",
    publishedAt: "2026-10-25",
    displayDate: "25-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 5,
    featuredTier: "secondary",
    coverSceneId: "street_sanitation",
    coverCaption:
      "Hududiy filiallarga biriktirilgan yangi maxsus sanitariya transport vositalari. Foto: Matbuot xizmati.",
    districtTag: "Hududiy filiallar",
    paragraphs: [
      "Tashkilotning xizmat ko'rsatish salohiyatini oshirish va chekka mahallalarda ham chiqindilarni o'z vaqtida olib chiqishni ta'minlash maqsadida maxsus texnikalar parki bosqichma-bosqich yangilanmoqda.",
      "Yangi qabul qilingan maxsus avtotransport vositalari yuqori zichlikda yuklash mexanizmi, tejamkor dvigatel hamda masofaviy GPS monitoring uskunalari bilan jihozlangan bo'lib, ular bevosita yuklamasi yuqori bo'lgan hududiy filiallarga taqsimlandi.",
      "Texnikalar bilan bir qatorda, ko'p qavatli uylar va ijtimoiy soha obyektlari atrofidagi shoxobchalarni jihozlash uchun yangi namunadagi qopqoqli konteynerlar ham joylarga yetkazib berildi."
    ],
    pullQuote:
      "Zamonaviy maxsus texnikalar yo'nalishdagi yoqilg'i sarfini qisqartirish bilan birga, xizmat ko'rsatish tezligi va sifatini oshirishga xizmat qiladi.",
    inlinePhotos: [
      {
        id: "in-3",
        sceneId: "fleet_depot",
        caption: "Avtopark bazasida yangi texnikalarni hududiy bo'linmalarga topshirish jarayoni.",
        locationLabel: "Markaziy avtosaroy (Namuna)",
        date: "25-oktabr, 2026"
      }
    ],
    youtubeEmbedId: "M7lc1UVf-VE",
    youtubeTitle: "Yangi maxsus texnikalar taqdimoti va texnik imkoniyatlari",
    attachedDocumentId: "doc-2",
    status: "published"
  },
  {
    id: "art-3",
    slug: "margilon-shahrida-chiqindilarni-oz-vaqtida-olib-chiqish-boyicha-aniqlangan-muammo-bartaraf-etildi",
    title: "Marg'ilon shahrida chiqindilarni o'z vaqtida olib chiqish bo'yicha aniqlangan muammo bartaraf etildi",
    summary:
      "Rasmiy kanallar orqali qayd etilgan murojaat asosida Marg'ilon shahrining belgilangan mahalla hududida chiqindi to'planishi holati joyiga chiqib o'rganildi va to'liq bartaraf etildi.",
    category: "Hududiy faoliyat",
    publishedAt: "2026-10-22",
    displayDate: "22-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 5,
    featuredTier: "secondary",
    coverSceneId: "resolved_courtyard",
    coverCaption:
      "Tozalash va obodonlashtirish ishlaridan so'ng tartibga keltirilgan hudud ko'rinishi. Foto: Matbuot xizmati.",
    districtTag: "Marg'ilon yo'nalishi (Namuna)",
    paragraphs: [
      "O'rnatilgan tartibda kelib tushgan murojaatda Marg'ilon shahridagi xizmat hududlaridan birida chiqindi yig'ish maydonchasida maishiy chiqindilar o'z vaqtida olib chiqilmagani va atrof-muhit tozaligiga salbiy ta'sir ko'rsatayotgani bildirilgan edi.",
      "Mazkur holat yuzasidan «VODIY MAXSUS SANITAR TRANS» MCHJning hududiy ishchi guruhi zudlik bilan joyiga chiqib, vaziyatni o'rgandi. O'rganish davomida asosiy maxsus texnikaning profilaktik ta'mirga kirgani sababli qatnov jadvalida qisqa muddatli uzilish yuzaga kelgani aniqlandi.",
      "Shu kunning o'zida qo'shimcha yuk ortish texnikasi va sanitariya brigadasi jalb etilib, yig'ilib qolgan barcha maishiy chiqindilar olib chiqildi. Shoxobcha maydoni yuvilib, dezinfeksiya qilindi hamda yaroqsiz holga kelgan konteynerlar yangisiga almashtirildi."
    ],
    resolvedStructure: {
      muammo:
        "Chiqindi yig'ish maydonchasida qatnov grafigi uzilishi oqibatida maishiy chiqindilar to'planib qolgani va konteynerlar ta'mirga muhtojligi.",
      hudud: "Marg'ilon shahri xizmat ko'rsatish uchastkasi [Mahalla nomi namunasi].",
      amalgaOshirilganIshlar: [
        "Hududga zaxira maxsus siqib yuklovchi transport vositasi va 6 nafar sanitariya xodimi safarbar etildi.",
        "Maydoncha va unga tutash hudud to'liq tozalanib, sanitariya-dezinfeksiya ishlari bajarildi.",
        "Shoxobchaga qo'shimcha yangi metall konteynerlar o'rnatildi va kunlik qatnov soati qayta tasdiqlandi."
      ],
      natija:
        "Hududdagi sanitariya holati to'liq me'yoriy talablarga keltirildi, kunlik grafik bo'yicha muntazam olib chiqish tizimi tiklandi.",
      tasdiqlovchiMateriallar:
        "Ish jarayoni va yakuniy holat bo'yicha fotolavhalar hamda hududiy bo'linma dalolatnomasi."
    },
    inlinePhotos: [
      {
        id: "in-4",
        sceneId: "container_station",
        caption: "Yangilangan konteyner shoxobchasi va tozalangan hudud.",
        locationLabel: "Marg'ilon yo'nalishi (Namuna)",
        date: "22-oktabr, 2026"
      }
    ],
    attachedDocumentId: "doc-3",
    status: "published"
  },
  {
    id: "art-4",
    slug: "chiqindi-yigish-shoxobchalarini-zamonaviy-talablar-asosida-rekonstruksiya-qilish-loyihasi",
    title: "Chiqindi yig'ish shoxobchalarini zamonaviy talablar asosida rekonstruksiya qilish loyihasi davom etmoqda",
    summary:
      "Aholi punktlarida sanitariya madaniyatini oshirish va chiqindilarni saralab yig'ish imkoniyatini yaratish maqsadida namunaviy maydonchalar barpo etilmoqda.",
    category: "Loyihalar",
    publishedAt: "2026-10-18",
    displayDate: "18-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 4,
    featuredTier: "regular",
    coverSceneId: "container_station",
    coverCaption:
      "Rekonstruksiya qilingan zamonaviy yopiq turdagi chiqindi qabul qilish shoxobchasi.",
    districtTag: "Farg'ona vodiysi",
    paragraphs: [
      "Hududlarda ekologik barqarorlikni ta'minlash va maishiy chiqindilarni to'plash infratuzilmasini yangilash dasturi asosida eskirgan chiqindi yig'ish nuqtalari bosqichma-bosqich zamonaviy arxitektura talablariga mos ravishda qayta qurilmoqda.",
      "Yangi shoxobchalar beton qoplamali maydoncha, yomg'ir va quyoshdan himoyalovchi soyabon, maxsus to'siqlar hamda saralab yig'ishga mo'ljallangan konteynerlar bilan ta'minlanmoqda.",
      "Shuningdek, maxsus yuklovchi texnikalarning bemalol kirib-chiqishi uchun kirish yo'laklari kengaytirilib, tungi yoritish chiroqlari o'rnatilmoqda."
    ],
    inlinePhotos: [],
    status: "published"
  },
  {
    id: "art-5",
    slug: "maxsus-avtotransport-vositalari-harakatini-raqamli-dispecherlik-tizimi-orqali-nazorat-qilish",
    title: "Maxsus avtotransport vositalari harakatini raqamli dispecherlik tizimi orqali monitoring qilish kuchaytirildi",
    summary:
      "Barcha yo'nalishdagi maxsus texnikalar harakati, yoqilg'i sarfi va belgilangan nuqtalarga kirish vaqti markazlashgan dispecherlik xizmati orqali kuzatib borilmoqda.",
    category: "Yangiliklar",
    publishedAt: "2026-10-12",
    displayDate: "12-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 4,
    featuredTier: "regular",
    coverSceneId: "gps_dispatch",
    coverCaption:
      "Markaziy dispecherlik xizmatida yo'nalishlar monitoringi jarayoni.",
    districtTag: "Markaziy boshqaruv",
    paragraphs: [
      "Kommunal va sanitariya xizmatlari samaradorligini oshirishda zamonaviy raqamli nazorat vositalarini joriy etish muhim ahamiyat kasb etadi. Shu maqsadda tashkilot avtoparkidagi maxsus texnikalar GPS-trekerlar va marshrut datchiklari bilan to'liq qamrab olingan.",
      "Dispecherlik markazi mutaxassislari real vaqt rejimida har bir texnikaning tasdiqlangan yo'nalish grafigi bo'yicha harakatlanishini, chiqindi shoxobchalarida to'xtash vaqtini hamda poligonga yetib borish davomiyligini tahlil qilib boradi.",
      "Bu tizim yo'nalishlardan chetga chiqish holatlarining oldini olish va favqulodda texnik nosozlik yuz berganda yaqin oradagi zaxira mashinani tezkor yo'naltirish imkonini bermoqda."
    ],
    inlinePhotos: [],
    status: "published"
  },
  {
    id: "art-6",
    slug: "kuz-qish-mavsumiga-tayyorgarlik-avtopark-va-maxsus-texnikalar-texnik-korikdan-otkazildi",
    title: "Kuz-qish mavsumiga tayyorgarlik: avtopark va maxsus texnikalar to'liq texnik ko'rikdan o'tkazildi",
    summary:
      "Ob-havoning sovuq va yog'ingarchilikli kunlarida ham chiqindilarni uzluksiz olib chiqishni ta'minlash maqsadida barcha filiallarda mavsumiy tayyorgarlik ishlari yakunlandi.",
    category: "Tadbirlar",
    publishedAt: "2026-10-05",
    displayDate: "5-oktabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 4,
    featuredTier: "regular",
    coverSceneId: "winter_readiness",
    coverCaption:
      "Maxsus texnikalarning mavsumiy shinalar va gidravlika tizimini ko'rikdan o'tkazish ishlari.",
    districtTag: "Barcha hududiy filiallar",
    paragraphs: [
      "Kuz-qish mavsumida sanitariya-tozalash korxonalari zimmasiga ikki karra mas'uliyat yuklanadi. Shu bois «VODIY MAXSUS SANITAR TRANS» MCHJning barcha hududiy garaj va ta'mirlash bazalarida maxsus texnikalar kompleksi chuqurlashtirilgan ko'rikdan o'tkazildi.",
      "Transport vositalarining gidravlik siqish uskunalari, tormoz tizimi, isitish moslamalari va akkumulyator batareyalari yangilanib, haydovchi va yuklovchi xodimlar maxsus mavsumiy ish kiyimlari bilan ta'minlandi."
    ],
    inlinePhotos: [],
    status: "published"
  },
  {
    id: "art-7",
    slug: "mahallalarda-hududlarni-obodonlashtirish-va-sanitariya-tozalik-kuni-amaliy-tadbirlari",
    title: "Mahallalarda hududlarni obodonlashtirish va sanitariya-tozalik tadbirlari o'tkazildi",
    summary:
      "Ko'p qavatli uylar atrofi, ichki yo'llar va ijtimoiy obyektlar tutash hududlarida keng ko'lamli tozalash hamda obodonlashtirish ishlari amalga oshirildi.",
    category: "Hududiy faoliyat",
    publishedAt: "2026-09-24",
    displayDate: "24-sentabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 3,
    featuredTier: "regular",
    coverSceneId: "eco_awareness",
    coverCaption:
      "Mahalla hududlarida olib borilgan obodonlashtirish va sanitariya tozalash ishlari.",
    districtTag: "Qo'qon va Farg'ona yo'nalishlari (Namuna)",
    paragraphs: [
      "Hududlarning sanitariya-epidemiologik osoyishtaligini saqlash va aholiga qulay yashash muhitini yaratish maqsadida mahalla fuqarolar yig'inlari bilan hamkorlikda rejaviy tozalash ishlari tashkil etildi.",
      "Tadbir davomida ariq va lotoklar chiqindilardan tozalandi, daraxt shoxlari va xazonlar maxsus transport vositalarida olib chiqildi hamda chiqindi shoxobchalari atrofi tartibga keltirildi."
    ],
    inlinePhotos: [],
    status: "published"
  },
  {
    id: "art-8",
    slug: "bayram-va-dam-olish-kunlarida-maxsus-texnikalar-harakati-jadvali-boyicha-rasmiy-elon",
    title: "Bayram va dam olish kunlarida maxsus texnikalar qatnov jadvali bo'yicha rasmiy ma'lumot",
    summary:
      "Dam olish kunlarida ham barcha hududiy filiallarda navbatchi brigadalar va maxsus transport vositalari tasdiqlangan ish rejimida faoliyat yuritadi.",
    category: "E'lonlar",
    publishedAt: "2026-09-10",
    displayDate: "10-sentabr, 2026",
    author: "VODIYTRANS Matbuot xizmati",
    readTimeMinutes: 3,
    featuredTier: "regular",
    coverSceneId: "regional_branch",
    coverCaption:
      "Hududiy filiallarda uzluksiz navbatchilik tizimi tashkil etilgan.",
    districtTag: "Barcha hududlar",
    paragraphs: [
      "Aholi punktlarida tozalikni saqlash va maishiy chiqindilarning o'z vaqtida olib chiqilishini ta'minlash maqsadida bayram hamda dam olish kunlarida barcha hududiy bo'linmalarda kuchaytirilgan navbatchilik grafigi amal qiladi.",
      "Yo'nalishlarga biriktirilgan maxsus texnikalar odatdagi soatlarda mahalla va ko'chalarga xizmat ko'rsatishni davom ettiradi."
    ],
    inlinePhotos: [],
    status: "published"
  },
  {
    id: "art-9",
    slug: "saralash-va-qayta-ishlashga-yonaltirish-boyicha-choraklik-tahlil-qoralama",
    title: "Ikkilamchi xomashyoni saralash samaradorligi bo'yicha choraklik tahlil (Tahririyat qoralamasi)",
    summary:
      "Qattiq maishiy chiqindilar tarkibidan foydali fraksiyalarni ajratib olish ko'rsatkichlari bo'yicha tayyorlanayotgan tahliliy maqola.",
    category: "Hisobotlar",
    publishedAt: "2026-11-02",
    displayDate: "2-noyabr, 2026",
    author: "Tahlil bo'limi",
    readTimeMinutes: 5,
    featuredTier: "regular",
    coverSceneId: "sorting_line",
    coverCaption: "Saralash majmuasi jarayoni.",
    districtTag: "Bosh boshqarma",
    paragraphs: [
      "Ushbu maqola hozirda tahririyat tomonidan tekshirilmoqda va tasdiqlangan rasmiy raqamlar kiritilgach nashr etiladi."
    ],
    inlinePhotos: [],
    status: "draft"
  }
];

export const INITIAL_ACTIVITY_DIRECTIONS: ActivityDirection[] = [
  {
    id: "act-1",
    numberLabel: "01",
    title: "Chiqindilarni yig'ish va olib chiqish",
    shortDescription:
      "Aholi punktlari, mahallalar va tashkilotlardan qattiq maishiy hamda xavfsiz chiqindilarni tasdiqlangan yo'nalish jadvallari asosida o'z vaqtida yig'ish va maxsus poligonlarga olib chiqish.",
    detailedPoints: [
      "Ko'p qavatli uylar va xususiy xonadonlar kesimida tasdiqlangan kunlik/haftalik qatnov grafiklari",
      "Chiqindi yig'ish shoxobchalari va konteyner parkini muntazam yangilab borish",
      "Maxsus poligonlarga tashish jarayonida ekologik va texnik xavfsizlik me'yorlariga amal qilish"
    ],
    keyIndicatorPlaceholder: "Kunlik rejaviy qatnov: [Namuna: 180+ yo'nalish]",
    sceneId: "container_station"
  },
  {
    id: "act-2",
    numberLabel: "02",
    title: "Sanitariya va tozalik ishlari",
    shortDescription:
      "Xizmat ko'rsatiladigan hududlarda sanitariya-gigiyena qoidalariga rioya etilishini ta'minlash, chiqindi maydonchalarini yuvish, dezinfeksiya qilish va jamoat joylari tozaligini saqlash.",
    detailedPoints: [
      "Chiqindi qabul qilish shoxobchalarini grafik asosida yuvish va zararsizlantirish",
      "Mavsumiy sanitariya-tozalik tadbirlarida maxsus brigadalar ishtiroki",
      "Aholi gavjum ko'chalar va mahalla markazlarida tozalik holatini doimiy nazorat qilish"
    ],
    keyIndicatorPlaceholder: "Sanitariya ishlovi: [Namuna: 420+ shoxobcha]",
    sceneId: "street_sanitation"
  },
  {
    id: "act-3",
    numberLabel: "03",
    title: "Maxsus texnikalar va transport",
    shortDescription:
      "Zamonaviy chiqindi tashish mashinalari, siqib yuklovchi maxsus avtotransport, yuklagichlar va mexanizatsiya vositalarini ekspluatatsiya qilish, ta'mirlash hamda GPS orqali dispecherlik boshqaruvi.",
    detailedPoints: [
      "Yuqori unumdorlikka ega maxsus siqib yuklovchi va konteyner tashuvchi texnikalar",
      "Markazlashgan GPS monitoring va yo'nalish intizomini real vaqtda kuzatish",
      "Hududiy ta'mirlash-profilaktika ustaxonalari va texnik ko'rik bazalari"
    ],
    keyIndicatorPlaceholder: "Maxsus texnika parki: [Namuna: 140+ birlik]",
    sceneId: "fleet_depot"
  },
  {
    id: "act-4",
    numberLabel: "04",
    title: "Hududlarni obodonlashtirish",
    shortDescription:
      "Shahar va tumanlarda ekologik holatni yaxshilash, chiqindi shoxobchalari atrofini obodonlashtirish, yashil hududlarni saqlash va namunaviy infratuzilma loyihalarini amalga oshirish.",
    detailedPoints: [
      "Eskirgan chiqindi yig'ish nuqtalarini zamonaviy arxitektura asosida rekonstruksiya qilish",
      "Shoxobchalar atrofini ko'kalamzorlashtirish va kirish yo'laklarini betonlashtirish",
      "Saralab yig'ish madaniyatini qo'llab-quvvatlovchi zamonaviy infratuzilma"
    ],
    keyIndicatorPlaceholder: "Yangilangan maydonchalar: [Namuna: 95+ obyekt]",
    sceneId: "resolved_courtyard"
  }
];

export const INITIAL_ORG_METRICS: OrganizationalMetric[] = [
  {
    id: "m-1",
    label: "Bajarilgan sanitariya va olib chiqish reyslari",
    value: "48,600+",
    unit: "reys (namuna)",
    periodNote: "Joriy yil boshidan [Namuna ko'rsatkich]",
    description: "Tasdiqlangan marshrut jadvallari asosida amalga oshirilgan maxsus texnika qatnovlari."
  },
  {
    id: "m-2",
    label: "Xizmat ko'rsatilayotgan hudud va mahallalar",
    value: "310+",
    unit: "hudud (namuna)",
    periodNote: "Farg'ona vodiysi bo'yicha [Namuna ko'rsatkich]",
    description: "Doimiy grafik asosida qattiq maishiy chiqindilar olib chiqiladigan mahalla va uchastkalar."
  },
  {
    id: "m-3",
    label: "Qabul qilingan va filiallarga taqsimlangan yangi texnikalar",
    value: "38",
    unit: "ta maxsus texnika (namuna)",
    periodNote: "Oxirgi yangilanish bosqichi [Namuna ko'rsatkich]",
    description: "Hududiy bo'linmalarning moddiy-texnik bazasini kuchaytirish uchun topshirilgan transportlar."
  },
  {
    id: "m-4",
    label: "Yangilangan va rekonstruksiya qilingan shoxobchalar",
    value: "112",
    unit: "ta maydoncha (namuna)",
    periodNote: "Infratuzilma dasturi [Namuna ko'rsatkich]",
    description: "Zamonaviy konteynerlar va beton qoplama bilan jihozlangan chiqindi yig'ish nuqtalari."
  },
  {
    id: "m-5",
    label: "O'rganilgan va amalda hal etilgan masalalar",
    value: "96.4%",
    unit: "ijro ko'rsatkichi (namuna)",
    periodNote: "Hisobot davrida [Namuna ko'rsatkich]",
    description: "Rasmiy kanallar orqali kelib tushgan va joyiga chiqib bartaraf etilgan xizmat masalalari."
  },
  {
    id: "m-6",
    label: "O'rnatilgan yangi namunadagi konteynerlar",
    value: "1,240",
    unit: "dona (namuna)",
    periodNote: "Hududiy filiallar kesimida [Namuna ko'rsatkich]",
    description: "Ko'p qavatli uylar va ijtimoiy obyektlar atrofiga joylashtirilgan metall konteynerlar."
  }
];

export const INITIAL_BRANCHES: RegionalBranch[] = [
  {
    id: "br-1",
    branchNamePlaceholder: "1-sonli Markaziy hududiy filial [Filial nomi namunasi]",
    locationPlaceholder: "Farg'ona shahri va tutash hududlar [Manzil namunasi]",
    serviceAreaDescription:
      "Shahar markaziy mavzelari, ko'p qavatli turar-joy fondlari va yirik ijtimoiy obyektlarga sanitariya xizmati ko'rsatish bo'linmasi.",
    machineryCountPlaceholder: "34 ta maxsus texnika [Namuna]",
    workingHoursPlaceholder: "Dushanba – Shanba, 08:00 – 18:00",
    phonePlaceholder: "[Filial telefoni: tasdiqlangach kiritiladi]",
    emailPlaceholder: "[Filial email: filial1@vodiytrans.uz — namuna]",
    addressPlaceholder: "[Aniq ko'cha va bino raqami: tasdiqlangach kiritiladi]",
    sceneId: "regional_branch"
  },
  {
    id: "br-2",
    branchNamePlaceholder: "2-sonli Marg'ilon hududiy bo'linmasi [Filial nomi namunasi]",
    locationPlaceholder: "Marg'ilon shahri va atrof mahallalari [Manzil namunasi]",
    serviceAreaDescription:
      "Mahalla fuqarolar yig'inlari, ichki ko'chalar va chiqindi yig'ish shoxobchalariga xizmat ko'rsatish hamda obodonlashtirish bo'linmasi.",
    machineryCountPlaceholder: "28 ta maxsus texnika [Namuna]",
    workingHoursPlaceholder: "Dushanba – Shanba, 08:00 – 18:00",
    phonePlaceholder: "[Filial telefoni: tasdiqlangach kiritiladi]",
    emailPlaceholder: "[Filial email: filial2@vodiytrans.uz — namuna]",
    addressPlaceholder: "[Aniq ko'cha va bino raqami: tasdiqlangach kiritiladi]",
    sceneId: "fleet_depot"
  },
  {
    id: "br-3",
    branchNamePlaceholder: "3-sonli Qo'qon hududiy filiali [Filial nomi namunasi]",
    locationPlaceholder: "Qo'qon shahri va g'arbiy tumanlar yo'nalishi [Manzil namunasi]",
    serviceAreaDescription:
      "Sanitariya tozalash, qattiq maishiy chiqindilarni yig'ish, saralash va maxsus texnikalar ta'miri bazasiga ega hududiy bo'linma.",
    machineryCountPlaceholder: "31 ta maxsus texnika [Namuna]",
    workingHoursPlaceholder: "Dushanba – Shanba, 08:00 – 18:00",
    phonePlaceholder: "[Filial telefoni: tasdiqlangach kiritiladi]",
    emailPlaceholder: "[Filial email: filial3@vodiytrans.uz — namuna]",
    addressPlaceholder: "[Aniq ko'cha va bino raqami: tasdiqlangach kiritiladi]",
    sceneId: "container_station"
  },
  {
    id: "br-4",
    branchNamePlaceholder: "4-sonli Tumanlararo maxsus ekspluatatsiya bo'linmasi [Filial nomi namunasi]",
    locationPlaceholder: "Vodiy tumanlari yo'nalishi [Manzil namunasi]",
    serviceAreaDescription:
      "Tuman markazlari va qishloq aholi punktlarida signal usulida hamda shoxobchalar orqali chiqindilarni olib chiqish bo'linmasi.",
    machineryCountPlaceholder: "26 ta maxsus texnika [Namuna]",
    workingHoursPlaceholder: "Dushanba – Shanba, 08:00 – 18:00",
    phonePlaceholder: "[Filial telefoni: tasdiqlangach kiritiladi]",
    emailPlaceholder: "[Filial email: filial4@vodiytrans.uz — namuna]",
    addressPlaceholder: "[Aniq ko'cha va bino raqami: tasdiqlangach kiritiladi]",
    sceneId: "street_sanitation"
  }
];

export const INITIAL_COMPLETED_CASES: CompletedAppealCase[] = [
  {
    id: "case-1",
    slug: "margilon-shahrida-chiqindilarni-oz-vaqtida-olib-chiqish-boyicha-aniqlangan-muammo-bartaraf-etildi",
    title: "Marg'ilon shahrida chiqindilarni o'z vaqtida olib chiqish bo'yicha aniqlangan muammo bartaraf etildi",
    issueSummary:
      "Rasmiy idoralararo tizim orqali kelib tushgan ma'lumotga ko'ra, ko'p qavatli uylar oralig'idagi chiqindi yig'ish shoxobchasida rejaviy grafikdan kechikish va konteynerlarning to'lib ketishi holati qayd etilgan.",
    district: "Marg'ilon yo'nalishi (Namuna)",
    reportingPeriod: "2026-yil oktabr, 3-dekada",
    completedDate: "2026-10-22",
    measuresTaken: [
      "Hududiy filialning navbatchi maxsus siqib yuklovchi texnikasi va tozalash brigadasi tezkor safarbar etildi.",
      "To'planib qolgan qattiq maishiy chiqindilar to'liq olib chiqilib, beton maydoncha yuvildi va dezinfeksiya qilindi.",
      "Yaroqsiz holga kelgan 2 ta konteyner o'rniga 4 ta yangi qopqoqli metall konteyner joylashtirildi.",
      "Ushbu uchastka bo'yicha ertalabki soat 07:30 da kunlik qatnov grafigi qat'iy belgilandi."
    ],
    outcome:
      "Shoxobchadagi sanitariya holati me'yorga keltirildi. Oxirgi 10 kunlik monitoring davomida grafikdan kechikish holati qaytarilmadi.",
    verifiedMetricLabel: "4 ta yangi konteyner · Kunlik 07:30 qatnov grafigi (Namuna)",
    coverSceneId: "resolved_courtyard",
    beforeAfterNote: "Amaliy ishlar yakuni fotohisobot va hududiy dalolatnoma bilan tasdiqlangan.",
    supportingPhotos: [
      {
        id: "cp-1",
        sceneId: "resolved_courtyard",
        caption: "Tozalash va yangi konteynerlar o'rnatilgandan keyingi holat.",
        locationLabel: "Marg'ilon yo'nalishi (Namuna)",
        date: "22-oktabr, 2026"
      },
      {
        id: "cp-2",
        sceneId: "container_station",
        caption: "Tartibga keltirilgan beton maydoncha va kirish yo'lagi.",
        locationLabel: "Marg'ilon yo'nalishi (Namuna)",
        date: "22-oktabr, 2026"
      }
    ],
    relatedDocumentId: "doc-3",
    relatedArticleSlug: "margilon-shahrida-chiqindilarni-oz-vaqtida-olib-chiqish-boyicha-aniqlangan-muammo-bartaraf-etildi",
    isFeaturedCaseStudy: true,
    status: "published"
  },
  {
    id: "case-2",
    slug: "markaziy-mavzeda-chiqindi-shoxobchasi-kirish-yolagi-va-soyaboni-tiklandi",
    title: "Markaziy mavzeda chiqindi shoxobchasi kirish yo'lagi va himoya soyaboni ta'mirlandi",
    issueSummary:
      "Yog'ingarchilik mavsumi oldidan shoxobcha tom qismi va maxsus texnika kirish yo'lagi ta'mirtalab holatga kelib qolgani bo'yicha murojaat o'rganildi.",
    district: "1-hududiy filial (Namuna)",
    reportingPeriod: "2026-yil oktabr, 2-dekada",
    completedDate: "2026-10-16",
    measuresTaken: [
      "Qurilish-ta'mirlash guruhi tomonidan shoxobcha metall konstruksiyasi va soyabon qoplamasi yangilandi.",
      "Maxsus yuklovchi mashina manevr qilishi uchun 45 kv.m kirish yo'lagi betonlashtirildi.",
      "Shoxobcha atrofiga axborot lavhasi va qatnov jadvali o'rnatildi."
    ],
    outcome:
      "Maxsus texnikalarning har qanday ob-havo sharoitida to'siqsiz kirib-chiqishi va chiqindilarning yomg'irdan himoyalanishi ta'minlandi.",
    verifiedMetricLabel: "45 kv.m beton qoplama · Yangi soyabon (Namuna)",
    coverSceneId: "container_station",
    beforeAfterNote: "Ta'mirlash yakunlari texnik qabul dalolatnomasi bilan tasdiqlangan.",
    supportingPhotos: [
      {
        id: "cp-3",
        sceneId: "container_station",
        caption: "Rekonstruksiya qilingan soyabon va beton maydoncha.",
        locationLabel: "1-hududiy filial (Namuna)",
        date: "16-oktabr, 2026"
      }
    ],
    relatedDocumentId: "doc-1",
    isFeaturedCaseStudy: true,
    status: "published"
  },
  {
    id: "case-3",
    slug: "qoqon-yonalishidagi-mahallalarda-signal-usulida-qatnov-vaqti-muvofiqlashtirildi",
    title: "Qo'qon yo'nalishidagi mahallalarda maxsus transport qatnov vaqti aholi takliflari asosida muvofiqlashtirildi",
    issueSummary:
      "Xususiy xonadonlar joylashgan ichki ko'chalarda maxsus texnika qatnov vaqti ish vaqtiga to'g'ri kelib qolayotgani sababli jadvalni qayta ko'rib chiqish so'ralgan.",
    district: "Qo'qon yo'nalishi (Namuna)",
    reportingPeriod: "2026-yil sentabr – oktabr",
    completedDate: "2026-10-08",
    measuresTaken: [
      "Mahalla fuqarolar yig'ini vakillari ishtirokida 6 ta ichki ko'cha bo'yicha qatnov soatlari o'rganib chiqildi.",
      "Ertalabki va kechki qulay soatlar tanlanib, yangilangan grafik tasdiqlandi.",
      "Yo'nalishdagi texnika harakati GPS nazoratiga olindi."
    ],
    outcome:
      "Belgilangan ko'chalarda chiqindilarni topshirish qamrovi oshdi va ko'cha bo'ylarida qop qoldirish holatlari barham topdi.",
    verifiedMetricLabel: "6 ta ko'cha grafigi yangilandi (Namuna)",
    coverSceneId: "street_sanitation",
    beforeAfterNote: "Yangilangan jadval mahalla idorasi bilan kelishilgan holda joriy etildi.",
    supportingPhotos: [
      {
        id: "cp-4",
        sceneId: "street_sanitation",
        caption: "Tasdiqlangan grafik bo'yicha mahalla ko'chasida xizmat ko'rsatayotgan maxsus transport.",
        locationLabel: "Qo'qon yo'nalishi (Namuna)",
        date: "8-oktabr, 2026"
      }
    ],
    isFeaturedCaseStudy: false,
    status: "published"
  },
  {
    id: "case-4",
    slug: "ijtimoiy-soha-obyektlari-atrofidagi-konteyner-maydonchalari-tartibga-keltirildi",
    title: "Ijtimoiy soha obyektlari atrofidagi konteyner maydonchalari sanitariya me'yorlariga keltirildi",
    issueSummary:
      "Ta'lim va tibbiyot muassasalari yaqinidagi chiqindi yig'ish nuqtalarida sanitariya tozalash chastotasini oshirish bo'yicha kelib tushgan murojaat ijrosi ta'minlandi.",
    district: "Tumanlararo bo'linma (Namuna)",
    reportingPeriod: "2026-yil sentabr",
    completedDate: "2026-09-27",
    measuresTaken: [
      "12 ta ijtimoiy obyektga tutash maydonchalarda yopiq qopqoqli konteynerlar o'rnatildi.",
      "Olib chiqish davriyligi kuniga 2 martalik rejimga o'tkazildi.",
      "Haftalik profilaktik dezinfeksiya grafigi yo'lga qo'yildi."
    ],
    outcome:
      "Barcha 12 ta nuqtada sanitariya-gigiyena talablari to'liq bajarildi.",
    verifiedMetricLabel: "12 ta nuqta · Kuniga 2 mahal qatnov (Namuna)",
    coverSceneId: "eco_awareness",
    beforeAfterNote: "Sanitariya xizmati xulosasi va fotolavhalar bilan tasdiqlangan.",
    supportingPhotos: [],
    isFeaturedCaseStudy: false,
    status: "published"
  }
];

export const INITIAL_DISTRICT_STATS: DistrictPerformanceStat[] = [
  {
    id: "ds-1",
    districtName: "1-hududiy filial (Namuna)",
    receivedCount: 145,
    reviewedCount: 145,
    resolvedCount: 140,
    inProgressCount: 5,
    coverageNote: "Markaziy mavzelar va ko'p qavatli uylar"
  },
  {
    id: "ds-2",
    districtName: "Marg'ilon yo'nalishi (Namuna)",
    receivedCount: 118,
    reviewedCount: 118,
    resolvedCount: 114,
    inProgressCount: 4,
    coverageNote: "Shahar mahallalari va shoxobchalar"
  },
  {
    id: "ds-3",
    districtName: "Qo'qon yo'nalishi (Namuna)",
    receivedCount: 132,
    reviewedCount: 132,
    resolvedCount: 127,
    inProgressCount: 5,
    coverageNote: "Shahar va tutash uchastkalar"
  },
  {
    id: "ds-4",
    districtName: "Tumanlararo bo'linma (Namuna)",
    receivedCount: 95,
    reviewedCount: 95,
    resolvedCount: 91,
    inProgressCount: 4,
    coverageNote: "Tuman markazlari va signal yo'nalishlari"
  }
];

export const INITIAL_MONTHLY_STATS: MonthlyPerformanceStat[] = [
  { month: "May 2026 (Namuna)", completedOperations: 4620, resolvedCases: 74 },
  { month: "Iyun 2026 (Namuna)", completedOperations: 4780, resolvedCases: 81 },
  { month: "Iyul 2026 (Namuna)", completedOperations: 4910, resolvedCases: 79 },
  { month: "Avgust 2026 (Namuna)", completedOperations: 5040, resolvedCases: 86 },
  { month: "Sentabr 2026 (Namuna)", completedOperations: 5120, resolvedCases: 78 },
  { month: "Oktabr 2026 (Namuna)", completedOperations: 5290, resolvedCases: 74 }
];

export const INITIAL_PHOTO_ALBUMS: PhotoAlbum[] = [
  {
    id: "alb-1",
    title: "Yangi maxsus sanitariya texnikalarini hududiy filiallarga topshirish jarayoni",
    albumType: "Tadbir",
    date: "25-oktabr, 2026",
    location: "Markaziy avtosaroy bazasi (Namuna)",
    description:
      "Hududiy bo'linmalar moddiy-texnik bazasini mustahkamlash doirasida keltirilgan zamonaviy chiqindi tashish texnikalari fotogalereyasi.",
    coverSceneId: "fleet_depot",
    photos: [
      {
        id: "ph-101",
        sceneId: "fleet_depot",
        caption: "Yangi qabul qilingan siqib yuklovchi maxsus avtotransport vositalari safi.",
        locationLabel: "Markaziy avtosaroy (Namuna)",
        date: "25-oktabr, 2026"
      },
      {
        id: "ph-102",
        sceneId: "gps_dispatch",
        caption: "Transport vositalariga o'rnatilgan GPS va dispecherlik nazorat jihozlarini tekshirish.",
        locationLabel: "Dispecherlik markazi (Namuna)",
        date: "25-oktabr, 2026"
      },
      {
        id: "ph-103",
        sceneId: "winter_readiness",
        caption: "Texnik xizmat ko'rsatish va mexaniklar guruhi ko'rigi.",
        locationLabel: "Texnik baza (Namuna)",
        date: "25-oktabr, 2026"
      }
    ]
  },
  {
    id: "alb-2",
    title: "Zamonaviy chiqindi yig'ish shoxobchalarini qurish va rekonstruksiya qilish loyihasi",
    albumType: "Loyiha",
    date: "18-oktabr, 2026",
    location: "Farg'ona vodiysi hududlari (Namuna)",
    description:
      "Mahallalarda barpo etilgan yopiq turdagi zamonaviy konteyner maydonchalari va obodonlashtirilgan tutash hududlar.",
    coverSceneId: "container_station",
    photos: [
      {
        id: "ph-201",
        sceneId: "container_station",
        caption: "Yangi qurib foydalanishga topshirilgan namunaviy konteyner shoxobchasi.",
        locationLabel: "1-hududiy filial (Namuna)",
        date: "18-oktabr, 2026"
      },
      {
        id: "ph-202",
        sceneId: "resolved_courtyard",
        caption: "Ko'p qavatli uylar hovlisida obodonlashtirilgan sanitariya hududi.",
        locationLabel: "Marg'ilon yo'nalishi (Namuna)",
        date: "22-oktabr, 2026"
      }
    ]
  },
  {
    id: "alb-3",
    title: "Mahallalar va ko'chalarda kundalik sanitariya-tozalash ishlari",
    albumType: "Amaliy faoliyat",
    date: "12-oktabr, 2026",
    location: "Xizmat ko'rsatish uchastkalari (Namuna)",
    description:
      "Ertalabki navbatchilik brigadalari va maxsus texnikalarning shahar hamda tuman ko'chalaridagi kundalik mehnati.",
    coverSceneId: "street_sanitation",
    photos: [
      {
        id: "ph-301",
        sceneId: "street_sanitation",
        caption: "Ertalabki yo'nalishda maxsus texnika va sanitariya xodimlari faoliyati.",
        locationLabel: "Markaziy ko'cha (Namuna)",
        date: "12-oktabr, 2026"
      },
      {
        id: "ph-302",
        sceneId: "eco_awareness",
        caption: "Kuzgi obodonlashtirish va hududlarni tozalash tadbirlari.",
        locationLabel: "Qo'qon yo'nalishi (Namuna)",
        date: "10-oktabr, 2026"
      }
    ]
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "VODIY MAXSUS SANITAR TRANS MCHJ: Hududiy filiallar va maxsus texnikalar parki faoliyati (Namuna videolavha)",
    description:
      "Tashkilotning Farg'ona vodiysidagi kundalik sanitariya-tozalash ishlari, dispecherlik markazi va yangi maxsus texnikalar imkoniyatlari haqida axborot lavhasi.",
    publishedDate: "28-oktabr, 2026",
    duration: "04:18",
    youtubeId: "M7lc1UVf-VE",
    category: "Faoliyat sharhi",
    thumbnailSceneId: "fleet_depot"
  },
  {
    id: "vid-2",
    title: "Zamonaviy chiqindi yig'ish shoxobchalari va saralash infratuzilmasi (Namuna videolavha)",
    description:
      "Mahallalarda rekonstruksiya qilingan chiqindi qabul qilish nuqtalari va ularda sanitariya me'yorlariga amal qilinishi bo'yicha videoreportaj.",
    publishedDate: "19-oktabr, 2026",
    duration: "03:42",
    youtubeId: "M7lc1UVf-VE",
    category: "Loyihalar",
    thumbnailSceneId: "container_station"
  },
  {
    id: "vid-3",
    title: "Murojaatlar ijrosi amalda: hududlarda bartaraf etilgan muammolar sarhisobi (Namuna videolavha)",
    description:
      "Joylardan kelib tushgan murojaatlar asosida amalga oshirilgan tozalash, ta'mirlash va qatnov jadvalini tiklash ishlari haqida maxsus lavha.",
    publishedDate: "11-oktabr, 2026",
    duration: "05:10",
    youtubeId: "M7lc1UVf-VE",
    category: "Murojaatlar ijrosi",
    thumbnailSceneId: "resolved_courtyard"
  }
];

export const INITIAL_DOCUMENTS: OfficialDocument[] = [
  {
    id: "doc-1",
    code: "NAMUNA-HISOBOT-2026/10",
    title: "2026-yil III chorak va oktabr oyi yakunlari bo'yicha amalga oshirilgan sanitariya-tozalash ishlari sarhisobi (Namuna hujjat)",
    category: "Hisobotlar",
    publishedDate: "30-oktabr, 2026",
    fileSize: "1.4 MB",
    pageCount: 12,
    summary:
      "Hududiy filiallar kesimida chiqindilarni olib chiqish hajmi, maxsus texnikalar qatnov ko'rsatkichlari va yangilangan shoxobchalar bo'yicha umumlashtirilgan ochiq ma'lumotnoma (Namuna).",
    sampleContentSections: [
      {
        heading: "1. Umumiy ma'lumot (Namuna)",
        body: "Mazkur ma'lumotnoma prototip maqsadida shakllantirilgan bo'lib, tashkilotning tasdiqlangan choraklik ko'rsatkichlari e'lon qilinadigan rasmiy hisobot shaklini aks ettiradi."
      },
      {
        heading: "2. Asosiy yo'nalishlar bo'yicha bajarilgan ishlar",
        body: "Hisobot davrida hududiy filiallar tomonidan tasdiqlangan marshrut jadvallari asosida qattiq maishiy chiqindilarni olib chiqish, konteyner maydonchalarini ta'mirlash hamda dispecherlik monitoringini yuritish ishlari amalga oshirildi."
      }
    ],
    isApprovedPublic: true
  },
  {
    id: "doc-2",
    code: "NAMUNA-TEXNIKA-2026/08",
    title: "Hududiy filiallarga taqsimlangan maxsus avtotransport vositalari va konteynerlar to'g'risida ochiq ma'lumotnoma (Namuna hujjat)",
    category: "Faoliyatga oid ma'lumotlar",
    publishedDate: "25-oktabr, 2026",
    fileSize: "920 KB",
    pageCount: 6,
    summary:
      "Moddiy-texnik bazani yangilash bosqichida xarid qilingan va filiallarga biriktirilgan maxsus texnikalar turi hamda xizmat yo'nalishlari haqida ma'lumot (Namuna).",
    sampleContentSections: [
      {
        heading: "1. Texnika parkini yangilash maqsadi",
        body: "Hududlarda qatnov barqarorligini ta'minlash va mavjud texnikalarning eskirish darajasini kamaytirish uchun yangi siqib yuklovchi transport vositalari yo'nalishlarga biriktirildi."
      }
    ],
    isApprovedPublic: true
  },
  {
    id: "doc-3",
    code: "NAMUNA-IJRO-2026/10",
    title: "Murojaatlar ijrosi va hududlarda bartaraf etilgan kamchiliklar bo'yicha oylik axborot byulleteni (Namuna hujjat)",
    category: "Hisobotlar",
    publishedDate: "22-oktabr, 2026",
    fileSize: "1.1 MB",
    pageCount: 8,
    summary:
      "Rasmiy kanallar orqali kelib tushgan murojaatlar asosida joylarda bajarilgan amaliy tozalash va ta'mirlash ishlari yuzasidan jamoatchilik uchun ochiq axborot (Namuna).",
    sampleContentSections: [
      {
        heading: "1. Murojaatlar ijrosini yuritish tartibi",
        body: "Tashkilotga belgilangan davlat va idoralararo kanallar orqali kelib tushgan murojaatlar hududiy ishchi guruhlar tomonidan joyiga chiqib o'rganiladi hamda amaliy natijasi fotohisobot bilan rasmiylashtiriladi."
      }
    ],
    isApprovedPublic: true
  },
  {
    id: "doc-4",
    code: "NAMUNA-NIZOM-2026/01",
    title: "«VODIY MAXSUS SANITAR TRANS» MCHJ axborot siyosati va ochiq ma'lumotlarni e'lon qilish tartibi (Namuna hujjat)",
    category: "Rasmiy hujjatlar",
    publishedDate: "15-sentabr, 2026",
    fileSize: "680 KB",
    pageCount: 5,
    summary:
      "Rasmiy veb-saytda faoliyat yangiliklari, tasdiqlangan hisobotlar va foto-video materiallarni e'lon qilish bo'yicha ichki axborot reglametining namunaviy matni.",
    sampleContentSections: [
      {
        heading: "1. Asosiy qoidalar",
        body: "VODIYTRANS.UZ platformasida faqat tasdiqlangan, tekshirilgan va shaxsga doir maxfiy ma'lumotlardan xoli bo'lgan rasmiy axborot materiallari e'lon qilinadi."
      }
    ],
    isApprovedPublic: true
  },
  {
    id: "doc-5",
    code: "NAMUNA-ELON-2026/09",
    title: "Kuz-qish mavsumida hududiy filiallarning maxsus transport qatnov grafigi bo'yicha ma'lumot (Namuna hujjat)",
    category: "E'lonlar",
    publishedDate: "1-oktabr, 2026",
    fileSize: "540 KB",
    pageCount: 4,
    summary:
      "Mavsumiy ish rejimiga o'tilishi munosabati bilan hududiy bo'linmalarda ertalabki va kechki navbatchilik soatlari to'g'risida ma'lumotnoma (Namuna).",
    sampleContentSections: [
      {
        heading: "1. Mavsumiy qatnov tartibi",
        body: "Barcha hududiy bo'linmalarda ertalabki yo'nalishga chiqish soati 07:00 etib belgilangan."
      }
    ],
    isApprovedPublic: true
  }
];

export const INITIAL_LEADERSHIP: LeadershipPlaceholder[] = [
  {
    id: "lead-1",
    roleTitle: "Jamiyat bosh direktori",
    fullNamePlaceholder: "[F.I.Sh. — Tasdiqlangan ma'lumot kiritiladi]",
    receptionSchedulePlaceholder: "[Qabul kunlari: tasdiqlangach kiritiladi]",
    phonePlaceholder: "[Xizmat telefoni namunasi]",
    emailPlaceholder: "[Rasmiy elektron pochta namunasi]",
    responsibilities:
      "Tashkilot faoliyatiga umumiy rahbarlik qilish, strategik rivojlantirish, hududiy filiallar faoliyatini muvofiqlashtirish va moddiy-texnik bazani modernizatsiya qilish."
  },
  {
    id: "lead-2",
    roleTitle: "Ekspluatatsiya va maxsus transport bo'yicha direktor o'rinbosari",
    fullNamePlaceholder: "[F.I.Sh. — Tasdiqlangan ma'lumot kiritiladi]",
    receptionSchedulePlaceholder: "[Qabul kunlari: tasdiqlangach kiritiladi]",
    phonePlaceholder: "[Xizmat telefoni namunasi]",
    emailPlaceholder: "[Rasmiy elektron pochta namunasi]",
    responsibilities:
      "Maxsus avtotransport vositalari parki, dispecherlik xizmati, yo'nalish jadvallari intizomi va ta'mirlash-profilaktika bazalari faoliyatini boshqarish."
  },
  {
    id: "lead-3",
    roleTitle: "Sanitariya nazorati va hududiy filiallar bilan ishlash bo'limi boshlig'i",
    fullNamePlaceholder: "[F.I.Sh. — Tasdiqlangan ma'lumot kiritiladi]",
    receptionSchedulePlaceholder: "[Qabul kunlari: tasdiqlangach kiritiladi]",
    phonePlaceholder: "[Xizmat telefoni namunasi]",
    emailPlaceholder: "[Rasmiy elektron pochta namunasi]",
    responsibilities:
      "Chiqindi yig'ish shoxobchalari holati, sanitariya-tozalash ishlari sifati va kelib tushgan murojaatlar bo'yicha joylarda amaliy choralar ko'rilishini nazorat qilish."
  }
];
