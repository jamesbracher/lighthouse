import type { Metadata } from "next";
import { startRoom } from "@/lib/rooms";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lighthouse, by James",
  description: "A tiny text adventure set in a lighthouse",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-room={startRoom}>{children}</body>
    </html>
  );
}
