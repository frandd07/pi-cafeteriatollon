import { useEffect } from "react";

export function useScrollSections(
  setIsVisible: (id: string, visible: boolean) => void
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.target.id, entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: "-50px" }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [setIsVisible]);
}
