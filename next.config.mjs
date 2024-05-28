/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content2.rozetka.com.ua",
        port: "",
      },
      {
        protocol: "https",
        hostname: "content.rozetka.com.ua",
        port: "",
      },
    ],
  },
};

export default nextConfig;
