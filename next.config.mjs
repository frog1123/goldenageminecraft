import path from "path";
import { fileURLToPath } from "url";
import million from "million/compiler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      }
    ],
    domains: ["files.edgestore.dev"]
  }
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Origin', value: 'https://example.com' }, // Replace with your allowed origin
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
  //         { key: 'Access-Control-Allow-Headers', value: 'Content-Type' }
  //       ]
  //     }
  //   ];
  // }
};

const millionConfig = {
  auto: { rsc: true },
  mute: true
};

export default million.next(nextConfig, millionConfig);
