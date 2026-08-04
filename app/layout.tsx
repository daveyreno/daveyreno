import Header from "@/components/common/Header";
import JsonLd from "@/components/site/JsonLd";
import CareerField from "@/components/visual/CareerField";
import { siteGraph } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * No `alternates.canonical` here on purpose. Metadata is merged down the tree,
 * so a canonical set at the root is inherited by every page that doesn't
 * override it — which is the classic bug that points the whole site at the
 * homepage. Each route declares its own.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://daveyreno.com"),
  title: {
    default: `${SITE_NAME}, Product Manager`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME}, Product Manager`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
  },
  // The image itself comes from app/opengraph-image.tsx; this is only the
  // instruction to unfurl it large rather than as a thumbnail.
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}, Product Manager`,
    description: SITE_DESCRIPTION,
  },
};

/**
 * Direction contract. Emitted as a real HTML comment (React strips JSX ones)
 * so the decision this build was made under stays auditable in shipped output.
 */
const CONTRACT = `<!--
THESIS: A career rendered as one continuous dye field whose colour is drawn from
the real brands Dave shipped — the atmosphere IS the index of the work. Refuses
the bordered-card resume grid every product portfolio ships, and refuses the
decorative-gradient hero that is its predictable opposite.
OWN-WORLD: Near-black #060608 ground, zero corner radius, one hairline rule at
12% ink. All colour lives in the WebGL field and the seven brand signatures; no
component may introduce any. Archivo variable (wdth axis) for display, Geist
Mono for every label — tiny, tracked, uppercase. Columnar top-aligned type,
extreme scale contrast.
STORY: A recruiter sees a site that could only have been built by someone who
does product, design and code; reads the career as a colour spectrum; believes
the "I deliver value. Fast." claim because the page itself is the evidence;
contacts him.
FIRST VIEWPORT: Live field full-bleed. Identity top-left, availability marker
and contact action top-right, three-column standing index beneath. Monumental
statement lower-left at up to 8.5rem. Field left untouched through the centre.
FORM: Brief-pinned world (user reference image) — beats the roll; grounded
candidate 7, seed key d87d903d.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds `js` to this
    // element before React hydrates, which is a deliberate mismatch.
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Runs before first paint. Everything that animates in is only hidden
            while this class is present, so a failed bundle degrades to a plain
            visible page instead of a blank one. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${geistMono.variable} antialiased`}>
        <JsonLd data={siteGraph} />
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <CareerField>
          {/*
            No global footer: the home page is a single locked viewport and must
            not scroll. The inner pages render Footer themselves.
          */}
          <div className="relative z-10 flex min-h-dvh flex-col">
            <Header />
            <main id="main" className="flex flex-1 flex-col">
              {children}
            </main>
          </div>
        </CareerField>
      </body>
    </html>
  );
}
