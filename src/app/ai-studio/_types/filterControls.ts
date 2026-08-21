import type {
  FilterCategory,
  FilterOption,
  FilterOptionByCategory,
  FilterSelection,
} from "./models";

export type FilterConfig = {
  category: FilterCategory;
  label: string;
  allLabel: string;
  labelId: string;
  minWidth: number;
};

export type FilterControlsProps = {
  filterOptions: FilterOptionByCategory;
  selectedFilters: FilterSelection;
  totalCount: number;
  visibleCount: number;
  onClearFilters: () => void;
  onFilterChange: (category: FilterCategory, value: string) => void;
};

export type FilterSelectProps = {
  config: FilterConfig;
  options: FilterOption[];
  value: string;
  onChange: (category: FilterCategory, value: string) => void;
};
