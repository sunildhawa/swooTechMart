/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack ko force karna ki Tailwind config ko dekhe
  experimental: {
    turbo: {
      rules: {
        '*.css': {
          loaders: ['postcss-loader'],
          as: 'style',
        },
      },
    },
  },
};

export default nextConfig;