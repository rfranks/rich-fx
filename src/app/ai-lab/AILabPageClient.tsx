"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ArrowBack, Close, DarkMode, LightMode } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AILab from "./_components/AILab";
import AILabPager from "./_components/AILabPager";
import type { AILabDataItem, AILabFilterSelection } from "./_types/aiLabModels";
import {
  filterAILabItems,
  normalizeAILabItems,
  resolveAILabFilterOptions,
} from "./_utils/aiLabRegistry";
import { GLOBAL_COLOR_MODE_STORAGE_KEY } from "@/consts/colorMode";
import { useColorModePreference } from "@/hooks/useColorModePreference";
import { useRichFx } from "@/providers/RichFxProvider";
import getRichFxLabTheme from "./_theme/getRichFxLabTheme";
import { useDocumentTitle } from "@/hooks/window/useDocumentTitle";
import { useRouteStateSync } from "@/hooks/window/useRouteStateSync";
import { withBasePath } from "@/utils/basePath";
import { getPortfolioAppRouteContract } from "@/utils/portfolio/routeContracts";

const FILTER_QUERY_KEY_BY_CATEGORY = {
  medium: "medium",
  style: "style",
  series: "series",
} as const;

const decodeHashSlug = (hash: string) => {
  const raw = hash.replace(/^#/, "").trim();
  if (!raw) {
    return "";
  }

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const readQueryToken = (params: URLSearchParams, key: string) => {
  const raw = params.get(key);
  if (!raw) {
    return undefined;
  }

  const trimmed = raw.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
};

export default function AILabPageClient() {
  const { aiLab, portfolioApps } = useRichFx();
  const aiLabRoute = getPortfolioAppRouteContract(portfolioApps, "aiLab");
  const labItems = useMemo(
    () => normalizeAILabItems(aiLab.items as AILabDataItem[], ""),
    [aiLab.items],
  );
  const filterOptions = useMemo(
    () => resolveAILabFilterOptions(labItems),
    [labItems],
  );
  const allowedFilterValuesByCategory = useMemo(
    () => ({
      medium: new Set(filterOptions.medium.map((option) => option.value)),
      style: new Set(filterOptions.style.map((option) => option.value)),
      series: new Set(filterOptions.series.map((option) => option.value)),
    }),
    [filterOptions],
  );
  const sanitizeFilterSelection = useCallback(
    (selection: AILabFilterSelection): AILabFilterSelection => {
      const nextSelection: AILabFilterSelection = {};

      const medium = selection.medium?.trim().toLowerCase();
      if (medium && allowedFilterValuesByCategory.medium.has(medium)) {
        nextSelection.medium = medium;
      }

      const style = selection.style?.trim().toLowerCase();
      if (style && allowedFilterValuesByCategory.style.has(style)) {
        nextSelection.style = style;
      }

      const series = selection.series?.trim().toLowerCase();
      if (series && allowedFilterValuesByCategory.series.has(series)) {
        nextSelection.series = series;
      }

      return nextSelection;
    },
    [allowedFilterValuesByCategory],
  );
  const readFilterSelectionFromSearch = useCallback(
    (search: string): AILabFilterSelection => {
      const params = new URLSearchParams(search);
      return sanitizeFilterSelection({
        medium: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.medium),
        style: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.style),
        series: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.series),
      });
    },
    [sanitizeFilterSelection],
  );
  const { mode, toggleColorMode, isReady } = useColorModePreference({
    storageKey: GLOBAL_COLOR_MODE_STORAGE_KEY,
  });
  const theme = useMemo(() => getRichFxLabTheme(mode), [mode]);
  const { setDocumentTitle } = useDocumentTitle();
  const [selectedFilters, setSelectedFilters] = useState<AILabFilterSelection>(
    {},
  );
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isInitialLocationSynced, setIsInitialLocationSynced] = useState(false);
  const { replaceRoutePathIfChanged } = useRouteStateSync({
    enabled: labItems.length > 0,
    listenToLocationEvents: true,
    onLocationChange: useCallback(
      (location: Location) => {
        setSelectedFilters(readFilterSelectionFromSearch(location.search));

        const hashSlug = decodeHashSlug(location.hash);
        if (hashSlug) {
          setCurrentSlug(hashSlug);
        }
        setIsInitialLocationSynced(true);
      },
      [readFilterSelectionFromSearch],
    ),
  });

  const filteredLabItems = useMemo(
    () => filterAILabItems(labItems, selectedFilters),
    [selectedFilters, labItems],
  );

  const currentIndex = useMemo(() => {
    if (!filteredLabItems.length) {
      return 0;
    }

    const resolvedIndex = filteredLabItems.findIndex(
      (item) => item.slug === currentSlug,
    );
    return resolvedIndex >= 0 ? resolvedIndex : 0;
  }, [currentSlug, filteredLabItems]);

  const currentItem = filteredLabItems[currentIndex];

  const handlePrevious = useCallback(() => {
    if (!filteredLabItems.length) {
      return;
    }

    setCurrentSlug((previousSlug) => {
      const activeIndex = filteredLabItems.findIndex(
        (item) => item.slug === previousSlug,
      );
      const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0;
      const previousIndex =
        currentActiveIndex <= 0
          ? filteredLabItems.length - 1
          : currentActiveIndex - 1;
      return (
        filteredLabItems[previousIndex]?.slug ??
        filteredLabItems[0]?.slug ??
        null
      );
    });
  }, [filteredLabItems]);

  const handleNext = useCallback(() => {
    if (!filteredLabItems.length) {
      return;
    }

    setCurrentSlug((previousSlug) => {
      const activeIndex = filteredLabItems.findIndex(
        (item) => item.slug === previousSlug,
      );
      const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0;
      const nextIndex =
        currentActiveIndex >= filteredLabItems.length - 1
          ? 0
          : currentActiveIndex + 1;
      return (
        filteredLabItems[nextIndex]?.slug ?? filteredLabItems[0]?.slug ?? null
      );
    });
  }, [filteredLabItems]);

  const handleSelectLab = useCallback(
    (index: number) => {
      const selectedItem = filteredLabItems[index];
      if (selectedItem) {
        setCurrentSlug(selectedItem.slug);
      }
    },
    [filteredLabItems],
  );

  const setFilterValue = useCallback(
    (category: keyof AILabFilterSelection, nextValue: string) => {
      setSelectedFilters((previous) => {
        const nextSelection: AILabFilterSelection = {
          ...previous,
        };

        if (nextValue) {
          nextSelection[category] = nextValue;
        } else {
          delete nextSelection[category];
        }

        return sanitizeFilterSelection(nextSelection);
      });
    },
    [sanitizeFilterSelection],
  );

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  useEffect(() => {
    setDocumentTitle(aiLabRoute.documentTitle);
  }, [aiLabRoute.documentTitle, setDocumentTitle]);

  useEffect(() => {
    if (!labItems.length) {
      setIsInitialLocationSynced(true);
    }
  }, [labItems.length]);

  useEffect(() => {
    if (!isInitialLocationSynced) {
      return;
    }

    if (!filteredLabItems.length) {
      setCurrentSlug(null);
      return;
    }

    if (
      currentSlug &&
      filteredLabItems.some((item) => item.slug === currentSlug)
    ) {
      return;
    }

    setCurrentSlug(filteredLabItems[0]?.slug ?? null);
  }, [currentSlug, filteredLabItems, isInitialLocationSynced]);

  useEffect(() => {
    if (!isInitialLocationSynced || typeof window === "undefined") {
      return;
    }

    const nextUrl = new URL(window.location.href);

    if (selectedFilters.medium) {
      nextUrl.searchParams.set(
        FILTER_QUERY_KEY_BY_CATEGORY.medium,
        selectedFilters.medium,
      );
    } else {
      nextUrl.searchParams.delete(FILTER_QUERY_KEY_BY_CATEGORY.medium);
    }

    if (selectedFilters.style) {
      nextUrl.searchParams.set(
        FILTER_QUERY_KEY_BY_CATEGORY.style,
        selectedFilters.style,
      );
    } else {
      nextUrl.searchParams.delete(FILTER_QUERY_KEY_BY_CATEGORY.style);
    }

    if (selectedFilters.series) {
      nextUrl.searchParams.set(
        FILTER_QUERY_KEY_BY_CATEGORY.series,
        selectedFilters.series,
      );
    } else {
      nextUrl.searchParams.delete(FILTER_QUERY_KEY_BY_CATEGORY.series);
    }

    nextUrl.hash = currentItem ? encodeURIComponent(currentItem.slug) : "";

    replaceRoutePathIfChanged(nextUrl);
  }, [
    currentItem,
    isInitialLocationSynced,
    replaceRoutePathIfChanged,
    selectedFilters,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      const isTypingField =
        Boolean(target?.isContentEditable) ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT";

      if (isTypingField) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const hasActiveFilters = Boolean(
    selectedFilters.medium || selectedFilters.style || selectedFilters.series,
  );

  if (!isReady || !labItems.length) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          "--fabric-bg-base": theme.fabric.background.base,
          "--fabric-bg-layer": theme.fabric.background.layer,
          "--fabric-bg-radial-primary": theme.fabric.background.radialPrimary,
          "--fabric-bg-radial-secondary":
            theme.fabric.background.radialSecondary,
          "--fabric-surface-1": theme.fabric.surface.level1,
          "--fabric-surface-2": theme.fabric.surface.level2,
          "--fabric-surface-3": theme.fabric.surface.level3,
          "--fabric-surface-border": theme.fabric.surface.border,
          "--fabric-surface-border-strong": theme.fabric.surface.borderStrong,
          "--fabric-shadow-soft": theme.fabric.surface.shadowSoft,
          "--fabric-shadow-tight": theme.fabric.surface.shadowTight,
          "--fabric-inner-glow": theme.fabric.surface.innerGlow,
          backgroundImage: [
            "radial-gradient(50rem 30rem at 8% -10%, var(--fabric-bg-radial-primary), transparent 68%)",
            "radial-gradient(42rem 26rem at 96% -12%, var(--fabric-bg-radial-secondary), transparent 72%)",
            "linear-gradient(180deg, var(--fabric-bg-layer), var(--fabric-bg-base))",
          ].join(","),
        })}
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            bgcolor: "transparent",
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              px: { xs: 1.5, md: 2.5 },
              py: 1.25,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                color="inherit"
                aria-label="Back to portfolio"
                href={withBasePath("/")}
                size="small"
              >
                <ArrowBack fontSize="small" />
              </IconButton>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6">{aiLab.title}</Typography>
                {!isSmallScreen && (
                  <Typography variant="body2" color="text.secondary">
                    {aiLab.description}
                  </Typography>
                )}
              </Box>
              <IconButton
                color="inherit"
                aria-label={
                  mode === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                onClick={toggleColorMode}
                size="small"
              >
                {mode === "light" ? (
                  <DarkMode fontSize="small" />
                ) : (
                  <LightMode fontSize="small" />
                )}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Close lab panel"
                href={withBasePath("/")}
                size="small"
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <FormControl
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 168 } }}
              >
                <InputLabel id="ai-lab-medium-filter-label">Medium</InputLabel>
                <Select
                  labelId="ai-lab-medium-filter-label"
                  label="Medium"
                  value={selectedFilters.medium ?? ""}
                  onChange={(event) =>
                    setFilterValue("medium", event.target.value)
                  }
                >
                  <MenuItem value="">All Mediums</MenuItem>
                  {filterOptions.medium.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {`${option.label} (${option.count})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 168 } }}
              >
                <InputLabel id="ai-lab-style-filter-label">Style</InputLabel>
                <Select
                  labelId="ai-lab-style-filter-label"
                  label="Style"
                  value={selectedFilters.style ?? ""}
                  onChange={(event) =>
                    setFilterValue("style", event.target.value)
                  }
                >
                  <MenuItem value="">All Styles</MenuItem>
                  {filterOptions.style.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {`${option.label} (${option.count})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 198 } }}
              >
                <InputLabel id="ai-lab-series-filter-label">Series</InputLabel>
                <Select
                  labelId="ai-lab-series-filter-label"
                  label="Series"
                  value={selectedFilters.series ?? ""}
                  onChange={(event) =>
                    setFilterValue("series", event.target.value)
                  }
                >
                  <MenuItem value="">All Series</MenuItem>
                  {filterOptions.series.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {`${option.label} (${option.count})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ ml: { sm: "auto" }, pl: { sm: 0.5 } }}
              >
                {hasActiveFilters ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                ) : null}
                <Typography variant="caption" color="text.secondary">
                  {`${filteredLabItems.length}/${labItems.length} visible`}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              px: { xs: 1.5, md: 2.5 },
              py: 1.5,
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
              display: "flex",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                maxWidth: "100%",
                display: "flex",
                overflow: "hidden",
                pr: 0.5,
                backgroundColor: "transparent",
                "& > *": {
                  flex: 1,
                  minHeight: 0,
                  minWidth: 0,
                  maxWidth: "100%",
                },
              }}
            >
              {currentItem ? (
                <AILab key={currentItem.slug} {...currentItem.props} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No items match the selected medium/style/series filters.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <AILabPager
            currentIndex={currentIndex}
            items={filteredLabItems}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSelectLab={handleSelectLab}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
