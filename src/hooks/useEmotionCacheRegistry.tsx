"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createEmotionCacheRegistry } from "@/utils/providers/createEmotionCacheRegistry";

export function useEmotionCacheRegistry() {
  const [{ cache, flush }] = useState(createEmotionCacheRegistry);

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";

    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return cache;
}
