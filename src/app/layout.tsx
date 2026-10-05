import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KINETIQ — Creative Technology Studio",
  description:
    "We build things that move. KINETIQ is a creative technology studio designing digital experiences, interfaces, and interactive products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-primary)" }}
      >
        {children}
      </body>
    </html>
  );
}
