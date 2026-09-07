import type {
  ContestStatus,
  ContestStep,
  DateMilestone,
  DownloadAsset,
  FaqItem,
  InfoCard,
  PrizeTier,
  ShowcaseImage,
} from "@/app/coolkidscolor/_types/coolKidsColor";

export const COOL_KIDS_COLOR_ROUTE = "/coolkidscolor";
export const COOL_KIDS_COLOR_ASSET_BASE_PATH = "/assets/coolkidscolor/";
export const ETSY_SHOP_URL = "https://www.etsy.com/shop/RichFX";
export const RICHFX_HOME_URL = "https://rich-fx.ai";
export const COOL_KIDS_COLOR_STATUS: ContestStatus = "open";

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
  },
  {
    step: "2",
    title: "Color It",
    body: "Color it your way. Crayons, colored pencils, fiber-tip pens, gel pens, markers, and other normal coloring media are welcome.",
    accent: "orange",
  },
  {
    step: "3",
    title: "Snap It",
    body: "Take a clear photo or scan of the finished coloring page.",
    accent: "pink",
  },
  {
    step: "4",
    title: "Post It Publicly",
    body: "Post the completed artwork publicly on an approved RichFX social platform. If the artist is under 18, a parent or legal guardian should post or assist.",
    accent: "green",
  },
  {
    step: "5",
    title: "Tag + Hashtag",
    body: "Tag RichFX on the same platform and include #coolkidscolor. You need both to enter.",
    accent: "purple",
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
  },
  {
    label: "Runner-Up Prize",
    winners: "2 Runner-Up Winners",
    title: "RichFX Bring Your Entry To Life Experience",
    retailValue: "$99.00 each",
    body: "Your coloring becomes the star of its own movie.",
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
  },
  {
    holiday: "Day After Thanksgiving",
    label: "Entries Close",
    date: "November 27, 2026",
    machineDate: "2026-11-27",
  },
  {
    holiday: "Christmas Day",
    label: "Winners Announced",
    date: "December 25, 2026",
    machineDate: "2026-12-25",
  },
];

export const JUDGING_CRITERIA = [
  "Creativity",
  "Originality",
  "Use of color",
  "Imagination",
  "Effort",
  "Attention to detail",
  "Technique",
  "Overall visual impact",
  "Personality and interpretation",
  "Age-appropriate accomplishment",
] as const;

export const GOOD_TO_KNOW_ITEMS: InfoCard[] = [
  {
    title: "Free to enter",
    body: "No purchase necessary.",
  },
  {
    title: "Kids and adults can join",
    body: "#adultswelcome is the community cheer, not an extra entry hashtag.",
  },
  {
    title: "Original entries welcome",
    body: "Unlimited original entries are welcome, but every entry must be a genuinely new completed coloring.",
  },
  {
    title: "No duplicate submissions",
    body: "Do not resubmit the same artwork through reposts, crops, filters, or another platform.",
  },
  {
    title: "One prize maximum",
    body: "Each participant can win at most one prize.",
  },
  {
    title: "Keep your artwork",
    body: "Hold onto the original artwork until winners are announced.",
  },
  {
    title: "Public posts matter",
    body: "Public posts are necessary so RichFX can verify entries.",
  },
  {
    title: "Likes do not decide it",
    body: "Likes, shares, and popularity do not determine the winners.",
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
