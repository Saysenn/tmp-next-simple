// Shared nav link style helper — used by all header templates.
// To add a new style: add an entry to navLinkClass and update NavLinkStyle in configs/header.ts.

import { siteConfig } from "@/configs/header";

const navLinkClass: Record<string, (active: boolean) => string> = {
  "bg-fill": (a) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
      a ? "font-semibold" : ""
    }`,
  "underline-center": (a) =>
    `px-3 py-1.5 text-sm font-medium relative whitespace-nowrap
     after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
     after:h-[2px] after:bg-current after:transition-all after:duration-200 ${
      a ? "after:w-full font-semibold" : "after:w-0 hover:after:w-full"
    }`,
  "underline-left": (a) =>
    `px-3 py-1.5 text-sm font-medium relative whitespace-nowrap
     after:absolute after:bottom-0 after:left-0
     after:h-[2px] after:bg-current after:transition-all after:duration-200 ${
      a ? "after:w-full font-semibold" : "after:w-0 hover:after:w-full"
    }`,
  "text-accent": (a) =>
    `px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
      a ? "font-semibold" : ""
    }`,
  "dot-below": (a) =>
    `px-3 py-1.5 text-sm font-medium relative whitespace-nowrap ${
      a
        ? "font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-current"
        : ""
    }`,
  "neuro": (a) =>
    `px-4 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      a
        ? "shadow-[inset_0_3px_8px_rgba(0,0,0,0.28)] font-semibold"
        : "hover:shadow-[inset_0_2px_5px_rgba(0,0,0,0.18)] active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.32)]"
    }`,
};

/** Returns the Tailwind className string for a nav link. */
export function getNavClass(isActive: boolean): string {
  const style = siteConfig.navLinkStyle ?? "bg-fill";
  return (navLinkClass[style] ?? navLinkClass["bg-fill"])(isActive);
}

/** Returns the inline style object for a nav link (color + neuro gradient). */
export function getNavStyle(
  isActive: boolean,
  transparent = false
): React.CSSProperties {
  const style = siteConfig.navLinkStyle ?? "bg-fill";

  const color = transparent
    ? isActive ? "var(--nav-color-transparent-active)" : "var(--nav-color-transparent)"
    : isActive ? "var(--nav-color-solid-active)"       : "var(--nav-color-solid)";

  const background =
    style === "neuro"
      ? isActive
        ? "linear-gradient(to bottom, var(--bg-soft), var(--bg-base))"
        : "transparent"
      : style === "bg-fill" && isActive
        ? "var(--accent-light)"
        : undefined;

  return { color, ...(background ? { background } : {}) };
}
