import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/providers"
// import { ThemeProvider } from "@/lib/providers"
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JurisVeda - Expert Legal Solutions",
  description: "Your trusted partner for comprehensive legal services. We provide expert counsel and representation across all areas of law.",
  keywords: "legal services, law firm, corporate law, real estate law, employment law, intellectual property, litigation",
  authors: [{ name: "JurisVeda Legal Services" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-auto no-scrollbar" suppressHydrationWarning>
      <body className={cn(inter.className , "dark:bg-neutral-800 bg-blue-200")}>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>  
      </body>
    </html>
  );
}
