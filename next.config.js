/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flowbite.com', 'avatars.githubusercontent.com']
  },
  fontLoaders: [
    { loader: '@next/font/google', options: { subsets: ['latin'] } }
  ]
};

module.exports = nextConfig
