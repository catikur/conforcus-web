/* eslint-disable @next/next/no-img-element */
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.image";
import type { PTBlock } from "@/lib/blogSamples";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const b = urlFor(value);
      const src = b ? b.width(1200).fit("max").auto("format").url() : null;
      if (!src) return null;
      return <img src={src} alt={(value?.alt as string) || ""} width={1200} height={675} loading="lazy" style={{ width: "100%", height: "auto" }} />;
    },
  },
};

export default function PortableBody({ value }: { value: PTBlock[] }) {
  return (
    <div className="prose">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
