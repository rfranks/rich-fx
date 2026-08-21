import { AssetImage, ImageLightbox } from "@/components/shared/media";
import { CALENDAR_PREVIEW_SIZES } from "@/app/(home)/_consts/homePage";
import type { CalendarViewerProps } from "@/app/_types/calendarViewer";
import { calendars } from "@/consts/richFx";
import { withBasePath } from "@/utils/basePath";
import styles from "@/app/(home)/_components/home-page/HomePage.module.css";

export default function CalendarViewer({
  selectedCalendar,
  selectedMonth,
  selectedMonthIndex,
  onSelectCalendar,
  onSelectMonth,
}: CalendarViewerProps) {
  return (
    <div className={styles.calendarViewer}>
      <div className={styles.viewerHeader}>
        <div>
          <h2>{selectedCalendar.name}</h2>
        </div>
      </div>

      <figure className={styles.calendarFrame}>
        <span>{selectedMonth.label}</span>
        <ImageLightbox
          src={withBasePath(selectedMonth.image.src)}
          alt={selectedMonth.image.alt}
          title={`${selectedCalendar.name} - ${selectedMonth.label}`}
          caption={selectedCalendar.description}
          triggerSx={{ height: "100%" }}
        >
          <AssetImage
            asset={selectedMonth.image}
            sizes={CALENDAR_PREVIEW_SIZES}
            className={styles.calendarImage}
          />
        </ImageLightbox>
      </figure>

      <div className={styles.calendarControls}>
        {calendars.length > 1 ? (
          <div
            className={styles.calendarProductPicker}
            aria-label="Choose a calendar"
          >
            {calendars.map((calendar) => (
              <button
                type="button"
                className={
                  calendar.slug === selectedCalendar.slug ? styles.active : ""
                }
                onClick={() => onSelectCalendar(calendar.slug)}
                key={calendar.slug}
              >
                {calendar.name}
              </button>
            ))}
          </div>
        ) : null}

        <div className={styles.monthPicker} aria-label="Choose a month">
          {selectedCalendar.months.map((month, index) => (
            <button
              type="button"
              className={index === selectedMonthIndex ? styles.active : ""}
              onClick={() => onSelectMonth(index)}
              key={`${month.year}-${month.month}`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
