/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // делает сборку самодостаточной (удобно для контейнеров/хостингов)
  output: "standalone",

  // если вдруг будешь добавлять оптимизацию изображений через <Image/>,
  // сюда можно перечислить свои домены-картинок:
  // images: { domains: ["example.com"] },
};

export default nextConfig;
