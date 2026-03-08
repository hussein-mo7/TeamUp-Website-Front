import AOS from "aos";
import "aos/dist/aos.css";

export const initAOS = (): void => {
  AOS.init({
    duration: 700,       // animation duration in ms
    easing: "ease-out-cubic",
    once: true,          // animate only once on scroll
    offset: 80,          // trigger 80px before element enters viewport
  });
};

export const refreshAOS = (): void => {
  AOS.refresh();
};