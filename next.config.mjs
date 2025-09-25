/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // 👈 tells Next to create a static export during build
  output: "export",
  basePath: "/myapp",
  assetPrefix: "/myapp/",
};

export default nextConfig;
