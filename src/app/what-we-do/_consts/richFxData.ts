import type { RichFxImageDimensions } from "@/app/what-we-do/_types/richFx";

export const DEFAULT_IMAGE_DIMENSIONS: RichFxImageDimensions = {
  width: 1200,
  height: 900,
};

export const IMAGE_DIMENSIONS_BY_PATH: Record<string, RichFxImageDimensions> = {
  "/assets/23AF43D5-745F-4A76-A5B3-94B733A60A3C.png": {
    width: 1672,
    height: 941,
  },
  "/assets/BC1631EC-DE1F-4F55-99E9-C38EC3877744.png": {
    width: 1402,
    height: 1122,
  },
  "/assets/portfolio/MattRyman_Krangor/IMG_5244.PNG": {
    width: 1170,
    height: 2532,
  },
  "/assets/portfolio/MattRyman_Krangor/02A69E48-7048-408D-94C5-7860CF8A60DD.PNG":
    {
      width: 1122,
      height: 1402,
    },
  "/assets/portfolio/MattRyman_Krangor/52BBFAB7-C230-4D56-961D-0B4E5C6B0DB8.PNG":
    {
      width: 1672,
      height: 941,
    },
  "/assets/portfolio/MattRyman_Krangor/D12A1792-8DCB-467C-A25B-5D99BF72CB51.PNG":
    {
      width: 1672,
      height: 941,
    },
  "/assets/portfolio/MattRyman_Krangor/0A341EE2-518A-4F61-8D74-E41B85C2E802.PNG":
    {
      width: 1122,
      height: 1402,
    },
  "/assets/portfolio/MattRyman_Krangor/B87F8B13-D29E-4597-9033-D9DA1018E625.PNG":
    {
      width: 1086,
      height: 1448,
    },
  "/personal/images/ai-lab/kratos/stylistic.png": { width: 1122, height: 1402 },
  "/assets/portfolio/RichardFranksIn/RichardFranksIn_Alien/stylized.png": {
    width: 1536,
    height: 1024,
  },
  "/personal/images/ai-lab/he-man/stylistic.png": { width: 1024, height: 1536 },
  "/personal/images/ai-lab/stay-puffy/stylistic.png": {
    width: 1448,
    height: 1086,
  },
  "/personal/images/ai-lab/dragonballz/stylistic.png": {
    width: 1536,
    height: 1024,
  },
  "/personal/images/ai-lab/mad-hatter/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/zombie-chaos/stylistic.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-rock/book-cover.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-rock/characters/mara.png": {
    width: 1025,
    height: 1534,
  },
  "/personal/images/ai-lab/the-rock/characters/mercer.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-rock/characters/noah.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-rock/characters/tane.png": {
    width: 1024,
    height: 1536,
  },
  "/personal/images/ai-lab/the-rock/locations/drilling rig at uluru base.png": {
    width: 1536,
    height: 1024,
  },
  "/personal/images/ai-lab/the-rock/locations/geological scan of uluru void.png":
    {
      width: 1536,
      height: 1024,
    },
  "/personal/images/ai-lab/the-rock/locations/uluru research control room.png":
    {
      width: 1536,
      height: 1024,
    },
  "/personal/images/ai-lab/the-rock/locations/uluru-am-dig-site.png": {
    width: 1536,
    height: 1024,
  },
  "/assets/portfolio/Songs/outta-time/album.png": { width: 1024, height: 1024 },
};

export const BRAND_PLATE_IMAGE = {
  src: "/assets/23AF43D5-745F-4A76-A5B3-94B733A60A3C.png",
  alt: "RichFX Studios brand plate",
} as const;

export const SERVICE_PLATE_IMAGE = {
  src: "/assets/BC1631EC-DE1F-4F55-99E9-C38EC3877744.png",
  alt: "RichFX services brand plate",
} as const;

export const THE_ROCK_LAB_SLUG = "the-rock";
export const AUDIO_FEATURE_LAB_SLUG = "outta-time";
export const VFX_FEATURE_LAB_SLUG = "alien";

export const GATEWAY_EXPERIMENT_SLUGS = [
  "emerald-legion",
  "caterpillar",
  "gatecrasher",
  "kratos",
  "he-man",
  "stay-puffy",
  "dragonballz",
  "mad-hatter",
  "zombie-chaos",
] as const;
