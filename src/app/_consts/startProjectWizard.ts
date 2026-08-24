import type {
  StartProjectFormState,
  StartProjectOccasionOption,
  StartProjectOption,
  StartProjectProjectType,
  StartProjectStep,
} from "@/app/_types/startProjectWizard";
import { DEFAULT_IMAGE_STYLE_SAMPLE_SLUG } from "@/app/_consts/imageStyleSampler";

export const START_PROJECT_STEPS: StartProjectStep[] = [
  { id: "project", label: "Project" },
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
      originalPrice: "$29.99",
      priceRange: "$15.99-$19.99",
    },
    {
      id: "artwork",
      label: "AI artwork",
      description:
        "Original artwork polished into an AI render or motion loop.",
      iconKey: "artwork",
      originalPrice: "$149.99",
      priceRange: "$49.99-$119.99",
    },
    {
      id: "calendar",
      label: "Calendar",
      description: "A custom month-by-month art run.",
      iconKey: "calendar",
      originalPrice: "$199.99",
      priceRange: "$79.99-$149.99",
    },
    {
      id: "cartoon",
      label: "Cartoon",
      description: "A portrait reshaped into a playful character.",
      iconKey: "cartoon",
      originalPrice: "$69.99",
      priceRange: "$24.99-$49.99",
    },
    {
      id: "fantasy",
      label: "Fantasy hero",
      description: "A tabletop-inspired character portrait or scene.",
      iconKey: "fantasy",
      originalPrice: "$179.99",
      priceRange: "$59.99-$129.99",
    },
    {
      id: "game",
      label: "Game scene",
      description: "A game-world character or cinematic moment.",
      iconKey: "game",
      originalPrice: "$159.99",
      priceRange: "$49.99-$119.99",
    },
    {
      id: "movie",
      label: "Short movie",
      description: "A still image turned into a compact motion test.",
      iconKey: "movie",
      originalPrice: "$399.99",
      priceRange: "$149.99-$299.99",
    },
    {
      id: "movie-poster",
      label: "Movie Poster",
      description: "A cinematic one-sheet for a person, story, or idea.",
      iconKey: "moviePoster",
      originalPrice: "$129.99",
      priceRange: "$39.99-$89.99",
    },
    {
      id: "song",
      label: "Custom song",
      description: "Lyrics, audio, and album art from an idea.",
      iconKey: "song",
      originalPrice: "$699.99",
      priceRange: "$199.99-$499.99",
    },
    {
      id: "not-sure",
      label: "Not sure yet",
      description: "A starting idea that needs creative direction.",
      iconKey: "spark",
      priceRange: "$25.00-$250.00+",
    },
  ];

export const START_PROJECT_OCCASION_OPTIONS: StartProjectOccasionOption[] = [
  { id: "gift", label: "Gift" },
  { id: "holiday", label: "Holiday" },
  { id: "birthday", label: "Birthday" },
  { id: "vacation", label: "Vacation" },
  { id: "retirement", label: "Retirement" },
  { id: "wedding", label: "Wedding" },
  { id: "birth", label: "Birth" },
  { id: "just-because", label: "Just Because" },
  { id: "anniversary", label: "Anniversary" },
  { id: "graduation", label: "Graduation" },
  { id: "memorial", label: "Memorial" },
  { id: "business", label: "Business" },
  { id: "other", label: "Other" },
];

export const START_PROJECT_INITIAL_FORM: StartProjectFormState = {
  projectType: "",
  imageStyleSlug: DEFAULT_IMAGE_STYLE_SAMPLE_SLUG,
  occasionType: "",
  occasion: "",
  requiredText: "",
  deadline: "",
  notes: "",
  name: "",
  replyEmail: "",
  phone: "",
  allowSms: false,
};
