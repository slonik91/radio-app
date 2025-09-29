export const metadata = {
  title: "Моё онлайн-радио",
  description: "Простой плеер на Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, background: "#fff" }}>{children}</body>
    </html>
  );
}
