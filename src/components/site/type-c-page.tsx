"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, type CSSProperties } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SiteButton } from "@/components/site/button";
import type { SitePage } from "@/lib/site/types";
import styles from "./type-c-page.module.css";

type TypeCPageProps = {
  page: SitePage;
};

type SpecIconInsets = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

const TYPE_C_BRAND_SCROLL_KEY = "type-c-brand-scroll-y";

const chassisTabs = [
  {
    id: "peugeot",
    label: "Peugeot",
    href: "/avtomobili-type-c/peugeot",
    asset: "/figma/type-c/chassis-peugeot.png",
    assetClassName: styles.peugeotLogoImage,
    className: styles.tabPeugeot,
  },
  {
    id: "citroen",
    label: "Citroen",
    href: "/avtomobili-type-c/citroen",
    asset: "/figma/type-c/chassis-citroen.png",
    assetClassName: styles.citroenLogoImage,
    className: styles.tabCitroen,
  },
  {
    id: "ford",
    label: "Ford",
    href: "/avtomobili-type-c/ford",
    asset: "/figma/type-c/chassis-ford.png",
    assetClassName: styles.fordLogoImage,
    isWideLogo: true,
    className: styles.tabFord,
  },
  {
    id: "mercedes",
    label: "Mercedes",
    href: "/avtomobili-type-c/mercedes",
    asset: "/figma/type-c/chassis-mercedes.png",
    assetClassName: styles.mercedesLogoImage,
    className: styles.tabMercedes,
  },
] as const;

const typeCBrandContent = {
  peugeot: {
    productImage: "/figma/type-c/product-vehicle.png",
    productImageAlt: "Peugeot Boxer",
    productTitle:
      "Автомобіль швидкої медичної допомоги броньований на базі шасі Peugeot Boxer",
  },
  citroen: {
    productImage: "/figma/type-c/product-vehicle.png",
    productImageAlt: "Peugeot Boxer",
    productTitle:
      "Автомобіль швидкої медичної допомоги броньований на базі шасі Peugeot Boxer",
  },
  ford: {
    productImage: "/figma/type-c/product-vehicle.png",
    productImageAlt: "Peugeot Boxer",
    productTitle:
      "Автомобіль швидкої медичної допомоги броньований на базі шасі Peugeot Boxer",
  },
  mercedes: {
    productImage: "/figma/type-c/product-vehicle.png",
    productImageAlt: "Peugeot Boxer",
    productTitle:
      "Автомобіль швидкої медичної допомоги броньований на базі шасі Peugeot Boxer",
  },
} as const;

const specCards = [
  {
    title: "Двигун",
    body: "Четирьохциліндровий дизельний з турбонагнітаче та з проміжним охолоджувачем, потужність 140 к.с. з робочим обʼємом - 2179 см. куб.",
    icon: "/figma/type-c/spec-engine.svg",
    iconInsets: {
      top: "12.5%",
      right: "6.37%",
      bottom: "13.29%",
      left: "6.25%",
    },
    wide: true,
    descriptionClassName: styles.specBodyWide,
  },
  {
    title: "Максимальна швидкість",
    body: "156 км/год",
    icon: "/figma/type-c/spec-speed.svg",
    iconInsets: {
      top: "12.18%",
      right: "12.63%",
      bottom: "12.96%",
      left: "12.51%",
    },
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Коробка передач",
    body: "6-ступенева, механічна",
    icon: "/figma/type-c/spec-gearbox.svg",
    iconInsets: {
      top: "14.29%",
      right: "16.31%",
      bottom: "15.07%",
      left: "16.19%",
    },
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Підвіска передня",
    body: "Незалежна типу “Мак Ферсон”",
    icon: "/figma/type-c/spec-front-suspension.svg",
    iconInsets: {
      top: "12.18%",
      right: "18.19%",
      bottom: "12.96%",
      left: "18.06%",
    },
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Підвіска задня",
    body: "Залежна на поздовніх ресорах, опційно пневматична",
    icon: "/figma/type-c/spec-rear-suspension.svg",
    iconInsets: {
      top: "6.62%",
      right: "22.91%",
      bottom: "7.41%",
      left: "22.79%",
    },
    descriptionClassName: styles.specBodyTop,
  },
  {
    title: "Тип приводу",
    body: "Передній",
    icon: "/figma/type-c/spec-drive.svg",
    iconInsets: {
      top: "12.84%",
      right: "18.81%",
      bottom: "13.62%",
      left: "18.69%",
    },
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Пасажиромісткість",
    body: "4 особи та пацієнт",
    icon: "/figma/type-c/spec-passengers.svg",
    iconInsets: {
      top: "16.75%",
      right: "12.56%",
      bottom: "17.53%",
      left: "12.44%",
    },
    descriptionClassName: styles.specBodyCenter,
  },
] as const;

function getSpecIconStyle(insets: SpecIconInsets): CSSProperties {
  return {
    "--spec-icon-top": insets.top,
    "--spec-icon-right": insets.right,
    "--spec-icon-bottom": insets.bottom,
    "--spec-icon-left": insets.left,
  } as CSSProperties;
}

const medicalSections = [
  {
    title: "Медичний салон",
    items: [
      "Звуко-тепло-віброізоляція",
      "Заставні для металопластикових панелей",
      "Кронштейни для медприладів з можливістю швидкого знімання",
      "Кріплення для спинної дошки",
      "Утримувачі для ковшових нош",
      "Заставні під кронштейни для медприладів",
      "Підсилення стін і стелі",
    ],
  },
  {
    title: "Підлога медичного салону",
    items: [
      "Вологостійка фанера",
      "Підлогове водонепроникне, антистатичне, стійке до впливу дезінфікуючих засобів покриття, що запобігає ковзанню",
    ],
  },
  {
    title: "Стеля медичного салону",
    items: [
      "Поручні стельові для утримання під час руху",
      "Тримачі для крапельниць на стелі",
    ],
  },
  {
    title: "Перегородка",
    items: ["Перегородка між кабіною із зсувним екранованим вікном"],
  },
  {
    title: "Скління медичного салону",
    items: [
      "Скління бокових та задніх дверей",
      "Екранування скла для забезпечення усамітнення пацієнта",
    ],
  },
  {
    title: "Опалення та вентиляція",
    items: [
      "Люк стельовий багатопозиційний для вентиляції та евакуації",
      "Вентилятор стельовий припливно-витяжної дії",
      "Автономний опалювач салону Eberspächer",
      "Кондиціонер медичного салону.",
    ],
  },
] as const;

const extraEquipment = [
  "ESP, ABS, EBA, EBD, Hill Start Assist адаптована ходова частина",
  "Бортовий комп'ютер",
  "Кондиціонер",
  "Подушка безпеки водія",
  "Електронний іммобілайзер",
  "Центральний замок + пульт PLIP",
  "3-х крапкові ремені безпеки",
  "Передні електросклопідйомники",
  "Зовнішні дзеркала з підігрівом та електрорегулюванням",
  "Протитуманні фари",
  "Радіоприймач+ Bluetooth + USB-роз'єм",
  "Круїз-контроль",
  "Задні датчики паркування",
  "Гідропідсилювач керма адаптивний",
  "Програмований передпусковий догрівач двигуна Webasto Thermo Top C (5 кВт)",
  "Кермова колонка що регулюється за вильотом",
  "Розетка 12В",
  "Аудіо підготовка",
  "Праві бокові зсувні двері",
  "Розпашні задні двері з можливістю відкривання на 270 градусів",
  "Сталні диски R16",
  "Запасне колесо зі стальним диском",
  "Двомісне пасажирське сидіння",
  "Оздоблення салону – чорна тканина",
] as const;

function DownloadArrow() {
  return (
    <Image
      src="/figma/type-c/button-arrow.svg"
      alt=""
      width={20}
      height={20}
      className={styles.downloadArrow}
    />
  );
}

export function TypeCPage({ page }: TypeCPageProps) {
  const brandSlug =
    chassisTabs.find((tab) => page.uri.endsWith(`/${tab.id}`))?.id ?? "peugeot";
  const activeBrand = typeCBrandContent[brandSlug];

  useEffect(() => {
    const savedScroll = window.sessionStorage.getItem(TYPE_C_BRAND_SCROLL_KEY);

    if (!savedScroll) {
      return;
    }

    window.scrollTo(0, Number(savedScroll));
    window.sessionStorage.removeItem(TYPE_C_BRAND_SCROLL_KEY);
  }, [page.uri]);

  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} page={page} transparent />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroBadge} aria-hidden="true">
                B
              </div>

              <div className={styles.breadcrumbs}>
                <span>Головна</span>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>Тип С</span>
              </div>

              <div className={styles.heroTextBlock}>
                <h1 className={styles.heroTitle}>Тип С</h1>
                <p className={styles.heroDescription}>
                  Реанімобіль для екстреної медичної допомоги, транспортування
                  та моніторингу пацієнтів у тяжкому або критичному стані.
                </p>
              </div>
            </div>

            <div className={styles.heroImageWrap}>
              <Image
                src="/figma/type-c/hero-vehicle.png"
                alt="Автомобіль швидкої медичної допомоги типу C"
                width={734}
                height={540}
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>Доступні шасі для типа C</h2>
          </div>

          <div className={styles.tabsRow}>
            {chassisTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                scroll={false}
                className={`${brandSlug === tab.id ? styles.tabActive : styles.tab} ${tab.className}`}
                onClick={() => {
                  window.sessionStorage.setItem(
                    TYPE_C_BRAND_SCROLL_KEY,
                    String(window.scrollY),
                  );
                }}
              >
                <span
                  className={
                    tab.isWideLogo ? styles.tabWideLogoBox : styles.tabLogoBox
                  }
                >
                  <Image
                    src={tab.asset}
                    alt=""
                    width={tab.isWideLogo ? 62 : 40}
                    height={40}
                    className={tab.assetClassName}
                  />
                </span>
                <span
                  className={
                    brandSlug === tab.id ? styles.tabLabelActive : styles.tabLabel
                  }
                >
                  {tab.label}
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.productAside}>
              <div className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  <div className={styles.productImageFrame}>
                    <Image
                      src={activeBrand.productImage}
                      alt={activeBrand.productImageAlt}
                      width={538}
                      height={488}
                      className={styles.productImage}
                    />
                  </div>
                </div>

                <SiteButton
                  href="/contacts"
                  variant="primary"
                  size="l"
                  className={styles.downloadButton}
                  rightIcon={<DownloadArrow />}
                >
                  Завантажити КП
                </SiteButton>
              </div>
            </div>

            <div className={styles.specColumn}>
              <h3 className={styles.productTitle}>
                {activeBrand.productTitle}
              </h3>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>
                  Технічні характеристики автомобіля
                </h4>

                <div className={styles.specList}>
                  {specCards.map((card) => (
                    <article
                      key={card.title}
                      className={card.wide ? styles.specCardWide : styles.specCard}
                    >
                      <div className={styles.specIconBox}>
                        <div
                          className={styles.specIconInsetBox}
                          style={getSpecIconStyle(card.iconInsets)}
                        >
                          <Image
                            src={card.icon}
                            alt=""
                            fill
                            className={styles.specIcon}
                          />
                        </div>
                      </div>
                      <div className={card.descriptionClassName}>
                        <h5 className={styles.specTitle}>{card.title}</h5>
                        <p className={styles.specText}>{card.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Зовнішні габарити</h4>
                <div className={styles.mediaCard}>
                  <Image
                    src="/figma/type-c/dimensions.png"
                    alt="Зовнішні габарити"
                    width={730}
                    height={479}
                    className={styles.mediaImage}
                  />
                </div>
              </section>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Внутрішні габарити</h4>
                <div className={styles.mediaCard}>
                  <Image
                    src="/figma/type-c/dimensions-inner.png"
                    alt="Внутрішні габарити"
                    width={730}
                    height={511}
                    className={styles.mediaImage}
                  />
                </div>
              </section>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Оснащення медичного салону</h4>
                <div className={styles.mediaCard}>
                  <Image
                    src="/figma/type-c/medical-1.png"
                    alt="Оснащення медичного салону 1"
                    width={730}
                    height={450}
                    className={styles.mediaImageFixed}
                  />
                </div>
                <div className={styles.mediaCard}>
                  <Image
                    src="/figma/type-c/medical-2.png"
                    alt="Оснащення медичного салону 2"
                    width={730}
                    height={450}
                    className={styles.mediaImageFixed}
                  />
                </div>
                <div className={styles.mediaCard}>
                  <Image
                    src="/figma/type-c/medical-3.png"
                    alt="Оснащення медичного салону 3"
                    width={730}
                    height={450}
                    className={styles.mediaImageFixed}
                  />
                </div>

                <div className={styles.medicalGroups}>
                  {medicalSections.map((section) => (
                    <article key={section.title} className={styles.medicalCard}>
                      <h5 className={styles.medicalCardTitle}>{section.title}</h5>
                      <ul className={styles.medicalList}>
                        {section.items.map((item) => (
                          <li key={item} className={styles.medicalItem}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Додаткове обладнання</h4>
                <ul className={styles.extraList}>
                  {extraEquipment.map((item) => (
                    <li key={item} className={styles.extraItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles.notePanel}>
                <p className={styles.noteText}>
                  Специфікація медичного обладнання та інші деталі доступні в
                  документі комерційної пропозиції (КП)
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
