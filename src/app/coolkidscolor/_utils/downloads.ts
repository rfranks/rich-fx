import {
  BONUS_DOWNLOAD_ASSETS,
  COOL_KIDS_COLOR_ASSET_BASE_PATH,
  DOWNLOAD_ASSETS,
} from "@/app/coolkidscolor/_consts/coolKidsColor";
import type {
  DownloadActionConfig,
  DownloadAsset,
} from "@/app/coolkidscolor/_types/coolKidsColor";

export function getDownloadHref(asset: DownloadAsset): string | null {
  if (!asset.available) {
    return null;
  }

  return `${COOL_KIDS_COLOR_ASSET_BASE_PATH}${asset.filename}`;
}

export function getDownloadActionHref(
  asset: DownloadAsset,
  action: DownloadActionConfig,
): string | null {
  void action;
  return getDownloadHref(asset);
}

export function getDownloadAsset(id: string): DownloadAsset {
  const asset = [...DOWNLOAD_ASSETS, ...BONUS_DOWNLOAD_ASSETS].find(
    (item) => item.id === id,
  );

  if (!asset) {
    throw new Error(`Unknown #coolkidscolor download asset: ${id}`);
  }

  return asset;
}
