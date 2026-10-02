/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    // ESLint remains available through `npm run lint`; it should not block
    // generation of the static GitHub Pages export.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
