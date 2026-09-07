import type {
  ContestStatus,
  ContestStep,
  DateMilestone,
  DownloadAsset,
  FaqItem,
  InfoCard,
  JudgingCriterion,
  PrizeTier,
  ShowcaseImage,
} from "@/app/coolkidscolor/_types/coolKidsColor";

export const COOL_KIDS_COLOR_ROUTE = "/coolkidscolor";
export const COOL_KIDS_COLOR_ASSET_BASE_PATH = "/assets/coolkidscolor/";
const CLIPART_ASSET_BASE_PATH = `${COOL_KIDS_COLOR_ASSET_BASE_PATH}clipart_assets/`;
export const ETSY_SHOP_URL = "https://www.etsy.com/shop/RichFX";
export const RICHFX_HOME_URL = "https://rich-fx.ai";
export const COOL_KIDS_COLOR_STATUS: ContestStatus = "open";

export const CLIPART_ASSETS = {
  headerSmilingStar: {
    src: `${CLIPART_ASSET_BASE_PATH}header_smiling_star.png`,
    alt: "",
    width: 89,
    height: 97,
    title: "Smiling Star",
  },
  headerRedPencil: {
    src: `${CLIPART_ASSET_BASE_PATH}header_red_pencil.png`,
    alt: "",
    width: 66,
    height: 61,
    title: "Red Pencil",
  },
  headerSmilingHeart: {
    src: `${CLIPART_ASSET_BASE_PATH}header_smiling_heart.png`,
    alt: "",
    width: 77,
    height: 72,
    title: "Smiling Heart",
  },
  crayonCup: {
    src: `${CLIPART_ASSET_BASE_PATH}crayon_cup.png`,
    alt: "",
    width: 106,
    height: 135,
    title: "Crayon Cup",
  },
  boyHoldingPhone: {
    src: `${CLIPART_ASSET_BASE_PATH}boy_holding_phone.png`,
    alt: "",
    width: 265,
    height: 233,
    title: "Artist Taking a Photo",
  },
  camera: {
    src: `${CLIPART_ASSET_BASE_PATH}camera.png`,
    alt: "",
    width: 107,
    height: 86,
    title: "Camera",
  },
  grownupChildTablet: {
    src: `${CLIPART_ASSET_BASE_PATH}grownup_child_tablet.png`,
    alt: "",
    width: 236,
    height: 325,
    title: "Grown-up Helping Artist",
  },
  hashtagCharacter: {
    src: `${CLIPART_ASSET_BASE_PATH}hashtag_character.png`,
    alt: "",
    width: 93,
    height: 108,
    title: "Hashtag Character",
  },
  calendarSep7: {
    src: `${CLIPART_ASSET_BASE_PATH}calendar_sep7.png`,
    alt: "",
    width: 86,
    height: 88,
    title: "September 7 Calendar",
  },
  pumpkinAutumnLeaves: {
    src: `${CLIPART_ASSET_BASE_PATH}pumpkin_autumn_leaves.png`,
    alt: "",
    width: 117,
    height: 90,
    title: "Pumpkin and Autumn Leaves",
  },
  christmasTree: {
    src: `${CLIPART_ASSET_BASE_PATH}christmas_tree.png`,
    alt: "",
    width: 89,
    height: 109,
    title: "Christmas Tree",
  },
  boyHoldingTrophy: {
    src: `${CLIPART_ASSET_BASE_PATH}boy_holding_trophy.png`,
    alt: "",
    width: 189,
    height: 226,
    title: "Artist Holding Trophy",
  },
  howToWinStarIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_star_icon.png`,
    alt: "",
    width: 39,
    height: 37,
    title: "Star Icon",
  },
  howToWinPaletteIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_palette_icon.png`,
    alt: "",
    width: 41,
    height: 41,
    title: "Paint Palette Icon",
  },
  howToWinThoughtIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_thought_icon.png`,
    alt: "",
    width: 42,
    height: 35,
    title: "Thought Icon",
  },
  howToWinTrophyIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_trophy_icon.png`,
    alt: "",
    width: 40,
    height: 29,
    title: "Small Trophy Icon",
  },
  howToWinMagnifierIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_magnifier_icon.png`,
    alt: "",
    width: 39,
    height: 37,
    title: "Magnifier Icon",
  },
  howToWinRedHeartIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_red_heart_icon.png`,
    alt: "",
    width: 37,
    height: 36,
    title: "Red Heart Icon",
  },
  howToWinPurpleHeartIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_purple_heart_icon.png`,
    alt: "",
    width: 31,
    height: 30,
    title: "Purple Heart Icon",
  },
  howToWinShieldIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_shield_icon.png`,
    alt: "",
    width: 31,
    height: 33,
    title: "Shield Icon",
  },
  howToWinSmileyIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}how_to_win_smiley_icon.png`,
    alt: "",
    width: 41,
    height: 40,
    title: "Smiley Icon",
  },
  coolThingsGiftIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}cool_things_gift_icon.png`,
    alt: "",
    width: 52,
    height: 46,
    title: "Gift Icon",
  },
  coolThingsKidsIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}cool_things_kids_icon.png`,
    alt: "",
    width: 61,
    height: 37,
    title: "Kids Icon",
  },
  coolThingsPaperPencilIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}cool_things_paper_pencil_icon.png`,
    alt: "",
    width: 56,
    height: 47,
    title: "Paper and Pencil Icon",
  },
  coolThingsNoDuplicateIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}cool_things_no_duplicate_icon.png`,
    alt: "",
    width: 52,
    height: 46,
    title: "No Duplicate Icon",
  },
  coolThingsLockIcon: {
    src: `${CLIPART_ASSET_BASE_PATH}cool_things_lock_icon.png`,
    alt: "",
    width: 50,
    height: 59,
    title: "Lock Icon",
  },
  grandPrizeTrophy: {
    src: `${CLIPART_ASSET_BASE_PATH}grand_prize_trophy.png`,
    alt: "",
    width: 89,
    height: 103,
    title: "Grand Prize Trophy",
  },
  personalizedColoringBook: {
    src: `${CLIPART_ASSET_BASE_PATH}personalized_coloring_book.png`,
    alt: "",
    width: 134,
    height: 110,
    title: "Personalized Coloring Book",
  },
  videoClapperboard: {
    src: `${CLIPART_ASSET_BASE_PATH}video_clapperboard.png`,
    alt: "",
    width: 85,
    height: 89,
    title: "Video Clapperboard",
  },
  giftBoxLarge: {
    src: `${CLIPART_ASSET_BASE_PATH}gift_box_large.png`,
    alt: "",
    width: 109,
    height: 100,
    title: "Gift Box",
  },
  bottomDragon: {
    src: `${CLIPART_ASSET_BASE_PATH}bottom_dragon.png`,
    alt: "",
    width: 183,
    height: 149,
    title: "Dragon Mascot",
  },
  bottomRobot: {
    src: `${CLIPART_ASSET_BASE_PATH}bottom_robot.png`,
    alt: "",
    width: 180,
    height: 167,
    title: "Robot Mascot",
  },
} as const satisfies Record<string, ShowcaseImage>;

export const HERO_ARTWORK: ShowcaseImage = {
  src: "/assets/coolkidscolor/coolkidscolor-2026-entry-sheet-preview.png",
  alt: "Official #coolkidscolor contest entry sheet with RichFX coloring artwork.",
  width: 612,
  height: 792,
  title: "Official Contest Page",
};

export const SHOWCASE_IMAGES: ShowcaseImage[] = [
  {
    src: "/assets/coolkidscolor/coolkidscolor-2026-entry-sheet-preview.png",
    alt: "Preview of the official printable #coolkidscolor contest page.",
    width: 612,
    height: 792,
    title: "Entry Sheet",
  },
  {
    src: "/assets/coolkidscolor/coolkidscolor-2026-offline-flyer-preview.png",
    alt: "Preview of the printable #coolkidscolor offline flyer.",
    width: 612,
    height: 792,
    title: "Offline Flyer",
  },
  {
    src: "/assets/coolkidscolor/coolkidscolor-2026-takeaway-card-preview.png",
    alt: "Preview of the #coolkidscolor 5 by 7 takeaway card with QR code.",
    width: 360,
    height: 504,
    title: "Takeaway Card",
  },
  {
    src: "/assets/coolkidscolor/style-crop-enter-win-footer.png",
    alt: "",
    width: 1000,
    height: 420,
    title: "Activity Guide Style",
  },
];

export const DOWNLOAD_ASSETS: DownloadAsset[] = [
  {
    id: "entry-sheet",
    title: "Official Contest Page",
    unavailableLabel: "Free entry sheet coming before launch",
    filename: "coolkidscolor-2026-entry-sheet.pdf",
    format: "PDF",
    purpose:
      "Print the official coloring page, color it your way, and use it as your contest entry.",
    eyebrow: "Start Here",
    available: true,
    includedInContestPack: true,
    preview: SHOWCASE_IMAGES[0],
    actions: [
      {
        id: "print",
        label: "Open & Print Contest Page",
        kind: "open",
        icon: "print",
        ariaLabel:
          "Open and print the official #coolkidscolor contest page PDF",
      },
      {
        id: "download",
        label: "Download Contest Page",
        kind: "download",
        icon: "download",
        ariaLabel: "Download the official #coolkidscolor contest page PDF",
      },
    ],
  },
  {
    id: "quick-start",
    title: "Quick Start Guide",
    unavailableLabel: "Quick Start PDF coming before launch",
    filename: "coolkidscolor-2026-quick-start.pdf",
    format: "PDF",
    purpose:
      "A refrigerator-door version of the steps, dates, and entry requirements.",
    eyebrow: "Fast Version",
    available: true,
    includedInContestPack: true,
    actions: [
      {
        id: "open",
        label: "Open Quick Start PDF",
        kind: "open",
        icon: "open",
        ariaLabel: "Open the #coolkidscolor quick start guide PDF",
      },
      {
        id: "download",
        label: "Download Quick Start PDF",
        kind: "download",
        icon: "download",
        ariaLabel: "Download the #coolkidscolor quick start guide PDF",
      },
    ],
  },
  {
    id: "rules",
    title: "Official Rules",
    unavailableLabel: "Official rules coming before launch",
    filename: "coolkidscolor-2026-official-rules.pdf",
    format: "PDF",
    purpose:
      "The authoritative eligibility, judging, prize, privacy, and platform terms.",
    eyebrow: "Parent Details",
    available: true,
    includedInContestPack: true,
    actions: [
      {
        id: "open",
        label: "Read Official Contest Rules",
        kind: "open",
        icon: "rules",
        ariaLabel: "Read the official #coolkidscolor contest rules PDF",
      },
      {
        id: "download",
        label: "Download Official Rules",
        kind: "download",
        icon: "download",
        ariaLabel: "Download the official #coolkidscolor contest rules PDF",
      },
    ],
  },
  {
    id: "contest-pack",
    title: "Complete Contest Pack",
    unavailableLabel: "Contest pack coming before launch",
    filename: "coolkidscolor-2026-contest-pack.zip",
    format: "ZIP",
    purpose:
      "One ZIP containing the Entry Sheet, Quick Start Guide, and Official Rules.",
    eyebrow: "Everything",
    available: true,
    actions: [
      {
        id: "download",
        label: "Download Complete Contest Pack",
        kind: "download",
        icon: "zip",
        ariaLabel: "Download the complete #coolkidscolor contest pack ZIP",
      },
    ],
  },
];

export const BONUS_DOWNLOAD_ASSETS: DownloadAsset[] = [
  {
    id: "offline-flyer",
    title: "Offline Flyer",
    unavailableLabel: "Offline flyer coming before launch",
    filename: "coolkidscolor-2026-offline-flyer.pdf",
    format: "PDF",
    purpose:
      "A letter-size flyer for classrooms, community boards, and family printouts.",
    eyebrow: "Share Offline",
    available: true,
    preview: SHOWCASE_IMAGES[1],
    actions: [
      {
        id: "open",
        label: "Open Offline Flyer",
        kind: "open",
        icon: "open",
        ariaLabel: "Open the #coolkidscolor offline flyer PDF",
      },
      {
        id: "download",
        label: "Download Offline Flyer",
        kind: "download",
        icon: "download",
        ariaLabel: "Download the #coolkidscolor offline flyer PDF",
      },
    ],
  },
  {
    id: "takeaway-card",
    title: "5x7 Takeaway Card",
    unavailableLabel: "Takeaway card coming before launch",
    filename: "coolkidscolor-2026-takeaway-card-5x7.pdf",
    format: "PDF",
    purpose:
      "A compact QR card for handing out at events or tucking into coloring books.",
    eyebrow: "Tiny Handout",
    available: true,
    preview: SHOWCASE_IMAGES[2],
    actions: [
      {
        id: "open",
        label: "Open Takeaway Card",
        kind: "open",
        icon: "open",
        ariaLabel: "Open the #coolkidscolor 5 by 7 takeaway card PDF",
      },
      {
        id: "download",
        label: "Download Takeaway Card",
        kind: "download",
        icon: "download",
        ariaLabel: "Download the #coolkidscolor 5 by 7 takeaway card PDF",
      },
    ],
  },
];

export const CONTEST_STEPS: ContestStep[] = [
  {
    step: "1",
    title: "Print It",
    body: "Download or print the official #coolkidscolor contest page.",
    accent: "blue",
    clipart: CLIPART_ASSETS.headerRedPencil,
  },
  {
    step: "2",
    title: "Color It",
    body: "Color it your way. Crayons, colored pencils, fiber-tip pens, gel pens, markers, and other normal coloring media are welcome.",
    accent: "orange",
    clipart: CLIPART_ASSETS.crayonCup,
  },
  {
    step: "3",
    title: "Snap It",
    body: "Take a clear photo or scan of the finished coloring page.",
    accent: "pink",
    clipart: CLIPART_ASSETS.camera,
  },
  {
    step: "4",
    title: "Post It Publicly",
    body: "Post the completed artwork publicly on an approved RichFX social platform. If the artist is under 18, a parent or legal guardian should post or assist.",
    accent: "green",
    clipart: CLIPART_ASSETS.grownupChildTablet,
  },
  {
    step: "5",
    title: "Tag + Hashtag",
    body: "Tag RichFX on the same platform and include #coolkidscolor. You need both to enter.",
    accent: "purple",
    clipart: CLIPART_ASSETS.hashtagCharacter,
  },
];

export const QUICK_FLOW = [
  "Print It",
  "Color It",
  "Snap It",
  "Post It",
  "Tag + #coolkidscolor",
] as const;

export const PRIZE_TIERS: PrizeTier[] = [
  {
    label: "Grand Prize",
    winners: "3 Grand Prize Winners",
    title:
      "A fully themed + RichFX-branded personalized coloring-book experience.",
    retailValue: "$99.97 each",
    body: "You become the star of your own coloring book.",
    clipart: CLIPART_ASSETS.personalizedColoringBook,
    bodyLink: {
      label: "coloring book",
      href: "https://www.etsy.com/listing/4563805859/personalized-coloring-book-from-your",
    },
  },
  {
    label: "Runner-Up Prize",
    winners: "2 Runner-Up Winners",
    title: "RichFX Bring Your Entry To Life Experience",
    retailValue: "$99.00 each",
    body: "Your coloring becomes the star of its own movie.",
    clipart: CLIPART_ASSETS.videoClapperboard,
    bodyLink: {
      label: "own movie",
      href: "https://www.etsy.com/listing/4561500288/custom-ai-artwork-rendering-turn-your",
    },
    callout:
      "Your colors. Your creativity. Your entry. RichFX brings it to life.",
  },
];

export const DATE_MILESTONES: DateMilestone[] = [
  {
    holiday: "Labor Day",
    label: "Contest Opens",
    date: "September 7, 2026",
    machineDate: "2026-09-07",
    icon: "labor",
    clipart: CLIPART_ASSETS.calendarSep7,
  },
  {
    holiday: "Day After Thanksgiving",
    label: "Entries Close",
    date: "November 27, 2026",
    machineDate: "2026-11-27",
    icon: "thanksgiving",
    clipart: CLIPART_ASSETS.pumpkinAutumnLeaves,
  },
  {
    holiday: "Christmas Day",
    label: "Winners Announced",
    date: "December 25, 2026",
    machineDate: "2026-12-25",
    icon: "christmas",
    clipart: CLIPART_ASSETS.christmasTree,
  },
];

export const JUDGING_CRITERIA: JudgingCriterion[] = [
  {
    label: "Creativity",
    icon: "spark",
    clipart: CLIPART_ASSETS.howToWinStarIcon,
  },
  {
    label: "Originality",
    icon: "fingerprint",
    clipart: CLIPART_ASSETS.howToWinShieldIcon,
  },
  {
    label: "Use of color",
    icon: "palette",
    clipart: CLIPART_ASSETS.howToWinPaletteIcon,
  },
  {
    label: "Imagination",
    icon: "imagination",
    clipart: CLIPART_ASSETS.howToWinThoughtIcon,
  },
  {
    label: "Effort",
    icon: "effort",
    clipart: CLIPART_ASSETS.howToWinTrophyIcon,
  },
  {
    label: "Attention to detail",
    icon: "detail",
    clipart: CLIPART_ASSETS.howToWinMagnifierIcon,
  },
  {
    label: "Technique",
    icon: "technique",
    clipart: CLIPART_ASSETS.headerRedPencil,
  },
  {
    label: "Overall visual impact",
    icon: "impact",
    clipart: CLIPART_ASSETS.howToWinRedHeartIcon,
  },
  {
    label: "Personality and interpretation",
    icon: "personality",
    clipart: CLIPART_ASSETS.howToWinPurpleHeartIcon,
  },
  {
    label: "Age-appropriate accomplishment",
    icon: "age",
    clipart: CLIPART_ASSETS.howToWinSmileyIcon,
  },
];

export const GOOD_TO_KNOW_ITEMS: InfoCard[] = [
  {
    title: "Free to enter",
    body: "No purchase necessary.",
    icon: "free",
    accent: "green",
    clipart: CLIPART_ASSETS.coolThingsGiftIcon,
  },
  {
    title: "Kids and adults can join",
    body: "#adultswelcome is the community cheer, not an extra entry hashtag.",
    icon: "people",
    accent: "blue",
    clipart: CLIPART_ASSETS.coolThingsKidsIcon,
  },
  {
    title: "Original entries welcome",
    body: "Unlimited original entries are welcome, but every entry must be a genuinely new completed coloring.",
    icon: "original",
    accent: "orange",
    clipart: CLIPART_ASSETS.coolThingsPaperPencilIcon,
  },
  {
    title: "No duplicate submissions",
    body: "Do not resubmit the same artwork through reposts, crops, filters, or another platform.",
    icon: "duplicate",
    accent: "pink",
    clipart: CLIPART_ASSETS.coolThingsNoDuplicateIcon,
  },
  {
    title: "One prize maximum",
    body: "Each participant can win at most one prize.",
    icon: "winner",
    accent: "orange",
    clipart: CLIPART_ASSETS.grandPrizeTrophy,
  },
  {
    title: "Keep your artwork",
    body: "Hold onto the original artwork until winners are announced.",
    icon: "keep",
    accent: "purple",
    clipart: CLIPART_ASSETS.coolThingsLockIcon,
  },
  {
    title: "Public posts matter",
    body: "Public posts are necessary so RichFX can verify entries.",
    icon: "public",
    accent: "blue",
    clipart: CLIPART_ASSETS.hashtagCharacter,
  },
  {
    title: "Likes do not decide it",
    body: "Likes, shares, and popularity do not determine the winners.",
    icon: "likes",
    accent: "pink",
    clipart: CLIPART_ASSETS.howToWinShieldIcon,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is it really free?",
    answer: "Yes. The contest is free to enter and no purchase is necessary.",
  },
  {
    question: "Can adults enter?",
    answer:
      "Yes. Kids and adults can join. #adultswelcome is part of the community tagline.",
  },
  {
    question: "Can I enter more than once?",
    answer:
      "Yes, unlimited original entries are welcome. Each entry should be a new completed coloring.",
  },
  {
    question: "What coloring tools can I use?",
    answer:
      "Crayons, colored pencils, fiber-tip pens, gel pens, markers, and other normal coloring media are welcome.",
  },
  {
    question: "Do likes or shares help me win?",
    answer:
      "No. This is a skill-based creative contest, and likes or popularity do not decide the winners.",
  },
  {
    question: "What if I am under 18?",
    answer:
      "A parent or legal guardian should handle or assist with the public social-media posting.",
  },
  {
    question: "Can I submit the same finished picture twice?",
    answer:
      "No. Do not submit the exact same finished artwork twice through reposts, crops, filters, or another platform.",
  },
  {
    question: "Do I need to keep the original artwork?",
    answer: "Yes. Keep your original artwork until winners are announced.",
  },
];
