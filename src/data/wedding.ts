// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE — all site content lives here.
// Details sourced from both families' printed invitation cards.
// ─────────────────────────────────────────────────────────────

export interface WeddingEvent {
  id: string;
  /** Small pill label above the card, e.g. "Nikah Ceremony" */
  badge: string;
  arabicName?: string;
  /** Illustration to show on the card */
  motif: 'mosque' | 'hall';
  day: string;
  date: string;
  time: string;
  hijri?: string;
  venue: string;
  address: string;
  mapUrl: string;
  note?: string;
}

export const wedding = {
  couple: {
    groom: {
      name: 'Syed Salman',
      degree: 'B.E. · Software Engineer',
      parents: 'Mr. Syed Ghouse Ahamed & Mrs. Shabeena Banu',
      parentsDetail: 'S.N.G. Traders, Vegetable Merchant, A.P.M.C. Market, Arsikere',
      lineage: [
        'Paternal Grand S/o. Late Syed Nisar Ahamed & Hajira Bi',
        'Maternal Grand S/o. Syed Jalal & Sajida Khanum',
      ],
    },
    bride: {
      name: 'Umme Haani',
      degree: 'B.C.A.',
      parents: 'Mr. Mohammed Yousuff & Mrs. Tabassum Unnisa',
      parentsDetail: 'K.K.H. Store, Santhepet, Arsikere',
      lineage: [
        'Paternal Grand D/o. Late K.K.H. Abdul Khaleel Saheb',
        'Maternal Grand D/o. Late Mahaboob Shariff Saheb',
      ],
    },
    shortNames: 'Salman & Haani',
    monogram: 'S · H',
  },

  // Both families invite together
  hosts: {
    intro: 'With the blessings of Almighty Allah, the families of',
    groomSide: 'Mr. Syed Ghouse Ahamed & Mrs. Shabeena Banu',
    brideSide: 'Mr. Mohammed Yousuff & Mrs. Tabassum Unnisa',
    line: 'solicit your blessings & request the honour of your presence with family and friends on the auspicious occasion of the Nikah & Valima of their beloved children',
  },

  // Dua printed on the card — Jami` at-Tirmidhi 1091
  dua: {
    arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    transliteration: "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fi khayr",
    translation:
      '“May Allah bless you, shower His blessings upon you, and unite you both in goodness.”',
    source: "JAMI' AT-TIRMIDHI 1091",
  },

  // The main date (Nikah) — used by the scratch reveal + countdown
  bigDay: {
    iso: '2026-10-11T12:30:00+05:30',
    display: '11 . 10 . 2026',
    scratch: { day: '11th', month: 'October', year: '2026' },
  },

  events: [
    {
      id: 'nikah',
      badge: 'Nikah Ceremony',
      arabicName: 'نِكاح',
      motif: 'mosque',
      day: 'Sunday',
      date: '11th October 2026',
      time: '12:30 PM',
      hijri: '29 Rabi us-Sani, 1448 Hijri',
      venue: 'Masjid-e-Usmaniya (Markaz)',
      address: 'Kendad Gundi Road, Santhepet, Tippu Nagar, Arasikere',
      mapUrl: 'https://share.google/Giq9yXOuLdI0i0S61',
      note: 'Insha Allah',
    },
    {
      id: 'nikah-lunch',
      badge: 'Dawat-e-Nikah · Lunch',
      motif: 'hall',
      day: 'Sunday',
      date: '11th October 2026',
      time: 'After Nikah',
      venue: 'S.M.J. Samudaya Bhavana',
      address: 'Huliyar Road, Opp. Jamia Masjid, Arasikere – 573103',
      mapUrl: 'https://share.google/Gc9dyH8JIgzApFll4',
    },
    {
      id: 'valima',
      badge: 'Valima · Lunch',
      arabicName: 'وليمة',
      motif: 'hall',
      day: 'Tuesday',
      date: '13th October 2026',
      time: '1:30 PM Onwards · After Zuhr',
      hijri: '1 Jumada al-Awwal, 1448 Hijri',
      venue: 'S.M.J. Samudaya Bhavana',
      address: 'Huliyar Road, Opp. Jamia Masjid, Arasikere – 573103',
      mapUrl: 'https://share.google/Gc9dyH8JIgzApFll4',
    },
  ] satisfies WeddingEvent[],

  rsvp: {
    heading: 'Will You Join Our Big Day?',
    sub: 'Join us as we step into our forever',
    // WhatsApp number (country code + number, digits only) for RSVP messages.
    whatsapp: '918095693528',
  },

  compliments: {
    heading: 'With Best Compliments From',
    names: ['Brother : S.N.R. Syed Abdul Rahaman (Babu) & Family', 'Relatives & Friends'],
    closing: '✦ Near & Dear ✦',
  },

  thankYou: {
    line: 'May your presence be accompanied by your heartfelt duas.',
  },

  // Optional background nasheed — drop a file at public/audio/nasheed.mp3
  // and the floating music button will appear automatically.
  music: '/audio/nasheed.mp3',

  meta: {
    title: 'Salman & Haani — Wedding Invitation',
    description:
      'With the blessings of Almighty Allah, the families invite you to the Nikah & Valima of Syed Salman and Umme Haani — 11th & 13th October 2026, Arasikere.',
  },
};
