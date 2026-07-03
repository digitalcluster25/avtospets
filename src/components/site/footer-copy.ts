import type { SiteLanguage } from "@/components/site/site-language";

export const footerCopyByLanguage = {
  en: {
    description:
      "Certified production of ambulances for public and private medical institutions of Ukraine.",
    navLabel: "Navigation",
    contactLabel: "Contacts",
    nav: [
      { label: "Our vehicles", href: "/main" },
      { label: "Production", href: "/production" },
      { label: "Service", href: "/services" },
      { label: "Certificates", href: "/sertifications" },
      { label: "About company", href: "/aboutus" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contacts", href: "/contacts" },
    ],
    phone: "+380 (44) 233-67-40",
    email: "info@avtospetsprom.com.ua",
    address: ["9 Oksamytova St.", "Petropavlivska Borshchahivka,", "Kyiv region, 08130"],
    copyright: "© 2026 Avtospetsprom. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  ua: {
    description:
      "Сертифіковане виробнитство автомобілів швидкої допомоги для державних і приватних медичних установ України.",
    navLabel: "Навігація",
    contactLabel: "Контакти",
    nav: [
      { label: "Наші авто", href: "/main" },
      { label: "Виробництво", href: "/production" },
      { label: "Сервіс", href: "/services" },
      { label: "Сертифікати", href: "/sertifications" },
      { label: "Про компанію", href: "/aboutus" },
      { label: "Відгуки", href: "/testimonials" },
      { label: "Контакти", href: "/contacts" },
    ],
    phone: "+380 (44) 233-67-40",
    email: "info@avtospetsprom.com.ua",
    address: ["Вул. Оксамитова, 9", "Петропавлівська Борщагівка,", "Київська обл., 08130"],
    copyright: "© 2026 Avtospetsprom. Всі права захищені.",
    privacy: "Політика конфіденційності",
    terms: "Умови використання",
  },
} satisfies Record<
  SiteLanguage,
  {
    description: string;
    navLabel: string;
    contactLabel: string;
    nav: Array<{ label: string; href: string }>;
    phone: string;
    email: string;
    address: string[];
    copyright: string;
    privacy: string;
    terms: string;
  }
>;
