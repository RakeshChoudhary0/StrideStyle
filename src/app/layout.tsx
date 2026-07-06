import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "STRIDE STYLE | Premium Luxury Streetwear",
  description: "Elevated essentials for the modern lifestyle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-dvh overflow-auto light"
      style={{ colorScheme: "light" }}
    >
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
