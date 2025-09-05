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
  title: "Juris Veda - Essential Legal Companion",
  description: "Your essential legal companion, simplifying complex topics with expertly curated notes, landmark case laws, and vital current affairs for students and professionals alike.",
  keywords: "legal companion, law notes, case laws, legal studies, current affairs, legal education, law students, legal professionals, landmark cases, legal resources",
  authors: [{ name: "Juris Veda" }],
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
      <body className={cn(inter.className, "bg-prime")}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange={true}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>  
      </body>
    </html>
  );
}
