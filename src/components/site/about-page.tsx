import Image from "next/image";
import { FooterStatic } from "@/components/site/footer-static";
import { Header } from "@/components/site/header";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./about-page.module.css";

type AboutPageProps = {
  language: SiteLanguage;
  page: SitePage;
};

const dealerCards = [
  {
    icon: "/figma/about-page/shield-check.svg",
    title: "Гарантія",
    body: "Доступ до офіційного гарантійного обслуговування у регіональних авторизованих сервісних центрах по всій Україні.",
  },
  {
    icon: "/figma/about-page/wrench.svg",
    title: "Надійність",
    body: "Сервісні центри забезпечені повним комплектом необхідного устаткування та використовують лише оригінальні запасні частини і аксесуари.",
  },
  {
    icon: "/figma/about-page/award.svg",
    title: "Кваліфікація",
    body: "Працівники сервісних центрів постійно удосконалюють свій професійний рівень у фірмових навчальних центрах автовиробника.",
  },
] as const;

const partnerLogos = Array.from({ length: 23 }, (_, index) => ({
  src: `/figma/partners/partner-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Партнер ${index + 1}`,
}));

export function AboutPage({ language, page }: AboutPageProps) {
  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} initialLanguage={language} page={page} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroHead}>
                <div className={styles.breadcrumbs}>
                  <span className={styles.breadcrumbMuted}>Головна</span>
                  <span className={styles.breadcrumbMuted}>/</span>
                  <span className={styles.breadcrumbCurrent}>Про компанію</span>
                </div>
                <h1 className={styles.heroTitle}>Про компанію</h1>
              </div>

              <div className={styles.heroBody}>
                <p>
                  ТОВ &quot;Автоспецпром&quot; — перший та найбільший в Україні
                  виробник автомобілів швидкої (екстреної) медичної допомоги.
                </p>
                <p>
                  Свою діяльність підприємство розпочало в 2012 році. В даний
                  час потужності ТОВ &quot;Автоспецпром&quot; дозволяють випускати на
                  місяць до 100 одиниць автомобілів швидкої допомоги, а також
                  транспорту спеціального призначення, в тому числі — для
                  перевезення людей з обмеженими фізичними можливостями,
                  мобільних амбулаторій тощо.
                </p>
                <p>
                  За час своєї роботи підприємство випустило більше 3100 машин
                  швидкої допомоги всіх типів, з яких більше 1600 — вже після
                  початку повномасштабного вторгнення.
                </p>
              </div>
            </div>

            <div className={styles.heroImageCard}>
              <Image
                src="/figma/about-manufacturing/company-image.webp"
                alt="Про компанію"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                className={styles.heroImage}
                priority
              />
            </div>
          </div>

          <div className={styles.heroGlow} aria-hidden="true" />
        </section>

        <section className={styles.dealerSection}>
          <div className={styles.dealerTitleBlock}>
            <h2 className={styles.sectionTitle}>Офіційний дилер</h2>
            <p className={styles.dealerBody}>
              ТОВ «Автоспецпром» є офіційним дилером корпорації Stellantis —
              другого за величиною виробника автомобілів в Європі, власника
              брендів Peugeot, Citroen, Opel, Vauxhall та DS Automobiles.
            </p>
          </div>

          <div className={styles.dealerCards}>
            {dealerCards.map((card) => (
              <article key={card.title} className={styles.dealerCard}>
                <div className={styles.dealerIconWrap}>
                  <Image
                    src={card.icon}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className={styles.dealerIcon}
                  />
                </div>

                <div className={styles.dealerTextBlock}>
                  <h3 className={styles.dealerCardTitle}>{card.title}</h3>
                  <p className={styles.dealerCardBody}>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.teamSection}>
          <div className={styles.teamCopy}>
            <h2 className={styles.teamTitle}>Фахівці</h2>
            <p className={styles.teamBody}>
              Команда ТОВ &quot;Автоспецпром&quot; налічує близько 100
              співробітників, більшість із яких є високопрофесійними технічними
              спеціалістами з великим досвідом роботи в автомобільній
              промисловості. Адміністративна частина колективу складає лише 8 %.
              Близько 12 % працівників компанії зайняті в
              інженерно-конструкторських розробках.
            </p>
          </div>

          <div className={styles.teamImageCard}>
            <Image
              src="/figma/about-manufacturing/manufacturing-image.webp"
              alt="Фахівці"
              fill
              loading="lazy"
              sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
              className={styles.teamImage}
            />
          </div>
        </section>

        <section className={styles.partnersSection}>
          <div className={styles.partnersTitleBlock}>
            <h2 className={styles.sectionTitle}>Маємо честь співпрацювати</h2>
            <p className={styles.partnersBody}>
              Виробляємо автомобілі швидкої допомоги для державних та приватних
              медичних установ України, неурядових і міжнародних організацій.
            </p>
          </div>

          <div className={styles.partnersGrid}>
            {partnerLogos.map((logo) => (
              <div key={logo.src} className={styles.partnerCard}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 42vw, 266px"
                  className={styles.partnerLogo}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterStatic language={language} />
    </div>
  );
}
