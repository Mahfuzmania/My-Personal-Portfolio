import type { CSSProperties } from "react";

type LordIconProps = {
  src: string;
  size?: number;
  trigger?: "hover" | "loop" | "click" | "in" | "morph" | "boomerang";
  colors?: string;
  stroke?: number;
  delay?: number;
  className?: string;
  state?: string;
};

export function LordIcon({
  src,
  size = 20,
  trigger = "hover",
  colors = "primary:#8fb0ff,secondary:#d6e5ff",
  stroke = 1.6,
  delay,
  className = "",
  state,
}: LordIconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <span className={`inline-flex items-center justify-center ${className}`.trim()} aria-hidden>
      <lord-icon
        src={src}
        trigger={trigger}
        colors={colors}
        stroke={stroke}
        delay={delay}
        state={state}
        style={style}
      />
    </span>
  );
}

export const lordiconSet = {
  navigation: {
    home: "https://cdn.lordicon.com/guhzajix.json",
    about: "https://cdn.lordicon.com/lewtedlh.json",
    projects: "https://cdn.lordicon.com/fttvwdlw.json",
    research: "https://media.lordicon.com/assets/icons/slot/search.json",
    experience: "https://cdn.lordicon.com/crrnydsb.json",
    resume: "https://media.lordicon.com/assets/icons/main/arrow-down.json",
    contact: "https://cdn.lordicon.com/gzmgulpl.json",
    menu: "https://media.lordicon.com/assets/icons/main/mobile-menu.json",
  },
  section: {
    focus: "https://cdn.lordicon.com/tyvtvbcy.json",
    data: "https://cdn.lordicon.com/guhzajix.json",
    ai: "https://cdn.lordicon.com/fttvwdlw.json",
    simulation: "https://cdn.lordicon.com/lewtedlh.json",
    contact: "https://cdn.lordicon.com/gzmgulpl.json",
    location: "https://cdn.lordicon.com/oaflahpk.json",
    verified: "https://cdn.lordicon.com/crrnydsb.json",
  },
} as const;
