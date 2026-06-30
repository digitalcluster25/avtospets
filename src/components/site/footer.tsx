"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteLanguage } from "@/components/site/language-provider";
import styles from "./footer.module.css";

export function Footer() {
  const { language } = useSiteLanguage();
  const copy =
    language === "en"
      ? {
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
          copyright: "© 2026 Avtospecprom. All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Use",
        }
      : {
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
          copyright: "© 2026 Avtospecprom. Всі права захищені.",
          privacy: "Політика конфіденційності",
          terms: "Умови використання",
        };

  return (
    <footer className={styles.footer}>
      <div className={styles.glowRight} aria-hidden="true" />
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <Image
              src="/figma/footer-2821/logo-dark.svg"
              alt="Автоспецпром"
              width={259}
              height={39}
              unoptimized
              className={styles.logo}
            />
            <p className={styles.description}>{copy.description}</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialButton} aria-label="Instagram">
              <span
                className={`${styles.socialIcon} ${styles.socialIconInstagram}`}
                aria-hidden="true"
              />
            </a>
            <a href="#" className={styles.socialButton} aria-label="Facebook">
              <span
                className={`${styles.socialIcon} ${styles.socialIconFacebook}`}
                aria-hidden="true"
              />
            </a>
            <a href="#" className={styles.socialButton} aria-label="LinkedIn">
              <span
                className={`${styles.socialIcon} ${styles.socialIconLinkedin}`}
                aria-hidden="true"
              />
            </a>
          </div>
          </div>

          <div className={styles.navColumn}>
            <p className={styles.columnLabel}>{copy.navLabel}</p>
            <div className={styles.navList}>
              {copy.nav.map((item) => (
                <Link key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.contactsColumn}>
            <p className={styles.columnLabel}>{copy.contactLabel}</p>
            <div className={styles.contactList}>
              <a href="tel:+380442336740" className={styles.phoneRow}>
                <span
                  className={`${styles.contactIcon} ${styles.contactIconCall}`}
                  aria-hidden="true"
                />
                <span className={styles.phoneText}>{copy.phone}</span>
              </a>
              <a href="mailto:info@avtospetsprom.com.ua" className={styles.contactRow}>
                <span
                  className={`${styles.contactIcon} ${styles.contactIconSms}`}
                  aria-hidden="true"
                />
                <span className={styles.contactText}>{copy.email}</span>
              </a>
              <div className={styles.addressRow}>
                <span
                  className={`${styles.contactIcon} ${styles.contactIconLocation}`}
                  aria-hidden="true"
                />
                <p className={styles.contactTextBlock}>
                  {copy.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copy.copyright}</p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>
              {copy.privacy}
            </a>
            <a href="#" className={styles.bottomLink}>
              {copy.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
