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
  /** UTC start/end (YYYYMMDDTHHMMSSZ) for the Add-to-Calendar link */
  gcalStart: string;
  gcalEnd: string;
  note?: string;
}

export const wedding = {
  couple: {
    groom: {
      name: 'Syed Salman',
      degree: 'B.E.',
      parents: 'Mr. Syed Ghouse Ahamed & Mrs. Shabeena Banu',
      parentsDetail: 'S.N.G. Traders, Vegetable Merchant, A.P.M.C. Market, Arsikere',
      lineage: [
        'Paternal Grand S/o. Late Syed Nisar Ahamed & Hajira Bi',
        'Maternal Grand S/o. Syed Jalal & Sajida Khanum',
      ],
    },
    bride: {
      name: 'Umme Hani',
      degree: 'B.C.A.',
      parents: 'Mr. Mohammed Yousuff & Mrs. Tabassum Unnisa',
      parentsDetail: 'K.K.H. Store, Santhepet, Arsikere',
      lineage: [
        'Paternal Grand D/o. Late K.K.H. Abdul Khaleel Saheb',
        'Maternal Grand D/o. Late Mahaboob Shariff Saheb',
      ],
    },
    shortNames: 'Salman & Hani',
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
      address: 'Masjid Usman Bin Affan, Kendad Gundi Rd, Santhepet, Tippu Nagar, Arasikere, Karnataka 573103',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Masjid%20Usman%20Bin%20Affan%20%28Markaz%29%2C%20Kendad%20Gundi%20Rd%2C%20Santhepet%2C%20Tippu%20Nagar%2C%20Arasikere%2C%20Karnataka%20573103',
      gcalStart: '20261011T070000Z', // 12:30 PM IST
      gcalEnd: '20261011T093000Z', // 3:00 PM IST
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
      address: 'Mutton Market Road, Tippu Nagar, Arasikere, Karnataka 573103',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=SMJ%20SAMUDAYA%20BHAVANA%2C%208775%2BJ62%2C%20Mutton%20Market%20Road%2C%20Tippu%20Nagar%2C%20Arasikere%2C%20Karnataka%20573103',
      gcalStart: '20261011T080000Z', // 1:30 PM IST
      gcalEnd: '20261011T103000Z', // 4:00 PM IST
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
      address: 'Mutton Market Road, Tippu Nagar, Arasikere, Karnataka 573103',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=SMJ%20SAMUDAYA%20BHAVANA%2C%208775%2BJ62%2C%20Mutton%20Market%20Road%2C%20Tippu%20Nagar%2C%20Arasikere%2C%20Karnataka%20573103',
      gcalStart: '20261013T080000Z', // 1:30 PM IST
      gcalEnd: '20261013T110000Z', // 4:30 PM IST
    },
  ] satisfies WeddingEvent[],

  // Day-of schedule shown as a vertical timeline
  program: {
    eyebrow: 'The Celebration',
    heading: 'Program Timeline',
    days: [
      {
        title: 'Nikah Day — Sunday, 11th October 2026',
        items: [
          { time: '12:30 PM', label: 'Nikah Ceremony', sub: 'Masjid-e-Usmaniya (Markaz) · Insha Allah' },
          { time: 'After Nikah', label: 'Dawat-e-Nikah · Lunch', sub: 'S.M.J. Samudaya Bhavana' },
        ],
      },
      {
        title: 'Valima — Tuesday, 13th October 2026',
        items: [
          { time: '1:30 PM', label: 'Valima Lunch · After Zuhr', sub: 'S.M.J. Samudaya Bhavana' },
        ],
      },
    ],
  },

  rsvp: {
    heading: 'Will You Join Our Big Day?',
    sub: 'Join us as we step into our forever',
    // WhatsApp number (country code + number, digits only) for RSVP messages.
    whatsapp: '918095693528',
  },

  thankYou: {
    line: 'May your presence be accompanied by your heartfelt duas.',
  },

  // Optional background nasheed — drop a file at public/audio/nasheed.mp3
  // and the floating music button will appear automatically.
  music: '/audio/nasheed.mp3',

  meta: {
    title: 'Salman & Hani — Wedding Invitation',
    description:
      'With the blessings of Almighty Allah, the families invite you to the Nikah & Valima of Syed Salman and Umme Hani — 11th & 13th October 2026, Arasikere.',
  },
};
