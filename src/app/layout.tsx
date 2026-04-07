import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/theme/ThemeWrapper";
import { BlogSidebar } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peanut的冒险日志",
  description: "Vibe Coding Journey - 记录学习Claude Code进行vibe coding的过程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeWrapper>
          <div className="flex min-h-screen">
            <BlogSidebar />
            <main className="flex-1 ml-16 transition-all duration-200">
              {children}
            </main>
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
