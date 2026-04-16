// ============================================================
// FICHIER DE CONFIGURATION CENTRAL — À MODIFIER PAR MARIAGE
// ============================================================
// Toutes les données personnalisées sont ici.
// Pour livrer un nouveau site, ne toucher QUE ce fichier
// (+ remplacer les images dans /public/images/).
// ============================================================

export const weddingConfig = {

  // ── IDENTITÉ ────────────────────────────────────────────
  bride: "Mia",
  groom: "Gabriel",
  hashtag: "#GabrielEtMia",
  coupleNames: "Gabriel & Mia",        // affiché dans le Hero
  tradition: "sephardic",              // "sephardic" | "ashkenazi" | "mizrahi"

  // ── DATE & LIEU ─────────────────────────────────────────
  date: "2026-06-14",                  // format ISO
  dateDisplay: "14 juin 2026",         // format affiché
  dateHebrew: "י״ח סיון תשפ״ו",       // date hébraïque
  dayOfWeek: "Dimanche",

  venue: {
    name: "Château de la Gaude",
    address: "Route de la Gaude, 06610 La Gaude, Alpes-Maritimes",
    city: "La Gaude, Côte d'Azur",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.5!2d7.1147!3d43.7213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd4b0e4e1c8b3%3A0x0!2sRoute+de+la+Gaude!5e0!3m2!1sfr!2sfr!4v1700000000000",
    mapsLink: "https://goo.gl/maps/example",
    photo: "/images/venue.jpg",
    isKosher: true,
    kashroutAuthority: "Beth Din de Nice",
    walkableForShabbat: false,
    parking: "Parking gratuit sur place, 200 places disponibles",
    access: "Accessible en voiture uniquement.",
  },

  // ── COULEURS (changeable par tradition / goût) ──────────
  colors: {
    primary: "#C9A96E",        // or champagne
    secondary: "#8FAF8F",      // vert sauge
    background: "#FAF8F5",     // ivoire
    text: "#2C2C2C",
    accent: "#E8D5A3",         // or clair
  },

  // ── CÉRÉMONIES ──────────────────────────────────────────
  // Données affichées dans Ceremonies.jsx (Mairie, Houpa, Shabbat Hatan)
  // Le champ `content` est du JSX — modifier uniquement les textes entre guillemets
  ceremonies: null, // défini dans App.jsx (nécessite JSX)

  // ── PHOTOS ──────────────────────────────────────────────
  photos: {
    hero: "/images/hero.jpg",
    couple: "/images/couple.jpg",
    gallery: [
      "/images/g1.jpg",
      "/images/g2.jpg",
      "/images/g3.jpg",
      "/images/g4.jpg",
      "/images/g5.jpg",
      "/images/g6.jpg",
    ],
  },

  // ── PROGRAMME ───────────────────────────────────────────
  program: [
    {
      id: "mairie",
      time: "10h30",
      event: "Mairie",
      eventHebrew: "",
      description: "Cérémonie civile en mairie.",
      icon: "🏛️",
      category: "ceremony",
    },
    {
      time: "16h00",
      event: "Kabbalat Panim",
      eventHebrew: "קַבָּלַת פָּנִים",
      description: "Accueil séparé des mariés — la mariée reçoit ses invitées, le marié est entouré de ses proches.",
      icon: "🕊️",
      category: "ceremony",
    },
    {
      time: "17h00",
      event: "Bedeken",
      eventHebrew: "בֶּדֶקֶן",
      description: "Le marié voile la mariée, accompagné de musique et de joie.",
      icon: "💐",
      category: "ceremony",
    },
    {
      id: "houpa",
      time: "17h30",
      event: "Houpa",
      eventHebrew: "חוּפָּה",
      description: "Cérémonie sacrée sous le dais nuptial — Kiddoushin, échanges d'alliances et 7 bénédictions (Cheva Brachot).",
      icon: "💍",
      category: "ceremony",
    },
    {
      time: "18h30",
      event: "Yihoud",
      eventHebrew: "יִחוּד",
      description: "Moment de recueillement privé des mariés.",
      icon: "🤍",
      category: "ceremony",
    },
    {
      time: "19h00",
      event: "Cocktail",
      eventHebrew: "",
      description: "Vin d'honneur et amuse-bouches dans les jardins.",
      icon: "🥂",
      category: "reception",
    },
    {
      time: "20h30",
      event: "Dîner de gala",
      eventHebrew: "",
      description: "Dîner gastronomique.",
      icon: "🍽️",
      category: "reception",
    },
    {
      time: "22h00",
      event: "Première danse",
      eventHebrew: "",
      description: "La danse des mariés.",
      icon: "💃",
      category: "reception",
    },
    {
      time: "22h30",
      event: "Soirée dansante",
      eventHebrew: "",
      description: "Musique séfarade & mizrahi — DJ et orchestre live.",
      icon: "🎶",
      category: "reception",
    },
    {
      time: "00h30",
      event: "Birkat Hamazon",
      eventHebrew: "בִּרְכַּת הַמָּזוֹן",
      description: "Bénédictions après le repas.",
      icon: "✡️",
      category: "ceremony",
    },
    {
      id: "shabbat-hatan",
      time: "Shabbat suivant",
      event: "Shabbat Hatan",
      eventHebrew: "שַׁבַּת חָתָן",
      description: "Célébration du Shabbat du marié, entouré de la famille et des proches.",
      icon: "🕯️",
      category: "ceremony",
    },
  ],

  // ── NOTRE HISTOIRE ───────────────────────────────────────
  ourStory: [
    {
      year: "2021",
      title: "Notre première rencontre",
      text: "C'était lors d'une balade avec des amis en commun. On se croise, on se sourit — et l'évidence nous a frappés. On ne s'est plus quittés.",
      photo: "/images/s1.jpg",
      emoji: "✨",
    },
    {
      year: "2022",
      title: "Notre premier voyage",
      text: "Notre premier grand voyage ensemble, entre ciel et mer. On a découvert qu'on partageait bien plus qu'une même vision du monde — une façon d'aimer la vie, la famille, l'avenir.",
      photo: "/images/s2.jpg",
      emoji: "🌊",
    },
    {
      year: "Janvier 2023",
      title: "Les Fiançailles !",
      text: "C'est enfin le moment de la demande en mariage. Face aux montagnes enneigées et au coucher de soleil, Gabriel pose un genou à terre — et notre plus belle aventure a commencé.",
      photo: "/images/s3.jpg",
      emoji: "💍",
    },
    {
      year: "Mai 2023",
      title: "Déménagement & Installation",
      text: "On a posé nos valises et empilé nos cartons. Entre le salon à peindre et la cuisine à assembler, on a construit notre chez-nous — et on n'a jamais autant ri.",
      photo: "/images/s4.jpg",
      emoji: "🏠",
    },
    {
      year: "2024",
      title: "Complices Toujours",
      text: "Des années après notre rencontre, on est toujours les mêmes complices. Et bientôt, sous la Houpa, entourés de ceux qu'on aime, on se dira OUI pour toujours.",
      photo: "/images/s6.jpg",
      emoji: "🤍",
    },
  ],

  // ── HÉBERGEMENTS ─────────────────────────────────────────
  accommodations: [
    {
      name: "Château Saint-Martin & Spa",
      stars: 5,
      description: "Palace 5 étoiles sur les hauteurs de Vence. Piscine à débordement, spa Sisley, vue panoramique sur la Côte d'Azur. À 7 min du château.",
      photo: "/images/hotel1.jpg",
      bookingLink: "https://www.booking.com/hotel/fr/chateau-saint-martin-vence.fr.html",
      distance: "7 min en voiture",
      walkableForShabbat: false,
      promoCode: "",
      recommended: true,
      priceFrom: "450€ / nuit",
    },
    {
      name: "Mas de Vence",
      stars: 4,
      description: "Mas provençal au charme authentique en plein cœur de Vence. Piscine, jardins fleuris, atmosphère intime. À 8 min du château.",
      photo: "/images/hotel2.jpg",
      bookingLink: "https://www.booking.com/hotel/fr/mas-de-vence.fr.html",
      distance: "8 min en voiture",
      walkableForShabbat: false,
      promoCode: "",
      recommended: false,
      priceFrom: "180€ / nuit",
    },
    {
      name: "Hôtel Cantemerle",
      stars: 4,
      description: "Hôtel de charme niché dans un parc arboré à Vence. Piscine, restaurant gastronomique et terrasses ombragées. À 8 min du château.",
      photo: "/images/hotel3.jpg",
      bookingLink: "https://www.booking.com/hotel/fr/cantemerle-vence.fr.html",
      distance: "8 min en voiture",
      walkableForShabbat: false,
      promoCode: "",
      recommended: false,
      priceFrom: "160€ / nuit",
    },
  ],

  // ── FAQ ──────────────────────────────────────────────────
  faq: [
    {
      question: "Le repas est-il casher ?",
      answer: "Oui, l'ensemble des repas et du vin d'honneur est strictement casher, sous la supervision du Beth Din de Nice. Un certificat de cacheroût sera disponible sur demande.",
    },
    {
      question: "Y a-t-il une séparation hommes / femmes pendant la danse ?",
      answer: "Oui, conformément à la tradition séfarade, une séparation (méhitsa) sera mise en place pendant les danses. Hommes et femmes danseront séparément, dans la joie et la ferveur !",
    },
    {
      question: "Quel est le dress code ?",
      answer: "Tenue de soirée chic requise. Les hommes sont invités à porter une kippa — des kippot seront disponibles à l'entrée. Les femmes sont priées de prévoir une tenue couvrant les épaules et les genoux pour la cérémonie.",
    },
    {
      question: "Les enfants sont-ils invités ?",
      answer: "Les enfants sont les bienvenus à la cérémonie (Houpa). Pour le dîner de gala, nous avons prévu un espace enfants avec animateurs et menu adapté. Merci de l'indiquer dans votre RSVP.",
    },
    {
      question: "Y a-t-il un espace pour se couvrir la tête ?",
      answer: "Oui, un panier de kippot (velours et suède) sera disponible à l'entrée du château pour tous les hommes.",
    },
    {
      question: "Le lieu est-il accessible à pied pour Shabbat ?",
      answer: "Le château n'est pas accessible à pied depuis Nice. Si vous observez Shabbat et souhaitez rester sur place, merci de nous contacter — des solutions d'hébergement à proximité immédiate peuvent être arrangées.",
    },
    {
      question: "Comment se rendre au Château de la Gaude ?",
      answer: "Le château est accessible en voiture (parking gratuit sur place). Des navettes seront organisées depuis la gare de Nice-Ville. Les horaires et points de départ seront communiqués ultérieurement.",
    },
    {
      question: "Y a-t-il des options végétariennes / sans gluten ?",
      answer: "Absolument. Plusieurs options sont disponibles : viande, poisson, végétarien et sans gluten. Merci de préciser vos besoins alimentaires lors de votre RSVP.",
    },
  ],

  // ── RSVP ─────────────────────────────────────────────────
  rsvp: {
    deadline: "2026-04-01",
    deadlineDisplay: "1er avril 2026",
    menuOptions: ["Viande", "Poisson", "Végétarien", "Sans gluten"],
    // ↓ URL de déploiement Google Apps Script
    googleSheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbyVOLC_Chbkx_2l78SyA5mSjoj62dAh0ZQGoDIPR-5iRKRk7pSnLDsSf8mLLTSDeth9OA/exec",
  },

  // ── HOUPPA & SOIRÉE ──────────────────────────────────────
  houppa: {
    verse: "קול ששון וקול שמחה כל חתן וקול כלה",
    familiesLeft: [
      "MME COHEN RACHEL",
      "MR ET MME LEVY DAVID",
    ],
    familiesRight: [
      "MR ET MME SIMON PIERRE",
      "MR BERNSTEIN ALBERT",
      "MR ET MME BERNSTEIN MARC",
    ],
    bride: { fr: "MIA", he: "מיה" },
    groom: { fr: "GABRIEL", he: "גַּבְרִיאֵל" },
    date: "LE DIMANCHE 14 JUIN 2026",
    time: "À 17h30",
    venue: {
      name: "Château de la Gaude — Route de la Gaude",
      city: "06610 LA GAUDE, CÔTE D'AZUR",
      mapsLink: "https://goo.gl/maps/example",
    },
    ceremonyNote: "La cérémonie religieuse sera suivie d'une réception.",
    tributeText: "Une douce pensée pour nos grands-parents qui veillent sur nous en ce jour",
    tributeNames: "Mr et Mme Lévy Henri et Suzanne, Mr Cohen Maurice et Mme Bernstein Esther",
    tributeExtra: "dont les bénédictions nous protègent",
    tributePerson: "Michèle Benhamou",
    shuttle: "Des navettes assureront le transfert entre l'Hôtel Mercure et le Château de la Gaude pour la soirée.",
  },

  // ── MUSIQUE ───────────────────────────────────────────────
  // Remplacer src par le chemin vers votre fichier MP3 dans /public/audio/
  // Ex : "/audio/od_yishama.mp3"
  music: {
    title: "So Easy (To Fall In Love) — Olivia Dean",
    src: "/audio/wedding_music.mp3",
    autoplay: false,
  },
}
