export const formatImageStyleLabel = (slug: string) =>
  slug
    .split("-")
    .map((part) =>
      part.length <= 3 && /^\d/.test(part)
        ? part.toUpperCase()
        : `${part.charAt(0).toUpperCase()}${part.slice(1)}`,
    )
    .join(" ");

export const formatImageStylePickerLabel = (label: string) => label;
