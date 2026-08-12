import {
  filterAILabItems,
  normalizeAILabItems,
  resolveAILabFilterOptions,
} from "@/app/ai-lab/_utils/aiLabRegistry";
import type { AILabDataItem } from "@/app/ai-lab/_types/aiLabModels";

describe("aiLabRegistry filters", () => {
  const fallbackImage = "/fallback.png";

  const baseItems: AILabDataItem[] = [
    {
      slug: "white-rabbit",
      title: "White Rabbit",
      realisticImage: "/white-rabbit/realistic.png",
      stylizedRendering: "/white-rabbit/stylized.png",
      movieRendering: "/white-rabbit/movie.mp4",
      blurb: "Wonderland lab with storybook energy.",
    },
    {
      slug: "zombie-chaos",
      title: "Zombie Chaos",
      realisticImage: "/zombie-chaos/realistic.png",
      stylizedRendering: "/zombie-chaos/stylized.png",
      movieRendering: "/zombie-chaos/movie.mp4",
      blurb: "Undead horror-comedy chaos.",
    },
    {
      slug: "zombie-chaos-2",
      title: "Zombie Chaos 2",
      realisticImage: "/zombie-chaos-2/realistic.png",
      stylizedRendering: "/zombie-chaos-2/stylized.png",
      movieRendering: "/zombie-chaos-2/movie.mp4",
      blurb: "More undead mayhem.",
    },
    {
      slug: "outta-time",
      title: "Outta Time",
      type: "song-recording",
      songAlbumImage: "/outta-time/album.png",
      songAudio: "/outta-time/outta-time.mp3",
      songAudioSource: "Original recording",
      blurb: "Country-trap anthem.",
    },
  ];

  it("infers medium, style, and series tags from existing item fields", () => {
    const normalized = normalizeAILabItems(baseItems, fallbackImage);

    const wonderlandItem = normalized.find(
      (item) => item.slug === "white-rabbit",
    );
    expect(wonderlandItem?.seriesTag).toBe("alice-in-wonderland");
    expect(wonderlandItem?.mediumTags).toEqual(
      expect.arrayContaining(["image", "video"]),
    );
    expect(wonderlandItem?.styleTags).toEqual(
      expect.arrayContaining(["storybook", "cinematic"]),
    );

    const songItem = normalized.find((item) => item.slug === "outta-time");
    expect(songItem?.mediumTags).toEqual(
      expect.arrayContaining(["audio", "image"]),
    );
    expect(songItem?.styleTags).toEqual(expect.arrayContaining(["music"]));

    const zombieSequel = normalized.find(
      (item) => item.slug === "zombie-chaos-2",
    );
    expect(zombieSequel?.seriesTag).toBe("zombie-chaos");
  });

  it("builds filter options and applies filters", () => {
    const normalized = normalizeAILabItems(baseItems, fallbackImage);
    const options = resolveAILabFilterOptions(normalized);

    const mediumAudio = options.medium.find(
      (option) => option.value === "audio",
    );
    expect(mediumAudio?.count).toBe(1);

    const seriesZombie = options.series.find(
      (option) => option.value === "zombie-chaos",
    );
    expect(seriesZombie?.count).toBe(2);

    const filtered = filterAILabItems(normalized, {
      medium: "audio",
      style: "music",
      series: "standalone",
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.slug).toBe("outta-time");
  });
});
