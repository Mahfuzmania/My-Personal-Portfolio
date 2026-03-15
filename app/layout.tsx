import type { Metadata } from "next";
import { Lora, Noto_Serif_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { normalizeBnUiText } from "@/lib/bn-localize";
import { getPortfolioContent } from "@/lib/content-service";
import { getSiteLang } from "@/lib/lang";
import { getSiteUrl } from "@/lib/seo";
import { SeoJsonLd } from "@/components/seo-jsonld";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bn",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    template: "%s | Md Mahfuzul Islam",
    default: "Md Mahfuzul Islam | Data Engineer and Applied AI Systems Builder",
  },
  description:
    "Personal portfolio of Md Mahfuzul Islam featuring data engineering, applied AI systems, secure platform delivery, and simulation-led technical work.",
  openGraph: {
    title: "Md Mahfuzul Islam | Data Engineer and Applied AI Systems Builder",
    description:
      "Personal portfolio of Md Mahfuzul Islam featuring data engineering, applied AI systems, secure platform delivery, and simulation-led technical work.",
    type: "website",
    siteName: "Md Mahfuzul Islam",
    images: [
      {
        url: "/images/portraits/mahfuzul-whatsapp-2026-03-11.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Mahfuzul Islam | Data Engineer and Applied AI Systems Builder",
    description:
      "Personal portfolio of Md Mahfuzul Islam featuring data engineering, applied AI systems, secure platform delivery, and simulation-led technical work.",
  },
  icons: {
    icon: [{ url: "/favicon.ico?v=3", type: "image/x-icon" }, { url: "/icon.png?v=3", type: "image/png" }],
    shortcut: ["/favicon.ico?v=3"],
    apple: [{ url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" }],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPortfolioContent();
  const lang = await getSiteLang();

  return (
    <html lang={lang} data-lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  document.documentElement.setAttribute('data-theme', stored || system);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${lora.variable} ${notoSerifBengali.variable} antialiased`}>
        <div className="site-shell">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Navbar profile={content.profile} lang={lang} roleLine={normalizeBnUiText(content.uiContent.navbarRoleLine[lang], lang)} />
          <main id="main-content" className="layout-container pb-16 pt-2 md:pt-2">
            {children}
          </main>
          <Footer profile={content.profile} lang={lang} />
          <SeoJsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Md Mahfuzul Islam",
              url: siteUrl.origin,
              author: {
                "@type": "Person",
                name: "Md Mahfuzul Islam",
                jobTitle: "Data Engineer",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}


