/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Важное: собираем статику в /out
  output: "export"
};

export default nextConfig;
