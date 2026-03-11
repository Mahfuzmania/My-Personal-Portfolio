import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type PortraitStageProps = {
  src: string;
  alt: string;
  caption?: string;
  accent?: ReactNode;
  imageClassName?: string;
  sizes?: string;
  objectPosition?: CSSProperties["objectPosition"];
  className?: string;
  enableDecorations?: boolean;
  priority?: boolean;
  blend?: boolean;
};

export function PortraitStage({
  src,
  alt,
  caption,
  accent,
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 420px",
  objectPosition = "center",
  className = "",
  enableDecorations = true,
  priority = false,
  blend = false,
}: PortraitStageProps) {
  return (
    <article className={`portrait-stage relative isolate h-fit ${blend ? "portrait-stage--blend" : ""} ${className}`.trim()}>
      {enableDecorations ? (
        <>
          <span className="portrait-stage__halo portrait-stage__halo--one" aria-hidden />
          <span className="portrait-stage__halo portrait-stage__halo--two" aria-hidden />
          <span className="portrait-stage__halo portrait-stage__halo--three" aria-hidden />
        </>
      ) : null}
      <div className="portrait-stage__frame">
        <div className="portrait-stage__media-shell">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            style={{ objectPosition }}
            className={`portrait-stage__media ${imageClassName}`.trim()}
            sizes={sizes}
          />
          {enableDecorations ? (
            <>
              <span className="portrait-stage__vignette" aria-hidden />
              <span className="portrait-stage__grain" aria-hidden />
              <span className="portrait-stage__rim" aria-hidden />
            </>
          ) : null}
        </div>
      </div>
      {accent ? <div className="portrait-stage__accent">{accent}</div> : null}
      {caption ? <p className="portrait-stage__caption">{caption}</p> : null}
    </article>
  );
}
