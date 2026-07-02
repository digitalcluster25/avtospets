import Image from "next/image";
import { FooterStatic } from "@/components/site/footer-static";
import { Header } from "@/components/site/header";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./testimonials-page.module.css";

type TestimonialsPageProps = {
  language: SiteLanguage;
  page: SitePage;
};

const testimonials = [
  {
    title:
      "ТМО «Центр екстреної медичної допомоги і медицини катастроф» у Кіровоградській області",
    body: `ТОВ "Автоспецпром" повністю виконало свої зобов'язання відповідно до договору – своєчасно поставило автомобілі швидкої медичної допомоги належної якості та кількості. ТМО "Центр екстреної медичної допомоги і медицини катастроф" у Кіровоградській області рекомендує ТОВ "Автоспецпром" як надійного та відповідального постачальника.`,
    heightClassName: styles.cardTall,
  },
  {
    title:
      "Одеський обласний центр екстреної медичної допомоги і медицини катастроф",
    body: `ТОВ "Автоспецпром" здійснено поставку автомобілів належної якості та у встановлені терміни. Автомобілі швидкої медичної допомоги мають хороші експлуатаційні властивості, оснащені ергономічним та зручним медичним салоном, який поєднує в собі функціональність та надійність.`,
    heightClassName: styles.cardTall,
  },
  {
    title: "Київмедспецтранс",
    body: `ТОВ "Автоспецпром" повністю виконало свої зобов'язання відповідно до договору – своєчасно поставило автомобілі швидкої медичної допомоги належної якості та кількості. ТМО "Центр екстреної медичної допомоги і медицини катастроф" у Кіровоградській області рекомендує ТОВ "Автоспецпром" як надійного та відповідального постачальника.`,
    heightClassName: styles.cardMedium,
  },
  {
    title:
      'КУОЗ "Центр екстреної медичної допомоги і медицини катастроф" у Харківській області',
    body: `Експлуатація автомобілів швидкої медичної допомоги виробництва ТОВ "Автоспецпром" дозволяє значно полегшити працю медпрацівників, дозволяє організувати та проводити лікувальний процес на високому медичному рівні, що відповідає вимогам медичного персоналу.`,
    heightClassName: styles.cardMedium,
  },
  {
    title: "Медична мережа “Добробут”",
    body: `ТОВ “Автоспецпром” є найбільш клієнтоорієнтованим та сучасним виробником серед українських постачальників і не поступається в якості закордонним європейським виробникам.`,
    heightClassName: styles.cardShort,
  },
] as const;

export function TestimonialsPage({ language, page }: TestimonialsPageProps) {
  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} initialLanguage={language} page={page} />

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.heading}>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumbMuted}>Головна</span>
                <span className={styles.breadcrumbMuted}>/</span>
                <span className={styles.breadcrumbCurrent}>Відгуки</span>
              </div>

              <div className={styles.titleRow}>
                <h1 className={styles.title}>Відгуки</h1>
              </div>
            </div>

            <div className={styles.grid}>
              {testimonials.map((item) => (
                <article
                  key={item.title}
                  className={`${styles.card} ${item.heightClassName}`}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.quoteWrap}>
                      <Image
                        src="/figma/testimonials-page/quote.svg"
                        alt=""
                        width={32}
                        height={23}
                        unoptimized
                        className={styles.quote}
                      />
                    </div>
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                  </div>

                  <p className={styles.cardBody}>{item.body}</p>

                  <button type="button" className={styles.documentButton}>
                    <Image
                      src="/figma/testimonials-page/document.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className={styles.documentIcon}
                    />
                    <span className={styles.documentLabel}>Лист-відгук</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterStatic language={language} />
    </div>
  );
}
