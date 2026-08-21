import type { FilterCategory } from "../_types/models";

export const FILTER_QUERY_KEY_BY_CATEGORY = {
  medium: "medium",
  style: "style",
  series: "series",
} as const satisfies Record<FilterCategory, string>;
