const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/resume/skills",
        destination: "/en/work",
        permanent: true
      },
      {
        source: "/contact/email",
        destination: "/en/contact",
        permanent: true
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
