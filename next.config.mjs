/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
