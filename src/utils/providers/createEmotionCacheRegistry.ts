import createCache, { type EmotionCache } from "@emotion/cache";
import { MUI_EMOTION_CACHE_KEY } from "@/consts/providers/themeRegistry";

export type EmotionCacheRegistry = {
  cache: EmotionCache;
  flush: () => string[];
};

export function createEmotionCacheRegistry(): EmotionCacheRegistry {
  const cache = createCache({ key: MUI_EMOTION_CACHE_KEY });
  cache.compat = true;

  const prevInsert = cache.insert;
  let inserted: string[] = [];

  cache.insert = (...args) => {
    const serialized = args[1];

    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }

    return prevInsert(...args);
  };

  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };

  return { cache, flush };
}
