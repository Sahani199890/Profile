import type { Metadata, Viewport } from "next";
import "./globals.css";
const title = "Abhishek Sahani | Software Engineer & Java Full Stack Developer";
const description =
  "Explore Abhishek Sahani’s work in Java full-stack development, backend systems, React applications, and AI engineering.";
export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Abhishek Sahani" }],
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
  icons: { icon: "/mark.svg" },
};
export const viewport: Viewport = {
  themeColor: "#080b12",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
