/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost", 
        ],
        remotePatterns: [
            {
                hostname: "https://avatars.githubusercontent.com"
            },
            {
                hostname: "avatars.githubusercontent.com"
            }
        ]
    }
};

/**
 * images: {
 *  remotePatterns: [
 *      {
 *          hostname: ""
 *      },
 *      {
 *          hostname: ""
 *      }
 *  ]
 *  
 *  
 * 
 * }
 */

export default nextConfig;
