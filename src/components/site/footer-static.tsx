import Image from "next/image";
import Link from "next/link";
import { footerCopyByLanguage } from "@/components/site/footer-copy";
import type { SiteLanguage } from "@/components/site/site-language";
import styles from "./footer.module.css";

type FooterStaticProps = {
  language: SiteLanguage;
};

export function FooterStatic({ language }: FooterStaticProps) {
  const copy = footerCopyByLanguage[language];

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
              <span className={styles.socialButton} title="Instagram">
                <span
                  className={`${styles.socialIcon} ${styles.socialIconInstagram}`}
                  aria-hidden="true"
                />
              </span>
              <span className={styles.socialButton} title="Facebook">
                <span
                  className={`${styles.socialIcon} ${styles.socialIconFacebook}`}
                  aria-hidden="true"
                />
              </span>
              <span className={styles.socialButton} title="LinkedIn">
                <span
                  className={`${styles.socialIcon} ${styles.socialIconLinkedin}`}
                  aria-hidden="true"
                />
              </span>
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
            <span className={styles.bottomLink}>{copy.privacy}</span>
            <span className={styles.bottomLink}>{copy.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
