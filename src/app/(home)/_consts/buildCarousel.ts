import type {
  BuildSectionKey,
  BuildSectionOption,
} from "@/app/(home)/_types/buildCarousel";

export const BUILD_SECTION_OPTIONS_BY_KEY: Record<
  BuildSectionKey,
  BuildSectionOption
> = {
  "holiday-card": {
    key: "holiday-card",
    label: "AI Holiday Cards",
    shortLabel: "Holiday Cards",
    shortText: "Turn a favorite photo into a polished seasonal card.",
  },
  "image-style-sampler": {
    key: "image-style-sampler",
    label: "Supported Image Types",
    shortLabel: "Image Types",
    shortText:
      "See the variety of image types RichFX can create from a single photo.",
  },
  "cartoon-rendering": {
    key: "cartoon-rendering",
    label: "AI Yourself into a Cartoon",
    shortLabel: "AI Cartoon",
    shortText:
      "Turn a headshot into a custom cartoon character, scene, and motion beat.",
  },
  "dnd-character-rendering": {
    key: "dnd-character-rendering",
    label: "AI Yourself as a DnD Character",
    shortLabel: "DnD Character",
    shortText:
      "Transform a portrait into a fantasy tabletop character with cinematic motion.",
  },
  "game-rendering": {
    key: "game-rendering",
    label: "AI Yourself into a Game",
    shortLabel: "AI Game",
    shortText:
      "Reimagine yourself as a game-inspired character with cinematic motion.",
  },
  "video-movie-rendering": {
    key: "video-movie-rendering",
    label: "AI Yourself into a Movie",
    shortLabel: "AI Movie",
    shortText:
      "Put yourself into a short movie with AI-generated video and audio from a single photo/storyboard.",
  },
  calendar: {
    key: "calendar",
    label: "Create Custom Calendars",
    shortLabel: "Calendars",
    shortText:
      "Transform your favorite photos into a custom calendar with character, setting, and typography.",
  },
  "ai-song": {
    key: "ai-song",
    label: "AI Songs",
    shortLabel: "Songs",
    shortText:
      "Create lyrics, audio, and album art from your photo or lyrical idea.",
  },
};

export const BUILD_CAROUSEL_PREVIEW_SIZES = "69px";
