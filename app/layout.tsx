import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getPortfolioContent } from "@/lib/content-service";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md. Mahfuzul Islam | Data Engineer & Engineering Systems Builder",
  description:
    "Personal portfolio of Md. Mahfuzul Islam - data engineering, applied machine learning, electrical engineering simulation, and AI systems.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPortfolioContent();

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sourceSerif.variable} antialiased`}>
        <div className="site-shell">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Navbar profile={content.profile} />
          <main
            id="main-content"
            className="mx-auto w-full max-w-6xl px-5 pb-24 pt-[8.5rem] sm:px-6 md:px-10 md:pt-32"
          >
            {children}
          </main>
          <Footer profile={content.profile} />
        </div>
      </body>
    </html>
  );
}
