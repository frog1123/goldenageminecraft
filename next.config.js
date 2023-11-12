const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      }
    ]
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
