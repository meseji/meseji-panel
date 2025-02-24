/** @type {import('next').NextConfig} */
 

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "scontent.whatsapp.net",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "https://meseji-blog-eight.vercel.app/blog",
      },
      {
        source: "/blog/:path*",
        destination: "https://meseji-blog-eight.vercel.app/blog/:path*",
      },
    ];
  },
};

// export default nextConfig;
 
export default nextConfig;
