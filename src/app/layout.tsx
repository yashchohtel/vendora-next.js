import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Vendora | Multi-Vendor Marketplace",
  description: "Discover products from multiple sellers, shop your favorites, and enjoy a seamless online shopping experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>

  );

}
