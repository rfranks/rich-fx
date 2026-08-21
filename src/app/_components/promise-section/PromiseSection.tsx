import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function PromiseSection() {
  return (
    <section className={styles.promise} aria-label="How it works">
      <article>
        <span>01</span>
        <h2>Use the photo you already love.</h2>
        <p>
          Start with the image that already carries the story: a family
          portrait, a costume snapshot, a pet photo, a candid moment, or a
          favorite memory from the year. RichFX keeps the personality of the
          original while giving it a polished seasonal setting.
        </p>
      </article>
      <article>
        <span>02</span>
        <h2>Pick the holiday and mood.</h2>
        <p>
          Christmas, Halloween, St. Patrick&apos;s Day, birthdays, invites,
          calendars, and seasonal one-offs can each get a distinct visual
          treatment. Choose cozy, cinematic, funny, spooky, elegant, retro,
          storybook, or something stranger and more specific to your people.
        </p>
      </article>
      <article>
        <span>03</span>
        <h2>Get a composed card image.</h2>
        <p>
          The final piece is designed as a finished card, not just a stylized
          portrait. Subject, scene, framing, typography, greeting, and
          print-ready composition are handled together so the image feels
          intentional from edge to edge.
        </p>
      </article>
    </section>
  );
}
