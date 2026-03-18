import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugins once — import this file wherever you use GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global defaults
gsap.defaults({
  ease: "power2.out",
  duration: 0.6,
});

// ScrollTrigger defaults
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, ScrollToPlugin };
