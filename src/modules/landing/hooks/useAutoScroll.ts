import { useEffect } from "react";

export function useAutoScroll(ref: HTMLDivElement | null) {
  useEffect(() => {
    if (!ref) return;

    const interval = setInterval(() => {
      ref.scrollBy({ left: 240, behavior: "smooth" });
      if (ref.scrollLeft + ref.clientWidth >= ref.scrollWidth) {
        ref.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [ref]);
}
