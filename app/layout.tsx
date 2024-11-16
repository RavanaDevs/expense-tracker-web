import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideDrawer from "./components/ui/SideDrawer";
import { ThemeProvider } from "./contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your daily expenses and view statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors`}>
        <ThemeProvider>
          <SideDrawer />
          <main className="container mx-auto px-4 py-4 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-slate-900 dark:text-white">
              Expense Tracker
            </h1>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
