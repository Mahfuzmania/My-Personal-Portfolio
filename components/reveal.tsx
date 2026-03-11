import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  if (!className) {
    return <>{children}</>;
  }

  return <div className={className}>{children}</div>;
}
