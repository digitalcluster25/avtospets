import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Oswald, Rubik } from "next/font/google";
import { ContactFormProvider } from "@/components/site/contact-form-provider";
import { LanguageProvider } from "@/components/site/language-provider";
import "./globals.css";

const headingFont = Oswald({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

const bodyFont = Rubik({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const uiFont = Inter({
  variable: "--font-ui",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Автоспецпром",
    template: "%s | Автоспецпром",
  },
  description:
    "Headless-фронт для промо-сайта Автоспецпром на Next.js и WordPress.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("avtospets-language")?.value;
  const initialLanguage = savedLanguage === "en" ? "en" : "ua";
  const documentLanguage = initialLanguage === "en" ? "en" : "uk";

  return (
    <html
      lang={documentLanguage}
      className={`${headingFont.variable} ${bodyFont.variable} ${uiFont.variable}`}
    >
      <body>
        <LanguageProvider initialLanguage={initialLanguage}>
          <ContactFormProvider>{children}</ContactFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
