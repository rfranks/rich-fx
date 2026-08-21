export const decodeHashSlug = (hash: string) => {
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

export const readQueryToken = (params: URLSearchParams, key: string) => {
  const raw = params.get(key);
  if (!raw) {
    return undefined;
  }

  const trimmed = raw.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
};
