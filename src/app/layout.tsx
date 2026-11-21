import type { Metadata } from "next";
import { Lato, Poppins, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

/* ----------------- FONTS -----------------  */
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

/* ----------------- METADATA -----------------  */
export const metadata: Metadata = {
  title: "Vendora | Multi-Vendor Marketplace",
  description: "Discover products from multiple sellers, shop your favorites, and enjoy a seamless online shopping experience.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  return (

    <html lang="en">
      <body
        className={`${lato.variable} ${poppins.variable} ${montserrat.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
    
  );

}