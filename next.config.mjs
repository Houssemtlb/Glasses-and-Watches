/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', // Specify HTTPS protocol (optional)
            hostname: 'firebasestorage.googleapis.com',
            port: '', // Leave empty for any port
            pathname: '/**', // Allow all paths within the domain
          },
        ],
      },
};

export default nextConfig;
