import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/SharedComponent/Navbar";
import Footer from "@/SharedComponent/Footer";

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
    <html lang="en">
      <body className="antialiased selection:bg-secondary selection:text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
