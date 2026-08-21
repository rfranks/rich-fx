"use client";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FILTER_CONFIGS } from "../../_consts/filterControls";
import type {
  FilterControlsProps,
  FilterSelectProps,
} from "../../_types/filterControls";

export default function FilterControls({
  filterOptions,
  selectedFilters,
  totalCount,
  visibleCount,
  onClearFilters,
  onFilterChange,
}: FilterControlsProps) {
  const hasActiveFilters = Boolean(
    selectedFilters.medium || selectedFilters.style || selectedFilters.series,
  );

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      alignItems={{ xs: "stretch", sm: "center" }}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      {FILTER_CONFIGS.map((config) => (
        <FilterSelect
          key={config.category}
          config={config}
          options={filterOptions[config.category]}
          value={selectedFilters[config.category] ?? ""}
          onChange={onFilterChange}
        />
      ))}

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ ml: { sm: "auto" }, pl: { sm: 0.5 } }}
      >
        {hasActiveFilters ? (
          <Button variant="outlined" size="small" onClick={onClearFilters}>
            Clear Filters
          </Button>
        ) : null}
        <Typography variant="caption" color="text.secondary">
          {`${visibleCount}/${totalCount} visible`}
        </Typography>
      </Stack>
    </Stack>
  );
}

function FilterSelect({ config, options, value, onChange }: FilterSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(config.category, event.target.value);
  };

  return (
    <FormControl
      size="small"
      sx={{ minWidth: { xs: "100%", sm: config.minWidth } }}
    >
      <InputLabel id={config.labelId}>{config.label}</InputLabel>
      <Select
        labelId={config.labelId}
        label={config.label}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">{config.allLabel}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {`${option.label} (${option.count})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
