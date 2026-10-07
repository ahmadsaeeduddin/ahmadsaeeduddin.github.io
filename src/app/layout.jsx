import "@/index.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://ahmadsaeeduddin.github.io"),
  title: "Saeed Ud Din Ahmad",
  description:
    "Portfolio of Saeed Ud Din Ahmad - CS student at FAST University specializing in AI/ML, full-stack development, and innovative projects.",
  authors: [{ name: "Saeed Ud Din Ahmad" }],
  openGraph: {
    type: "website",
    title: "Saeed Ud Din Ahmad",
    description:
      "Explore innovative AI/ML projects, full-stack applications, and cutting-edge research by Saeed Ud Din Ahmad.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saeed Ud Din Ahmad - AI/ML Engineer Portfolio",
    description: "Innovative AI/ML projects and full-stack development portfolio",
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
