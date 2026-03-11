import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        trigger?: "hover" | "loop" | "click" | "in" | "morph" | "boomerang";
        colors?: string;
        state?: string;
        stroke?: string | number;
        delay?: string | number;
        target?: string;
        loading?: "eager" | "lazy" | "interaction";
        style?: CSSProperties;
      };
    }
  }
}

export {};
