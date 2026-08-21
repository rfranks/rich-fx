"use client";

import { CacheProvider } from "@emotion/react";
import { useEmotionCacheRegistry } from "@/hooks/useEmotionCacheRegistry";
import type { ThemeRegistryProps } from "@/types/providers/themeRegistry";

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const cache = useEmotionCacheRegistry();

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
