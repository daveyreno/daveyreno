import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { ThemeProvider } from "../components/Theme-Provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DaveyReno - Product Manager",
  description:
    "Product Manager renowned for transforming ideas into reality. With a legendary track record, Dave Reno excels in leading cross-functional teams to launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="h-2 bg-gradient-to-r to-pink-600 from-blue-600"></div>
            <div className="flex justify-center">
              <div className="w-full max-w-7xl mx-4">
                <div className="flex items-center justify-between py-6">
                  <Logo />
                  <Navigation />
                </div>
                {children}
              </div>
            </div>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
