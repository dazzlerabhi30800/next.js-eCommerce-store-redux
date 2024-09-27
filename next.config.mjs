/** @type {import('next').NextConfig} */
// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});


const nextConfig = {
  images: {
    // domains: ["cdn.dummyjson.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withAutoCert(nextConfig);
