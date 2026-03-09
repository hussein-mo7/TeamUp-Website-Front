import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;
let rafId: number | null = null;

export const initLenis = (): Lenis => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  return lenis;
};

// Intercept all anchor href="#id" clicks and hand them to Lenis
export const initAnchorScrolling = (): (() => void) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");

    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href?.startsWith("/#") && !href?.startsWith("#")) return;

    const id = href.replace("/#", "").replace("#", "");
    const el = document.getElementById(id);
    if (!el || !lenis) return;

    e.preventDefault();
    lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  };

  document.addEventListener("click", handleClick);

  // return cleanup function
  return () => document.removeEventListener("click", handleClick);
};

export const getLenis = (): Lenis | null => lenis;

export const destroyLenis = (): void => {
  if (rafId !== null) cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
  rafId = null;
};
