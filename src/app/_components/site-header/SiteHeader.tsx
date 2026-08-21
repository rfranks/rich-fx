import Image from "next/image";
import Link from "next/link";
import { SITE_HEADER_LINKS } from "@/app/_consts/siteHeader";
import StartProjectButton from "@/app/_components/start-project-button/StartProjectButton";
import type { SiteHeaderProps } from "@/app/_types/siteHeader";
import { withBasePath } from "@/utils/basePath";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({
  showStartProject = false,
}: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="RichFX home">
        <Image
          src={withBasePath("/assets/wordmark.png")}
          alt="RichFX"
          width={1802}
          height={872}
          priority
          sizes="(max-width: 700px) 110px, 140px"
          className={styles.wordmark}
        />
      </Link>
      <nav aria-label="Primary navigation">
        {SITE_HEADER_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        {showStartProject ? <StartProjectButton variant="header" /> : null}
      </nav>
    </header>
  );
}
