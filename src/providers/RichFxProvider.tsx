"use client";

import { RichFxContext } from "@/consts/providers/richFxProvider";
import { useRichFxData } from "@/hooks/useRichFxData";
import type { RichFxProviderProps } from "@/types/providers/richFxProvider";

export default function RichFxProvider({ children }: RichFxProviderProps) {
  const richFxData = useRichFxData();

  return (
    <RichFxContext.Provider value={richFxData}>
      {children}
    </RichFxContext.Provider>
  );
}
