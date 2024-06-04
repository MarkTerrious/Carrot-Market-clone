/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        taint: true,
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    },
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
    },
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
 *  if experimental taint === true 
 *      객체 내용 중 아무거나 노출 되었을 때, 에러 메세지 출력
 *      experimental_taintObjectReference("ERROR MESSAGE", object) 
 * 
 *      객체 내용 중 일부가 노출 되었을 때, 에러 메세지 출력
 *      experimental_taintUniqueValue("ERROR MESSAGE", object, object.property)
 * }
 */

export default nextConfig;
