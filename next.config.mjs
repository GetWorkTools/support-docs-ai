import { withAxiom } from "next-axiom";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["src/client"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: `/**/*`,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: `/**/*`,
      },
    ],
  },
};

export default withAxiom(nextConfig);
