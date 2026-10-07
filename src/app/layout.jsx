import "@/index.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://ahmadsaeeduddin.github.io"),
  title: "Saeed Ud Din Ahmad",
  description:
    "Portfolio of Saeed Ud Din Ahmad - CS student at FAST University specializing in AI/ML, full-stack development, and innovative projects.",
  authors: [{ name: "Saeed Ud Din Ahmad" }],
  icons: {
    icon: [{ url: "/spider-mark.svg", type: "image/svg+xml" }],
    shortcut: "/spider-mark.svg",
    apple: "/spider-mark.svg",
  },
  openGraph: {
    type: "website",
    title: "Saeed Ud Din Ahmad",
    description:
      "Ideas, experiments, adventures, and everything worth building.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saeed Ud Din Ahmad - AI/ML Engineer Portfolio",
    description: "A place where ideas get built, experiments get dangerous, and the line between crazy and possible gets blurry",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
