"use client";

import * as React from "react";
import richFxDataSnapshot, {
  fetchRichFxDataCached,
  type RichFx,
} from "@/consts/richFx";
import { RICH_FX_DATA_LOGGER_NAME } from "@/consts/providers/richFxProvider";
import { createLogger } from "@/utils/observability/logger";
import { markEnd, markStart } from "@/utils/observability/perf";

const logger = createLogger(RICH_FX_DATA_LOGGER_NAME);

export function useRichFxData() {
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

  return richFxData;
}
