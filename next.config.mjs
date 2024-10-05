/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
