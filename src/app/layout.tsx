import "./globals.css";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
import Providers from "./ChackraProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
