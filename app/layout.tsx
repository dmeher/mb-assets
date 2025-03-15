import "@/styles/globals.css";
import "./styles.css";
import { Metadata, Viewport } from "next";
// import { Link } from "@heroui/link";
// import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
// import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={"min-h-screen bg-background antialiased"}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen pt-[1rem]">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow">
              {children}
            </main>
            {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">HeroUI</p>
              </Link>
            </footer> */}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
