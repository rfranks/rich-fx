import { useEffect } from "react";

type ScrollLockStyles = {
  bodyLeft: string;
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  bodyPosition: string;
  bodyRight: string;
  bodyTop: string;
  bodyWidth: string;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
};

export function useStartProjectBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof window === "undefined") {
      return undefined;
    }

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const previousStyles: ScrollLockStyles = {
      bodyLeft: body.style.left,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyRight: body.style.right,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: documentElement.style.overflow,
      htmlOverscrollBehavior: documentElement.style.overscrollBehavior,
    };

    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      documentElement.style.overflow = previousStyles.htmlOverflow;
      documentElement.style.overscrollBehavior =
        previousStyles.htmlOverscrollBehavior;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior;
      if (window.navigator.userAgent.includes("jsdom")) {
        return;
      }

      try {
        window.scrollTo(0, scrollY);
      } catch {
        // jsdom does not implement scrollTo; browsers need this restore path.
      }
    };
  }, [locked]);
}
