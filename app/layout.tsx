import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from './providers/ClientProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johnny Store - Sua Loja Premium",
  description: "E-commerce moderno com produtos premium e experiência de compra única",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any"
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32"
      }
    ],
    apple: {
      url: "/apple-icon.png",
      sizes: "180x180"
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-dark-primary`}>
        <ClientProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
