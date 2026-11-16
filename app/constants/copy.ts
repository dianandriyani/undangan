/**
 * All static UI copy (labels, buttons, aria-labels, fallbacks).
 *
 * Invitation-specific content (names, story, events, etc.) lives in
 * `invitations.ts`. Edit this file to change wording or translate the UI.
 */
export const COPY = {
  site: {
    title: 'Every story deserves its own form',
    description: 'An experimental digital invitation experience.',
    tagline: 'SEBUAH KISAH, SEBUAH PERAYAAN.'
  },

  seo: {
    pageTitle: (partnerOne: string, partnerTwo: string, title: string) =>
      `${partnerOne} & ${partnerTwo} — ${title}`,
  },

  errors: {
    invitationNotFound: 'Invitation not found',
  },

  opening: {
    ariaLabel: 'Pembuka undangan',
    eyebrow: 'ANDA DIUNDANG UNTUK MERAYAKAN',
    ampersand: '&',
    saveTheDate: 'CATAT TANGGALNYA',
    recipientLabel: 'UNDANGAN INI DITUJUKAN KEPADA',
    openButton: 'BUKA UNDANGAN',
    openButtonIcon: '↗',
    footerNote: 'DIBUAT DENGAN SEPENUH HATI',
  },

  cover: {
    fallbackCoupleNames: 'UNDANGAN UNTUK MERAYAKAN',
    fallbackTitle: 'EF—001',
    scrollHint: 'JELAJAHI KISAH KAMI ↓',
    fallbackDate: 'AN OPENING CHAPTER',
    country: 'INDONESIA',
    fallbackCity: 'JAKARTA',
    dateSeparator: ' · ',
  },

  countdown: {
    ariaLabel: 'Hitung mundur menuju hari pertunangan',
    heading: 'MENUJU HARI ISTIMEWA KAMI',
    headingExpired: 'HARI YANG DINANTI TELAH TIBA',
    expiredMessage: 'Hari ini, satu janji menjadi awal dari perjalanan baru.',
    units: {
      days: 'HARI',
      hours: 'JAM',
      minutes: 'MENIT',
      seconds: 'DETIK',
    },
  },

  event: {
    sectionDetail: 'HARI YANG DINANTI TELAH TIBA',
    directions: 'PETUNJUK ARAH ↗',
    directionsAriaLabel: (venue: string) => `Get directions to ${venue}`,
  },

  rsvp: {
    sectionDetail: 'YOUR REPLY',
    nameLabel: 'YOUR NAME',
    namePlaceholder: 'Full name',
    attendanceAriaLabel: 'Will you be attending?',
    attendanceLabel: 'WILL YOU BE THERE?',
    accept: 'JOYFULLY ACCEPTS',
    decline: 'REGRETFULLY DECLINES',
    guestsLabel: 'NUMBER OF GUESTS',
    decreaseGuests: 'Decrease guest count',
    increaseGuests: 'Increase guest count',
    maxGuests: (max: number) => `MAXIMUM ${max} GUESTS`,
    messageLabel: 'A LITTLE NOTE',
    messageOptional: '(OPTIONAL)',
    messagePlaceholder: 'Leave a message for the couple...',
    submit: 'SEND RESPONSE',
    submitIcon: '↗',
    demoNotice: 'DEMO ONLY · RESPONSES ARE NOT SAVED TO A SERVER',
    success: {
      eyebrow: 'RESPONSE RECEIVED',
      thankYou: 'Thank you,',
      guestsConfirmed: (count: number) =>
        `${count} ${count === 1 ? 'guest' : 'guests'} confirmed.`,
      closing: 'WE APPRECIATE YOUR REPLY.',
    },
  },

  closing: {
    eyebrow: 'HINGGA WAKTUNYA TIBA,',
  },

  music: {
    play: 'PUTAR MUSIK',
    pause: 'JEDA MUSIK',
    loading: 'MEMUAT...',
    unavailable: 'MUSIK TIDAK TERSEDIA',
    playAriaLabel: 'Putar musik latar',
    pauseAriaLabel: 'Jeda musik latar',
  },
  
  dashboard: {
    pageTitle: 'Kirim Undangan',
    eyebrow: 'DASHBOARD UNDANGAN',
    heading: 'Kirim undangan,\nsatu per satu.',
    description: 'Isi nama tamu dan nomor WhatsApp-nya. Link undangan personal akan dibuat otomatis.',
    nameLabel: 'NAMA TAMU',
    namePlaceholder: 'Contoh: Budi Santoso',
    phoneLabel: 'NOMOR WHATSAPP',
    phonePlaceholder: 'Contoh: 0812 3456 7890',
    phoneHint: 'Boleh diawali 0, 62, atau +62.',
    phoneInvalid: 'Nomor WhatsApp belum valid.',
    linkLabel: 'LINK UNDANGAN',
    linkPlaceholder: 'Link muncul setelah nama diisi',
    messageLabel: 'PRATINJAU PESAN',
    send: 'KIRIM KE WHATSAPP',
    sendIcon: '↗',

    /**
     * WhatsApp message template. `*text*` renders as bold in WhatsApp.
     */
    message: ({ guestName, link, coupleNames }: {
      guestName: string
      link: string
      coupleNames: string
    }) => [
      'Assalamu\'alaikum Warahmatullahi Wabarakatuh',
      '',
      'Kepada Yth.',
      `Bapak/Ibu/Saudara/i *${guestName}*`,
      '',
      'Tanpa mengurangi rasa hormat, dengan penuh sukacita kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan turut merayakan hari bahagia kami.',
      '',
      'Detail acara selengkapnya dapat dilihat melalui tautan undangan berikut:',
      link,
      '',
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.',
      '',
      '*Mohon maaf, tautan undangan ini kami tujukan secara khusus untuk Bapak/Ibu/Saudara/i. Dengan segala hormat, kami mohon kesediaannya untuk tidak membagikan tautan ini kepada pihak lain.*',
      '',
      'Atas perhatian dan doa restunya, kami ucapkan terima kasih.',
      '',
      'Wassalamu\'alaikum Warahmatullahi Wabarakatuh',
      '',
      'Kami yang berbahagia,',
      `*${coupleNames}*`,
    ].join('\n'),
  },
} as const
