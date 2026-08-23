import type {
  StartProjectFormState,
  StartProjectMaterialId,
  StartProjectOption,
  StartProjectOutputId,
  StartProjectProjectType,
  StartProjectStep,
} from "@/app/_types/startProjectWizard";
import { DEFAULT_IMAGE_STYLE_SAMPLE_SLUG } from "@/app/_consts/imageStyleSampler";

export const START_PROJECT_STEPS: StartProjectStep[] = [
  { id: "project", label: "Project" },
  { id: "source", label: "Source" },
  { id: "details", label: "Details" },
  { id: "contact", label: "Contact" },
  { id: "email", label: "Email" },
];

export const START_PROJECT_PROJECT_OPTIONS: StartProjectOption<StartProjectProjectType>[] =
  [
    {
      id: "holiday-card",
      label: "Holiday card",
      description: "A polished seasonal card from a favorite photo.",
      iconKey: "holiday",
    },
    {
      id: "calendar",
      label: "Calendar",
      description: "A custom month-by-month art run.",
      iconKey: "calendar",
    },
    {
      id: "cartoon",
      label: "Cartoon",
      description: "A portrait reshaped into a playful character.",
      iconKey: "cartoon",
    },
    {
      id: "fantasy",
      label: "Fantasy hero",
      description: "A tabletop-inspired character portrait or scene.",
      iconKey: "fantasy",
    },
    {
      id: "game",
      label: "Game scene",
      description: "A game-world character or cinematic moment.",
      iconKey: "game",
    },
    {
      id: "movie",
      label: "Short movie",
      description: "A still image turned into a compact motion test.",
      iconKey: "movie",
    },
    {
      id: "song",
      label: "Custom song",
      description: "Lyrics, audio, and album art from an idea.",
      iconKey: "song",
    },
    {
      id: "not-sure",
      label: "Not sure yet",
      description: "A starting idea that needs creative direction.",
      iconKey: "spark",
    },
  ];

export const START_PROJECT_MATERIAL_OPTIONS: StartProjectOption<StartProjectMaterialId>[] =
  [
    {
      id: "photos",
      label: "Photos",
      description: "Portraits, group shots, pets, places, or objects.",
      iconKey: "spark",
    },
    {
      id: "reference",
      label: "Style reference",
      description: "A look, world, genre, or example you like.",
      iconKey: "cartoon",
    },
    {
      id: "names-dates",
      label: "Names and dates",
      description: "Personal copy that needs to appear in the piece.",
      iconKey: "calendar",
    },
    {
      id: "story",
      label: "Story idea",
      description: "A scene, character, joke, or tiny narrative.",
      iconKey: "movie",
    },
    {
      id: "lyrics",
      label: "Lyrics or phrases",
      description: "Lines, titles, or musical direction.",
      iconKey: "song",
    },
  ];

export const START_PROJECT_OUTPUT_OPTIONS: StartProjectOption<StartProjectOutputId>[] =
  [
    {
      id: "print-card",
      label: "Print card",
      description: "Card-ready image and text direction.",
      iconKey: "holiday",
    },
    {
      id: "calendar",
      label: "Calendar",
      description: "Month art, dates, and seasonal variations.",
      iconKey: "calendar",
    },
    {
      id: "image-set",
      label: "Image set",
      description: "Several polished still-image variations.",
      iconKey: "cartoon",
    },
    {
      id: "short-video",
      label: "Short video",
      description: "A compact cinematic motion render.",
      iconKey: "movie",
    },
    {
      id: "song",
      label: "Song",
      description: "Lyrics, voice, style, and finished audio.",
      iconKey: "song",
    },
    {
      id: "album-art",
      label: "Album art",
      description: "Cover art to wrap a song or gift.",
      iconKey: "spark",
    },
  ];

export const START_PROJECT_INITIAL_FORM: StartProjectFormState = {
  projectType: "",
  materials: [],
  outputs: [],
  featuredSubject: "",
  sourceNotes: "",
  styleDirection: "",
  imageStyleSlug: DEFAULT_IMAGE_STYLE_SAMPLE_SLUG,
  occasion: "",
  requiredText: "",
  deadline: "",
  notes: "",
  name: "",
  replyEmail: "",
  phone: "",
  allowSms: false,
};
