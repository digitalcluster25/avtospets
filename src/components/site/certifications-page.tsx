import Image from "next/image";
import { FooterStatic } from "@/components/site/footer-static";
import { Header } from "@/components/site/header";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./certifications-page.module.css";

type CertificationsPageProps = {
  language: SiteLanguage;
  page: SitePage;
};

const declarations = [
  "Декларація САШМД 01-2025C.pdf",
  "Декларація САШМД 02-2025B.pdf",
  "Декларація САШМД 03-2025А2.pdf",
  "Декларація САШМД 04-2025А1.pdf",
] as const;

const certificates = [
  "Сертифікат відповідності ДСТУ EN 1789:2019 від 15.06.2025, чинний до 14.06.2026.pdf",
  "Сертифікат 13485 № UA.101.QMS.0198-25.00.pdf",
  "Сертифікат СУЯ 9001 Автоспецпром 2026.pdf",
  "Сертифікат якості  PSA_ AVTOSPETSPROM 2023_2027.pdf",
  "UA.46A(b)_0698_05 СЕРТИФІКАТ ТИПУ САШМД ПЕЖО БОКСЕР.pdf",
  "UA.46A(b).0688-07 СЕРТИФІКАТ ТИПУ САШМД Сітроен Джампер.pdf",
  "UA.46A(b).1023_01_ випр №01 СЕРТИФІКАТ ТИПУ САШМД ДАНЖЕЛ Джампер.pdf",
] as const;

function PdfIcon() {
  return (
    <span className={styles.pdfIcon} aria-hidden="true">
      <span className={styles.pdfIconInner}>
        <Image
          src="/figma/certifications-page/pdf-icon.svg"
          alt=""
          fill
          unoptimized
          className={styles.pdfIconAsset}
        />
      </span>
    </span>
  );
}

function FileList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <section className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>

      <div className={styles.fileList}>
        {items.map((item) => (
          <button key={item} type="button" className={styles.fileRow}>
            <PdfIcon />
            <p className={styles.fileName}>{item}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export function CertificationsPage({ language, page }: CertificationsPageProps) {
  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} initialLanguage={language} page={page} />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.content}>
            <div className={styles.titleBlock}>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumbMuted}>Головна</span>
                <span className={styles.breadcrumbMuted}>/</span>
                <span className={styles.breadcrumbCurrent}>Виробництво</span>
              </div>

              <h1 className={styles.title}>Сертифікати та нормативна база</h1>
            </div>

            <div className={styles.description}>
              <p>
                ТОВ &quot;Автоспецпром&quot; має повний комплект необхідних
                ліцензій та сертифікатів.
              </p>
              <p>
                Спеціалізовані автомобілі швидкої медичної допомоги типу А1,
                А2, В, С відповідають вимогам ДСТУ EN 1789:2019 та Порядку
                затвердження конструкції транспортних засобів, їх частин та
                обладнання, затвердженого Наказом Міністерства інфраструктури
                України 17.08.2012 № 521.
              </p>
              <p>
                Інші автомобілі спеціалізованого призначення, які виробляє ТОВ
                «Автоспецпром» відповідають вимогам Порядку затвердження
                конструкції транспортних засобів, їх частин та обладнання,
                затвердженого Наказом Міністерства інфраструктури України
                17.08.2012 № 521.
              </p>
            </div>

            <div className={styles.groups}>
              <FileList title="Декларації" items={declarations} />
              <FileList title="Сертифікати" items={certificates} />
            </div>
          </div>
        </section>
      </main>

      <FooterStatic language={language} />
    </div>
  );
}
