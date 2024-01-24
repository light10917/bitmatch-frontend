/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images:{
    unoptimized:true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ]
  }
}

export default nextConfig
