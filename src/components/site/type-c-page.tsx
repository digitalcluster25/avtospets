"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SiteButton } from "@/components/site/button";
import type { SiteLanguage } from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./type-c-page.module.css";

type TypeCPageProps = {
  language: SiteLanguage;
  page: SitePage;
};

type SpecIconInsets = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

type PhotoOrientation = "portrait" | "landscape";

const TYPE_C_BRAND_SCROLL_KEY = "type-c-brand-scroll-y";

const pageCopy = {
  medical: {
    badge: "B",
    breadcrumb: "Тип С",
    title: "Тип С",
    description:
      "Реанімобіль для екстреної медичної допомоги, транспортування та моніторингу пацієнтів у тяжкому або критичному стані.",
    heroImage: "/figma/type-c/hero-vehicle-transparent.png",
    heroAlt: "Автомобіль швидкої медичної допомоги типу C",
    sectionTitle: "Доступні шасі для типа C",
    productTitle: () =>
      "Автомобіль швидкої медичної допомоги на базі шасі Peugeot Boxer",
    productImage: "/figma/type-c/product-vehicle.png",
    productImageAlt: "Peugeot Boxer",
    defaultBrand: "peugeot",
    visibleBrands: ["peugeot"],
    availableBrands: ["peugeot"],
    brandLabels: {} as Record<string, string>,
    salonTitle: "Оснащення медичного салону",
    salonPhotos: [1, 2, 3].map((index) => ({
      src: `/figma/type-c/medical-${index}.png`,
      alt: `Оснащення медичного салону ${index}`,
    })),
  },
  social: {
    badge: "A1",
    breadcrumb: "Тип А1",
    title: "Тип А1",
    description:
      "Спеціалізований автомобіль на базі Citroen Berlingo для транспортування, основного медичного догляду та нагляду за пацієнтом згідно з ДСТУ EN 1789:2019.",
    heroImage: "/assets/social-auto-citroen/citroen-boxer-main-cover.png",
    heroAlt: "Автомобіль швидкої медичної допомоги типу А1",
    sectionTitle: "Доступні шасі для типу А1",
    productTitle: (model: string) =>
      `Спеціалізований автомобіль швидкої медичної допомоги на базі ${model}, тип А1`,
    productImage: "/assets/social-auto-citroen/cover-removebg-preview.png",
    productImageAlt: "Citroen Berlingo типу А1",
    defaultBrand: "citroen",
    visibleBrands: ["citroen"],
    availableBrands: ["citroen"],
    brandLabels: {
      peugeot: "Peugeot Boxer",
      citroen: "Citroen Berlingo",
    } as Record<string, string>,
    salonTitle: "Оснащення медичного салону",
    salonPhotos: Array.from({ length: 16 }, (_, index) => ({
      src: `/assets/social-auto-citroen/salon-${index + 1}.jpg`,
      alt: `Салон соціального автомобіля ${index + 1}`,
    })),
  },
} as const;

const chassisTabs = [
  {
    id: "peugeot",
    label: "Peugeot",
    asset: "/figma/type-c/chassis-peugeot.png",
    assetClassName: styles.peugeotLogoImage,
    className: styles.tabPeugeot,
    isWideLogo: false,
  },
  {
    id: "citroen",
    label: "Citroen",
    asset: "/figma/type-c/chassis-citroen.png",
    assetClassName: styles.citroenLogoImage,
    className: styles.tabCitroen,
    isWideLogo: false,
  },
  {
    id: "ford",
    label: "Ford",
    asset: "/figma/type-c/chassis-ford.png",
    assetClassName: styles.fordLogoImage,
    isWideLogo: true,
    className: styles.tabFord,
  },
  {
    id: "mercedes",
    label: "Mercedes",
    asset: "/figma/type-c/chassis-mercedes.png",
    assetClassName: styles.mercedesLogoImage,
    className: styles.tabMercedes,
    isWideLogo: false,
  },
] as const;

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
    wide: false,
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
    wide: false,
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
    wide: false,
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
    wide: false,
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
    wide: false,
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
    wide: false,
    descriptionClassName: styles.specBodyCenter,
  },
] as const;

const socialSpecCards = [
  {
    title: "Двигун",
    body: "Дизельний L4 / 8-клапанний, робочий об'єм 1560 см³, потужність 92 к.с., максимальний крутний момент 230 Нм, EURO 5.",
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
    body: "161 км/год",
    icon: "/figma/type-c/spec-speed.svg",
    iconInsets: {
      top: "12.18%",
      right: "12.63%",
      bottom: "12.96%",
      left: "12.51%",
    },
    wide: false,
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Коробка передач",
    body: "5-ступенева, механічна",
    icon: "/figma/type-c/spec-gearbox.svg",
    iconInsets: {
      top: "14.29%",
      right: "16.31%",
      bottom: "15.07%",
      left: "16.19%",
    },
    wide: false,
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Підвіска передня",
    body: "Незалежна, «Мак-Ферсон»",
    icon: "/figma/type-c/spec-front-suspension.svg",
    iconInsets: {
      top: "12.18%",
      right: "18.19%",
      bottom: "12.96%",
      left: "18.06%",
    },
    wide: false,
    descriptionClassName: styles.specBodyCenter,
  },
  {
    title: "Підвіска задня",
    body: "Балка, що деформується: незалежна підвіска, стабілізатор поперечної стійкості, роздільна конструкція пружин і амортизаторів",
    icon: "/figma/type-c/spec-rear-suspension.svg",
    iconInsets: {
      top: "6.62%",
      right: "22.91%",
      bottom: "7.41%",
      left: "22.79%",
    },
    wide: false,
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
    wide: false,
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
    wide: false,
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

const socialMedicalSections = [
  {
    title: "Електрообладнання",
    items: [
      "Світильники для освітлення медичного салону",
      "Точкові світильники над поверхнею носилок",
      "Світильники для освітлення прилеглої території задніх дверей",
      "Дві розетки 12В",
      "Ліхтар для освітлення околиць",
    ],
  },
  {
    title: "Спеціальні сигнали",
    items: [
      "Балка СГУ із сигналом синього світла і системою зовнішньої трансляції",
      "Флуоресцентне обклеювання автомобіля згідно з ДСТУ EN 1789:2019",
    ],
  },
  {
    title: "Транспортування пацієнта",
    items: [
      "Основні ноші CARRERA T TEC 73 Max 10G із системою блокування S-MAX 10G, матрацом QMX 777 та інфузійною стійкою Track, Spencer Italia",
      "Механічний завантажувальний пристрій для нош типу 11, АСПА.943229.011.01",
      "Ноші, що складаються, АСПА.942816.048.01",
      "Складне крісло Attucho, тип Sedan 0480",
      "Ноші медичні типу 19 з нетканого матеріалу, АСПА.942816.004.02",
    ],
  },
  {
    title: "Невідкладна допомога",
    items: [
      "Портативний кисень не менше 400 л із вимірювачем витрат не менше 15 л/хв та регулюючим клапаном",
      "Зовнішній автоматичний дефібрилятор A15, MEDIANA",
      "Ручний медичний аспіратор MEDICARE ASPIR",
      "Сумка-укладка для невідкладної допомоги",
      "Багаторазовий дихальний мішок типу АМБУ MEDICARE для дорослих",
      "Шприцевий насос Medifusion DS-3000",
    ],
  },
  {
    title: "Медичні витратні матеріали",
    items: [
      "Контейнер для медичних відходів об'ємом 1,5 л",
      "Мішки для утилізації біологічно небезпечних медичних відходів",
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

const socialExtraEquipment = [
  "Підготовка для радіостанції",
  "Два вогнегасники: у кабіні водія та в медичному салоні",
  "Приймальний пристрій для нош",
  "Сидіння збоку носилок",
] as const;

const socialExternalDimensions = [
  "Колісна база — 2 975 мм",
  "Довжина — 4 753 мм",
  "Висота — 2 010 мм",
  "Ширина — 1 848 мм",
  "Кліренс — 153 мм",
] as const;

const socialBaseEquipment = [
  "ABS + ESP",
  "Подушка безпеки водія",
  "Електронний імобілайзер",
  "Триточкові ремені безпеки на передніх сидіннях із піротехнічним переднатягувачем",
  "Підголовники водія та передніх пасажирів",
  "Кондиціонер",
  "Передні електросклопідйомники",
  "Центральний замок із дистанційним керуванням",
  "Електропідсилювач керма",
  "Бортовий комп'ютер",
  "Регульована кермова колона",
  "Розетка 12В",
  "Аудіопідготовка",
  "Сталеві диски",
  "Запасне колесо зі сталевим диском",
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

export function TypeCPage({ language, page }: TypeCPageProps) {
  const detailsGridRef = useRef<HTMLDivElement | null>(null);
  const productAsideRef = useRef<HTMLDivElement | null>(null);
  const productCardRef = useRef<HTMLDivElement | null>(null);
  const [salonPhotoOrientations, setSalonPhotoOrientations] = useState<
    Record<string, PhotoOrientation>
  >({});
  const isSocial = page.uri.startsWith("/avtomobili-type-social");
  const copy = pageCopy[isSocial ? "social" : "medical"];
  const activeSpecCards = isSocial ? socialSpecCards : specCards;
  const activeMedicalSections = isSocial
    ? socialMedicalSections
    : medicalSections;
  const activeExtraEquipment = isSocial
    ? socialExtraEquipment
    : extraEquipment;
  const baseUri = isSocial ? "/avtomobili-type-social" : "/avtomobili-type-c";
  const visibleTabs = chassisTabs.filter((tab) =>
    (copy.visibleBrands as readonly string[]).includes(tab.id),
  );
  const brandSlug =
    visibleTabs.find((tab) => page.uri.endsWith(`/${tab.id}`))?.id ??
    copy.defaultBrand;
  const brandLabel = (tabId: string) =>
    copy.brandLabels[tabId] ??
    chassisTabs.find((tab) => tab.id === tabId)?.label ??
    tabId;
  const orderedSalonPhotos = isSocial
    ? [...copy.salonPhotos].sort(
        (left, right) =>
          Number(salonPhotoOrientations[left.src] === "landscape") -
          Number(salonPhotoOrientations[right.src] === "landscape"),
      )
    : copy.salonPhotos;

  const registerSalonPhotoOrientation = (
    src: string,
    width: number,
    height: number,
  ) => {
    const orientation: PhotoOrientation =
      width > height ? "landscape" : "portrait";

    setSalonPhotoOrientations((current) =>
      current[src] === orientation
        ? current
        : { ...current, [src]: orientation },
    );
  };

  useEffect(() => {
    const savedScroll = window.sessionStorage.getItem(TYPE_C_BRAND_SCROLL_KEY);

    if (!savedScroll) {
      return;
    }

    window.scrollTo(0, Number(savedScroll));
    window.sessionStorage.removeItem(TYPE_C_BRAND_SCROLL_KEY);
  }, [page.uri]);

  useEffect(() => {
    const detailsGrid = detailsGridRef.current;
    const productAside = productAsideRef.current;
    const productCard = productCardRef.current;

    if (!detailsGrid || !productAside || !productCard) {
      return;
    }

    const desktopBreakpoint = 1180;
    const stickyTop = 24;
    let frameId = 0;

    const resetCard = () => {
      productAside.style.height = "";
      productCard.style.position = "";
      productCard.style.top = "";
      productCard.style.left = "";
      productCard.style.width = "";
      productCard.style.zIndex = "";
    };

    const updateCardPosition = () => {
      frameId = 0;

      if (window.innerWidth <= desktopBreakpoint) {
        resetCard();
        return;
      }

      const gridRect = detailsGrid.getBoundingClientRect();
      const asideRect = productAside.getBoundingClientRect();
      const gridTop = window.scrollY + gridRect.top;
      const gridHeight = detailsGrid.offsetHeight;
      const cardHeight = productCard.offsetHeight;
      const asideWidth = productAside.offsetWidth;
      const asideLeft = asideRect.left;
      const stickyStart = gridTop - stickyTop;
      const stickyEnd = gridTop + gridHeight - cardHeight - stickyTop;

      productAside.style.height = `${gridHeight}px`;

      if (window.scrollY <= stickyStart) {
        productCard.style.position = "absolute";
        productCard.style.top = "0";
        productCard.style.left = "0";
        productCard.style.width = "100%";
        productCard.style.zIndex = "1";
        return;
      }

      if (window.scrollY < stickyEnd) {
        productCard.style.position = "fixed";
        productCard.style.top = `${stickyTop}px`;
        productCard.style.left = `${asideLeft}px`;
        productCard.style.width = `${asideWidth}px`;
        productCard.style.zIndex = "10";
        return;
      }

      productCard.style.position = "absolute";
      productCard.style.top = `${gridHeight - cardHeight}px`;
      productCard.style.left = "0";
      productCard.style.width = "100%";
      productCard.style.zIndex = "1";
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateCardPosition);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(detailsGrid);
    resizeObserver.observe(productAside);
    resizeObserver.observe(productCard);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateCardPosition();

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      resetCard();
    };
  }, [page.uri]);

  return (
    <div className={styles.page}>
      <Header
        currentPath={page.uri}
        initialLanguage={language}
        page={page}
        transparent
      />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.heroBadge} aria-hidden="true">
                {copy.badge}
              </div>

              <div className={styles.breadcrumbs}>
                <span>Головна</span>
                <span>/</span>
                <span className={styles.breadcrumbCurrent}>
                  {copy.breadcrumb}
                </span>
              </div>

              <div className={styles.heroTextBlock}>
                <h1 className={styles.heroTitle}>{copy.title}</h1>
                <p className={styles.heroDescription}>{copy.description}</p>
              </div>
            </div>

            <div className={styles.heroImageWrap}>
              <Image
                src={copy.heroImage}
                alt={copy.heroAlt}
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
            <h2 className={styles.sectionTitle}>{copy.sectionTitle}</h2>
          </div>

          <div className={styles.tabsRow}>
            {visibleTabs.map((tab) => {
              const isActive = brandSlug === tab.id;
              const isAvailable = (
                copy.availableBrands as readonly string[]
              ).includes(tab.id);

              const tabInner = (
                <>
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
                  <span className={styles.tabTextBlock}>
                    <span
                      className={
                        isActive ? styles.tabLabelActive : styles.tabLabel
                      }
                    >
                      {brandLabel(tab.id)}
                    </span>
                  </span>
                </>
              );

              if (!isAvailable) {
                return (
                  <span
                    key={tab.id}
                    className={`${styles.tabDisabled} ${tab.className} ${
                      isSocial ? styles.tabAuto : ""
                    }`}
                    aria-disabled="true"
                  >
                    {tabInner}
                  </span>
                );
              }

              return (
                <Link
                  key={tab.id}
                  href={`${baseUri}/${tab.id}`}
                  scroll={false}
                  className={`${isActive ? styles.tabActive : styles.tab} ${tab.className} ${
                    isSocial ? styles.tabAuto : ""
                  }`}
                  onClick={() => {
                    window.sessionStorage.setItem(
                      TYPE_C_BRAND_SCROLL_KEY,
                      String(window.scrollY),
                    );
                  }}
                >
                  {tabInner}
                </Link>
              );
            })}
          </div>

          <div ref={detailsGridRef} className={styles.detailsGrid}>
            <div ref={productAsideRef} className={styles.productAside}>
              <div ref={productCardRef} className={styles.productCard}>
                <div
                  className={`${styles.productImageWrap} ${
                    isSocial ? styles.productImageWrapPhoto : ""
                  }`}
                >
                  <div className={styles.productImageFrame}>
                    <Image
                      src={copy.productImage}
                      alt={copy.productImageAlt}
                      width={538}
                      height={488}
                      className={
                        isSocial ? styles.productImagePhoto : styles.productImage
                      }
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
                {copy.productTitle(brandLabel(brandSlug))}
              </h3>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>
                  Технічні характеристики автомобіля
                </h4>

                <div className={styles.specList}>
                  {activeSpecCards.map((card) => (
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

                {isSocial ? (
                  <article className={styles.medicalCard}>
                    <h5 className={styles.medicalCardTitle}>
                      Безпека та базове оснащення
                    </h5>
                    <ul className={styles.medicalList}>
                      {socialBaseEquipment.map((item) => (
                        <li key={item} className={styles.medicalItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ) : null}
              </section>

              <section className={styles.panel}>
                <h4 className={styles.panelTitle}>Зовнішні габарити</h4>
                {isSocial ? (
                  <ul className={styles.extraList}>
                    {socialExternalDimensions.map((item) => (
                      <li key={item} className={styles.extraItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={styles.mediaCard}>
                    <Image
                      src="/figma/type-c/dimensions.png"
                      alt="Зовнішні габарити"
                      width={730}
                      height={479}
                      className={styles.mediaImage}
                    />
                  </div>
                )}
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
                <h4 className={styles.panelTitle}>{copy.salonTitle}</h4>
                <div className={isSocial ? styles.salonGrid : styles.salonStack}>
                  {orderedSalonPhotos.map((photo) => (
                    <div key={photo.src} className={styles.mediaCard}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={730}
                        height={450}
                        className={
                          isSocial ? styles.salonImage : styles.mediaImageFixed
                        }
                        onLoad={(event) => {
                          if (!isSocial) {
                            return;
                          }

                          registerSalonPhotoOrientation(
                            photo.src,
                            event.currentTarget.naturalWidth,
                            event.currentTarget.naturalHeight,
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.medicalGroups}>
                  {activeMedicalSections.map((section) => (
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
                  {activeExtraEquipment.map((item) => (
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

      <Footer language={language} />
    </div>
  );
}
