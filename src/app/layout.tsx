import type { Metadata } from "next";
import { Libre_Franklin, Playfair_Display } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alive & Well Kombucha | Feeling Good Should Taste Amazing",
  description:
    "Small-batch, handcrafted kombucha from Dallas, TX. Less acidic, more approachable — crafted with botanical infusions for gut, brain, and immune health.",
  keywords: [
    "kombucha",
    "craft kombucha",
    "Dallas kombucha",
    "gut health",
    "probiotics",
    "non-alcoholic",
    "mocktail",
  ],
  openGraph: {
    title: "Alive & Well Kombucha",
    description: "Feeling good should taste amazing.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
