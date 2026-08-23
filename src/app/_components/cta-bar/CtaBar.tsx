import { useMemo } from "react";
import Link from "next/link";
import { HOME_PAGE_CTAS } from "@/app/(home)/_consts/homePage";
import type { CtaBarProps } from "@/app/_types/ctaBar";
import StartProjectButton from "@/app/_components/start-project-button/StartProjectButton";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function CtaBar({
  className,
  showWhatWeDo = false,
}: CtaBarProps) {
  const classNames = [styles.ctaBar, className].filter(Boolean).join(" ");

  const CTAS = useMemo(() => {
    if (!showWhatWeDo) {
      return HOME_PAGE_CTAS.filter((cta) => cta.href !== "/what-we-do");
    }

    return HOME_PAGE_CTAS;
  }, [showWhatWeDo]);

  return (
    <div className={classNames}>
      {CTAS.map((cta) => (
        <Link
          className={cta.href === "/ai-studio" ? styles.handheldHidden : ""}
          href={cta.href}
          key={cta.href}
        >
          {cta.label}
        </Link>
      ))}
      <StartProjectButton />
    </div>
  );
}
