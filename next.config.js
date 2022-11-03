/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com']
  }
};

module.exports = nextConfig
