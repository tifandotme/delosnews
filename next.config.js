/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static01.nyt.com" }],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default config
