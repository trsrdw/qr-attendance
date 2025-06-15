import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Zentry",
  description: "Event RSVP & QR Attendance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
