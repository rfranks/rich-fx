import Image from "next/image";
import type { AssetImageProps } from "@/types/components/shared/media";
import { withBasePath } from "@/utils/basePath";

export default function AssetImage({
  asset,
  className,
  priority = false,
  sizes,
}: AssetImageProps) {
  return (
    <Image
      src={withBasePath(asset.src)}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
