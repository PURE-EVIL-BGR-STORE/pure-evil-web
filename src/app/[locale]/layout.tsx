import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import Script from "next/script";


const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});


export const metadata: Metadata = {
  title: "PURE EVIL STORE",
  description: "A store for all your evil needs.",
  icons: { icon: "/PURE_EVIL_LOGO_4.png" },
};

import { CartProvider } from "@/features/cart/context/CartContext";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col bg-background" suppressHydrationWarning>
        {process.env.NODE_ENV === "development" && (
          <Script
            id="suppress-hydration-errors"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const origError = console.error;
                  console.error = function(...args) {
                    const msg = args[0];
                    if (typeof msg === 'string' && (
                      msg.includes('bis_skin_checked') ||
                      msg.includes('hydration-mismatch') ||
                      msg.includes('Hydration failed') ||
                      msg.includes('did not match') ||
                      msg.includes('Encountered a script tag')
                    )) {
                      return;
                    }
                    origError.apply(console, args);
                  };
                })();
              `
            }}
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <CartProvider>
              {children}
              <Toaster position="top-right" richColors />
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
