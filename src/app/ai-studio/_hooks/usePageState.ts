"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { RichFxStudioItem } from "@/consts/richFx";
import { useRouteStateSync } from "@/hooks/window/useRouteStateSync";
import { FILTER_QUERY_KEY_BY_CATEGORY } from "../_consts/routeState";
import type { DataItem, FilterSelection } from "../_types/models";
import {
  filterItems,
  normalizeItems,
  resolveFilterOptions,
} from "../_utils/registry";
import { decodeHashSlug, readQueryToken } from "../_utils/routeState";

export function usePageState(items: RichFxStudioItem[]) {
  const labItems = useMemo(
    () => normalizeItems(items as DataItem[], ""),
    [items],
  );
  const filterOptions = useMemo(
    () => resolveFilterOptions(labItems),
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
    (selection: FilterSelection): FilterSelection => {
      const nextSelection: FilterSelection = {};

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
    (search: string): FilterSelection => {
      const params = new URLSearchParams(search);
      return sanitizeFilterSelection({
        medium: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.medium),
        style: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.style),
        series: readQueryToken(params, FILTER_QUERY_KEY_BY_CATEGORY.series),
      });
    },
    [sanitizeFilterSelection],
  );
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({});
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
    () => filterItems(labItems, selectedFilters),
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
    (category: keyof FilterSelection, nextValue: string) => {
      setSelectedFilters((previous) => {
        const nextSelection: FilterSelection = {
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

  return {
    clearFilters,
    currentIndex,
    currentItem,
    filterOptions,
    filteredLabItems,
    handleNext,
    handlePrevious,
    handleSelectLab,
    labItems,
    selectedFilters,
    setFilterValue,
  };
}
