import Link from "next/link";
import { HOME_PAGE_CTAS } from "@/app/(home)/_consts/homePage";
import type { CtaBarProps } from "@/app/_types/ctaBar";
import StartProjectButton from "@/app/_components/start-project-button/StartProjectButton";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function CtaBar({ className }: CtaBarProps) {
  const classNames = [styles.ctaBar, className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {HOME_PAGE_CTAS.map((cta) => (
        <Link href={cta.href} key={cta.href}>
          {cta.label}
        </Link>
      ))}
      <StartProjectButton />
    </div>
  );
}
