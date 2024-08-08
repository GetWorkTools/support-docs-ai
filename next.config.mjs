import { withAxiom } from "next-axiom";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["src/client"],
  },
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
};

export default withAxiom(nextConfig);
