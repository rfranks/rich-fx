"use client";

import * as React from "react";
import richFxDataSnapshot, {
  fetchRichFxDataCached,
  type RichFx,
} from "@/consts/richFx";
import { createLogger } from "@/utils/observability/logger";
import { markEnd, markStart } from "@/utils/observability/perf";

const RichFxContext = React.createContext<RichFx>(richFxDataSnapshot);
const logger = createLogger("rich-fx-data");

type RichFxProviderProps = {
  children: React.ReactNode;
};

export default function RichFxProvider({ children }: RichFxProviderProps) {
  const [richFxData, setRichFxData] =
    React.useState<RichFx>(richFxDataSnapshot);

  React.useEffect(() => {
    let mounted = true;
    markStart("rich-fx-data-fetch");

    void fetchRichFxDataCached()
      .then((nextData) => {
        markEnd("rich-fx-data-fetch");
        if (!mounted) {
          return;
        }
        setRichFxData(nextData);
      })
      .catch((error) => {
        markEnd("rich-fx-data-fetch");
        logger.warn("Failed to load RichFX data at runtime; using snapshot.", {
          error: error instanceof Error ? error.message : "unknown",
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <RichFxContext.Provider value={richFxData}>
      {children}
    </RichFxContext.Provider>
  );
}

export function useRichFx() {
  return React.useContext(RichFxContext);
}
