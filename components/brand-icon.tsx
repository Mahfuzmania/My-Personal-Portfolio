import Image from "next/image";
import { UiIcon } from "@/components/ui-icon";
import { getToolIcon } from "@/components/project-icons";

type BrandIconProps = {
  label: string;
  className?: string;
};

const IMAGE_LOGOS: Array<{ test: RegExp; src: string; alt: string }> = [
  { test: /next(\.js)?/i, src: "/images/stack-logos/nextjs.svg", alt: "Next.js" },
  { test: /typescript/i, src: "/images/stack-logos/typescript.svg", alt: "TypeScript" },
  { test: /tailwind/i, src: "/images/stack-logos/tailwindcss.svg", alt: "Tailwind CSS" },
  { test: /framer/i, src: "/images/stack-logos/framer.svg", alt: "Framer Motion" },
  { test: /zod/i, src: "/images/stack-logos/zod.svg", alt: "Zod" },
  { test: /jwt|jose/i, src: "/images/stack-logos/jsonwebtokens.svg", alt: "JSON Web Token" },
  { test: /python|openpyxl/i, src: "/images/stack-logos/python.svg", alt: "Python" },
  { test: /pandas/i, src: "/images/stack-logos/pandas.svg", alt: "Pandas" },
  { test: /numpy/i, src: "/images/stack-logos/numpy.svg", alt: "NumPy" },
  { test: /flask/i, src: "/images/stack-logos/flask.svg", alt: "Flask" },
  { test: /jupyter/i, src: "/images/stack-logos/jupyter.svg", alt: "Jupyter" },
  { test: /scikit/i, src: "/images/stack-logos/scikitlearn.svg", alt: "Scikit-learn" },
  { test: /\bmatlab\b/i, src: "/images/stack-logos/matlab.svg", alt: "MATLAB" },
  { test: /simulink/i, src: "/images/stack-logos/simulink.png", alt: "Simulink" },
  { test: /ollama/i, src: "/images/stack-logos/ollama.svg", alt: "Ollama" },
  { test: /bluetooth/i, src: "/images/stack-logos/bluetooth.svg", alt: "Bluetooth" },
  { test: /c\+\+|8051|assembly/i, src: "/images/stack-logos/cplusplus.svg", alt: "C++" },
];

function getImageLogo(label: string) {
  return IMAGE_LOGOS.find((item) => item.test.test(label));
}

export function BrandIcon({ label, className = "" }: BrandIconProps) {
  const imageLogo = getImageLogo(label);
  if (imageLogo) {
    return (
      <span className={`inline-flex h-[1.15em] w-[1.15em] items-center justify-center overflow-hidden rounded-[4px] border border-border/30 bg-white/92 p-[1px] ${className}`.trim()}>
        <Image src={imageLogo.src} alt={imageLogo.alt} width={16} height={16} className="h-full w-full object-contain" />
      </span>
    );
  }

  const fallback = getToolIcon(label);
  return <UiIcon name={fallback} className={className} />;
}
