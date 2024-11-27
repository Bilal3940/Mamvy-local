/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,
  i18n,
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  images: {
    domains: ['memvy-bucket.s3.amazonaws.com', 'd2q6d79jw25y62.cloudfront.net', 'cdn.memvy.com'],
  },
  async redirects(){
    return [
      {
        source: '/privacy',
        destination: 'https://docs.google.com/document/d/1aLHQCkPENo8eu54vdWvDhxQyAoTXuf9JSvZyIW4NbeI/edit#heading=h.7fonzn1xb1fl',
        permanent: true,
      },
      {
        source: '/terms',
        destination: 'https://docs.google.com/document/d/1hy7z7JzUmzP9ivBylIv3RCTr4QXusuT1kmqAc3I-30Y/edit#heading=h.7fonzn1xb1fl',
        permanent: true,
      },
    ];
  }
};

module.exports = withPWA(nextConfig);
