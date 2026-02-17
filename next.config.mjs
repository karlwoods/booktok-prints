/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msm-data-prod.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;