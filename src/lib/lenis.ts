import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export const initLenis = (): Lenis => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return lenis;
};

export const getLenis = (): Lenis | null => lenis;

export const destroyLenis = (): void => {
  lenis?.destroy();
  lenis = null;
};