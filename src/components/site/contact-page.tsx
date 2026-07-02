"use client";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SiteButton } from "@/components/site/button";
import { useContactForm } from "@/components/site/contact-form-provider";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./contact-page.module.css";

type ContactPageProps = {
  language: SiteLanguage;
  page: SitePage;
};

const contactRows = [
  {
    label: "Адреса",
    lines: [
      "Вул. Оксамитова, 9",
      "с. Петропавлівська Борщагівка,",
      "Київська обл., 08130",
    ],
  },
  {
    label: "Email",
    lines: ["info@avtospetsprom.com.ua"],
  },
  {
    label: "Телефон",
    lines: ["+380 (44) 233-67-40"],
  },
] as const;

export function ContactPage({ language, page }: ContactPageProps) {
  const { openContactForm } = useContactForm();

  return (
    <div className={styles.page}>
      <div className={styles.topArea}>
        <Header
          currentPath={page.uri}
          initialLanguage={language}
          page={page}
          transparent
        />

        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroShell}>
              <div className={styles.leftPanel}>
                <div className={styles.copyBlock}>
                  <div className={styles.headGroup}>
                    <div className={styles.breadcrumbs}>
                      <span className={styles.breadcrumbMuted}>Головна</span>
                      <span className={styles.breadcrumbMuted}>/</span>
                      <span className={styles.breadcrumbCurrent}>Контакти</span>
                    </div>

                    <h1 className={styles.title}>Контакти</h1>
                  </div>

                  <p className={styles.description}>
                    Наша команда експертів готова допомогти вам знайти
                    оптимальні рішення для захисту та інновацій. Чекаємо на вашу
                    заявку та сподіваємося на плідну співпрацю!
                  </p>
                </div>

                <SiteButton
                  href="/contacts"
                  variant="primary"
                  size="l"
                  onClick={(event) => {
                    event.preventDefault();
                    openContactForm();
                  }}
                >
                  Звʼязатися з нами
                </SiteButton>
              </div>

              <div className={styles.rightPanel}>
                <div className={styles.contactList}>
                  {contactRows.map((row) => (
                    <section key={row.label} className={styles.contactRow}>
                      <p className={styles.contactLabel}>{row.label}</p>
                      <div className={styles.contactValue}>
                        {row.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer language={language} />
    </div>
  );
}
