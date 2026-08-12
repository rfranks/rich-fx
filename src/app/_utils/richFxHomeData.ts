import { aiLab } from "@/consts/richFx";
import type {
  RichFxAudioFeature,
  RichFxExperimentFeature,
  RichFxImageAsset,
  RichFxPipelineStage,
  RichFxVideoAsset,
} from "@/app/_types/richFxHome";

type AILabRecord = (typeof aiLab.items)[number] & Record<string, unknown>;

const imageDimensionsByPath: Record<
  string,
  Pick<RichFxImageAsset, "width" | "height">
> = {
  "/rich-fx/23AF43D5-745F-4A76-A5B3-94B733A60A3C.png": {
    width: 1672,
    height: 941,
  },
  "/rich-fx/BC1631EC-DE1F-4F55-99E9-C38EC3877744.png": {
    width: 1402,
    height: 1122,
  },
  "/rich-fx/portfolio/MattRyman_Krangor/IMG_5244.PNG": {
    width: 1170,
    height: 2532,
  },
  "/rich-fx/portfolio/MattRyman_Krangor/02A69E48-7048-408D-94C5-7860CF8A60DD.PNG":
    {
      width: 1122,
      height: 1402,
    },
  "/rich-fx/portfolio/MattRyman_Krangor/52BBFAB7-C230-4D56-961D-0B4E5C6B0DB8.PNG":
    {
      width: 1672,
      height: 941,
    },
  "/rich-fx/portfolio/MattRyman_Krangor/D12A1792-8DCB-467C-A25B-5D99BF72CB51.PNG":
    {
      width: 1672,
      height: 941,
    },
  "/rich-fx/portfolio/MattRyman_Krangor/0A341EE2-518A-4F61-8D74-E41B85C2E802.PNG":
    {
      width: 1122,
      height: 1402,
    },
  "/rich-fx/portfolio/MattRyman_Krangor/B87F8B13-D29E-4597-9033-D9DA1018E625.PNG":
    {
      width: 1086,
      height: 1448,
    },
  "/personal/images/ai-lab/kratos/stylistic.png": { width: 1122, height: 1402 },
  "/rich-fx/portfolio/RichardFranksIn/RichardFranksIn_Alien/stylized.png": {
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
  "/personal/images/ai-lab/outta-time/album.png": { width: 1024, height: 1024 },
};

const readString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
};

const findLab = (slug: string): AILabRecord => {
  const item = aiLab.items.find((candidate) => candidate.slug === slug);
  if (!item) {
    throw new Error(`[rich-fx-home] Missing AI lab item: ${slug}`);
  }
  return item as AILabRecord;
};

const imageAsset = (src: string, alt: string): RichFxImageAsset => {
  const dimensions = imageDimensionsByPath[src] ?? { width: 1200, height: 900 };
  return {
    src,
    alt,
    ...dimensions,
  };
};

const videoAsset = (
  src: string | undefined,
  label: string,
  poster?: string,
): RichFxVideoAsset => {
  if (!src) {
    throw new Error(`[rich-fx-home] Missing video asset for ${label}`);
  }
  return { src, label, poster };
};

const experimentFeature = (slug: string): RichFxExperimentFeature => {
  const item = findLab(slug);
  const previewPath =
    readString(item, "stylizedRendering") ||
    readString(item, "bookCoverImage") ||
    readString(item, "songAlbumImage") ||
    readString(item, "realisticImage");
  if (!previewPath) {
    throw new Error(`[rich-fx-home] Missing preview media for ${slug}`);
  }

  return {
    slug,
    title: item.title,
    shortText: readString(item, "shortText") ?? item.title,
    blurb: readString(item, "blurb") ?? "",
    previewImage: imageAsset(previewPath, `${item.title} preview`),
    beforeImage: readString(item, "realisticImage")
      ? imageAsset(
          readString(item, "realisticImage")!,
          `${item.title} source image`,
        )
      : undefined,
    stylizedImage: readString(item, "stylizedRendering")
      ? imageAsset(
          readString(item, "stylizedRendering")!,
          `${item.title} stylized rendering`,
        )
      : undefined,
    video: readString(item, "movieRendering")
      ? videoAsset(
          readString(item, "movieRendering"),
          `${item.title} motion render`,
          previewPath,
        )
      : undefined,
  };
};

const theRock = findLab("the-rock");
const outtaTime = findLab("outta-time");

export const richFxBrandPlate = imageAsset(
  "/rich-fx/23AF43D5-745F-4A76-A5B3-94B733A60A3C.png",
  "RichFX Studios brand plate",
);

export const richFxServicePlate = imageAsset(
  "/rich-fx/BC1631EC-DE1F-4F55-99E9-C38EC3877744.png",
  "RichFX services brand plate",
);

export const richFxVfxFeature = experimentFeature("alien");

export const richFxDndStages: RichFxPipelineStage[] = [
  {
    key: "reference",
    eyebrow: "01 / Reference",
    title: "A real person becomes the anchor for a fantasy hero.",
    body: "The stage starts with a grounded reference so the transformation can keep a human center while the world gets more mythic.",
    image: imageAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/IMG_5244.PNG",
      "Original portrait reference used for the Krangor fantasy VFX experiment",
    ),
  },
  {
    key: "character",
    eyebrow: "02 / Character",
    title:
      "Identity, armor, weapon, and palette lock into a repeatable design.",
    body: "Krangor becomes a production character: readable silhouette, ornate holy-avenger weapon, warm metal, white cloth, and ember-lit atmosphere.",
    image: imageAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/02A69E48-7048-408D-94C5-7860CF8A60DD.PNG",
      "Krangor character poster with armor and holy avenger weapon",
    ),
  },
  {
    key: "storyboard",
    eyebrow: "03 / Storyboard",
    title: "The shot list turns the character into a scene.",
    body: "Beat boards sketch the action rhythm, camera language, lighting notes, and emotional escalation before the sequence moves.",
    image: imageAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/52BBFAB7-C230-4D56-961D-0B4E5C6B0DB8.PNG",
      "Storyboard prompt board for Krangor battling the red dragon",
    ),
  },
  {
    key: "score",
    eyebrow: "04 / Score",
    title: "The cinematic audio score gives the reveal its pulse.",
    body: "The score is treated as part of the VFX stage, not an afterthought: mood, scale, and timing become another production layer.",
    image: imageAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/D12A1792-8DCB-467C-A25B-5D99BF72CB51.PNG",
      "Storyboard prompt board for Krangor discovering an ancient relic",
    ),
    audio: {
      src: "/rich-fx/portfolio/MattRyman_Krangor/krangor-the-holy.mp3",
      label: "Krangor the Holy cinematic score",
      note: "Cinematic score reveal",
    },
  },
  {
    key: "keyframe",
    eyebrow: "05 / Keyframe",
    title: "The final frame sells the scale of the world.",
    body: "A poster-like keyframe packages the character, threat, environment, and graphic tone into a single production target.",
    image: imageAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/B87F8B13-D29E-4597-9033-D9DA1018E625.PNG",
      "Krangor fantasy comic cover keyframe with red dragon",
    ),
  },
  {
    key: "motion",
    eyebrow: "06 / Motion",
    title: "The stage resolves into a motion test.",
    body: "The moving plate stays lightweight on the page until requested by the viewport, preserving the cinematic reveal without preloading the full file.",
    video: videoAsset(
      "/rich-fx/portfolio/MattRyman_Krangor/Matt Ryman.MOV",
      "Krangor fantasy VFX motion test",
      "/rich-fx/portfolio/MattRyman_Krangor/B87F8B13-D29E-4597-9033-D9DA1018E625.PNG",
    ),
  },
];

export const richFxPipelineStages: RichFxPipelineStage[] = [
  {
    key: "story",
    eyebrow: "01 / Story",
    title: "A source idea becomes a production spine.",
    body:
      readString(theRock, "manuscriptCaption") ??
      "A manuscript draft anchors the world before shots, trailers, and episodes branch outward.",
    image: imageAsset(
      readString(theRock, "bookCoverImage")!,
      `${theRock.title} book and limited-series cover`,
    ),
  },
  {
    key: "world",
    eyebrow: "02 / World",
    title: "The environment starts carrying the plot.",
    body: "Locations, atmosphere, and visual continuity turn the concept into a place the camera can revisit.",
    image: imageAsset(
      "/personal/images/ai-lab/the-rock/locations/uluru-am-dig-site.png",
      "Uluru dig site concept environment",
    ),
  },
  {
    key: "character",
    eyebrow: "03 / Character",
    title: "Character design gives the world a point of view.",
    body: "Recurring figures, wardrobe, and visual roles make a generated sequence feel less disposable.",
    image: imageAsset(
      "/personal/images/ai-lab/the-rock/characters/mara.png",
      "Mara character design sheet",
    ),
  },
  {
    key: "sequence",
    eyebrow: "04 / Sequence",
    title: "The trailer turns the system into motion.",
    body:
      readString(theRock, "trailerCaption") ??
      "The visual plan condenses into a motion beat that can be extended into an episodic arc.",
    video: videoAsset(
      readString(theRock, "trailerMovie"),
      `${theRock.title} trailer`,
      readString(theRock, "bookCoverImage"),
    ),
  },
];

export const richFxWorldImages: RichFxImageAsset[] = [
  imageAsset(
    "/personal/images/ai-lab/the-rock/characters/mara.png",
    "Mara character",
  ),
  imageAsset(
    "/personal/images/ai-lab/the-rock/characters/mercer.png",
    "Mercer character",
  ),
  imageAsset(
    "/personal/images/ai-lab/the-rock/characters/noah.png",
    "Noah character",
  ),
  imageAsset(
    "/personal/images/ai-lab/the-rock/characters/tane.png",
    "Tane character",
  ),
  imageAsset(
    "/personal/images/ai-lab/the-rock/locations/geological scan of uluru void.png",
    "Geological scan environment concept",
  ),
  imageAsset(
    "/personal/images/ai-lab/the-rock/locations/uluru research control room.png",
    "Uluru research control room environment concept",
  ),
];

export const richFxAudioFeature: RichFxAudioFeature = {
  title: outtaTime.title,
  body:
    readString(outtaTime, "shortText") ?? readString(outtaTime, "blurb") ?? "",
  albumImage: imageAsset(
    readString(outtaTime, "songAlbumImage")!,
    `${outtaTime.title} album art`,
  ),
  audioSrc: readString(outtaTime, "songAudio")!,
  credit: readString(outtaTime, "songPerformedBy"),
};

export const richFxGatewayExperiments = [
  experimentFeature("emerald-legion"),
  experimentFeature("the-rock"),
  experimentFeature("outta-time"),
  experimentFeature("kratos"),
  experimentFeature("he-man"),
  experimentFeature("stay-puffy"),
  experimentFeature("dragonballz"),
  experimentFeature("mad-hatter"),
  experimentFeature("zombie-chaos"),
];
