import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ChassisSection } from "@/components/site/chassis-section";
import type { SitePage } from "@/lib/site/types";
import styles from "./main-page.module.css";

type SiteLanguage = "ua" | "en";

const pageCopy = {
  ua: {
    heroAlt: "Виробництво автомобілів швидкої допомоги",
    heroArrowLabel: "Перейти до ключових показників",
    heroTitle: "Виробництво автомобілів швидкої допомоги",
    heroDescription:
      "Виробляємо автомобілі швидкої допомоги в типах A1, A2, B та C в стандартній та неонатальній конфігураціях. А також соціальний транспорт для перевезення людей з обмеженими фізичними можливостями, мобільних амбулаторій тощо.",
    statsTitle: "Ключові показники",
    stats: [
      { value: "2,82 млрд", text: "Загальна сума укладених угод" },
      {
        value: "3 100+",
        text: "Автомобілів передано замовникам",
      },
      {
        value: "309",
        text: "Взято участь у тендерах",
      },
      {
        value: "194",
        text: "Підписаних договорів",
      },
    ],
    statsCostTitle: "Конкурентна вартість авто для держустанов",
    tenderStats: [
      {
        label: "Наша пропозиція",
        value: "~3,1 млн",
        accent: true,
      },
      {
        label: "Середня вартість ринку",
        value: "~3,75 млн",
      },
    ],
    tenderNote: "Економія ~650 000 грн на кожному автомобілі",
    vehiclesTitle: "Автомобілі швидкої допомоги",
    vehiclesCaption:
      "Сучасні медичні транспортні засоби класів A, B, C з повною сертифікацією",
    vehicles: [
      {
        index: "A",
        title: "Типи A1 та A2",
        variant: "a",
        description:
          "Для транспортування пацієнтів до медичних закладів у супроводі медичного персоналу.",
        logos: ["peugeot", "citroen", "ford"],
        image: "/figma/ambulance-cards/card-a-cropped-figma.png",
        imageAlt: "Типи A1 та A2",
        button: "Детальна інформація",
      },
      {
        index: "B",
        title: "Тип B",
        variant: "b",
        description:
          "Для надання медичної допомоги, транспортування та моніторингу стану пацієнта на догоспітальному етапі.",
        logos: ["peugeot", "citroen", "ford", "mercedes"],
        image: "/figma/ambulance-cards/card-b.webp",
        imageAlt: "Тип B",
        button: "Детальна інформація",
      },
      {
        index: "B",
        title: "Тип С",
        variant: "c",
        description:
          "Реанімобіль для екстреної медичної допомоги, транспортування та моніторингу пацієнтів у тяжкому або критичному стані.",
        logos: ["peugeot", "citroen", "ford", "mercedes"],
        image: "/figma/ambulance-cards/card-c-cropped-figma.png",
        imageAlt: "Тип С",
        button: "Детальна інформація",
      },
      {
        index: "social",
        title: "Cоціальний транспорт",
        variant: "social",
        description:
          "Cпеціалізований транспорт для перевезення людей з обмеженими фізичними можливостями, мобільних амбулаторій тощо.",
        logos: ["peugeot", "citroen"],
        image: "/figma/ambulance-cards/card-social-cropped-figma.png",
        imageAlt: "Соціальний транспорт",
        button: "Детальна інформація",
        social: true,
      },
    ],
    aboutTitle: "Про компанію",
    aboutBody: [
      'ТОВ "Автоспецпром" — перший та найбільший в Україні виробник автомобілів швидкої (екстреної) медичної допомоги.',
      'Свою діяльність підприємство розпочало в 2012 році. В даний час потужності ТОВ "Автоспецпром" дозволяють випускати на місяць до 100 одиниць автомобілів швидкої допомоги, а також транспорту спеціального призначення, в тому числі — для перевезення людей з обмеженими фізичними можливостями, мобільних амбулаторій тощо.',
    ],
    aboutCta: "Детальніше про компанію",
    companyAlt: "Про компанію",
    productionTitle: "Виробництво",
    productionBody: [
      "Підприємство має власний конструкторський відділ, який постійно працює над поліпшенням ергономічності, надійності та комфорту автомобілів швидкої допомоги як для лікарів (фельдшерських бригад), так і для пацієнтів.",
    ],
    productionCta: "Детальніше про виробництво",
    productionAlt: "Виробництво",
    serviceTitle: "Сервісне обслуговування",
    serviceBaseTitle: "Базові автомобілі",
    serviceBaseBody: [
      "Технічне обслуговування базових автомобілів відбувається в регіональних сервісних центрах по всій країні.",
      "Окрім регламентного ТО сервісні центри компанії надають широкий перелік послуг і виконують усі види робіт, в т. ч. складний ремонт автотехніки, монтаж додаткового обладнання, гарантійний та постгарантійний ремонт.",
    ],
    serviceBaseCta: "Знайти сервісний центр в вашому регіоні",
    serviceBaseAlt: "Базові автомобілі",
    serviceMedicalTitle: "Медичне обладнання",
    serviceMedicalBody: [
      "Ремонт медичної техніки забезпечують виробники або їхні офіційні представники в Україні за запитом.",
      "Щоб дізнатися більше, зв'яжіться з нами або залиште вашу заявку.",
    ],
    serviceMedicalCta: "Замовити сервіс медичного обладнання",
    serviceMedicalAlt: "Медичне обладнання",
    partnersTitle: "Маємо честь співпрацювати",
    partnersBody:
      "Виробляємо автомобілі швидкої допомоги для державних та приватних медичних установ України, неурядових і міжнародних організацій.",
    partnerAltPrefix: "Партнер",
    chassisTitle: "Шасі",
    chassisBody:
      'Зазначені типи "швидких" виробляються на базових шасі Citroën, Peugeot, Ford, Mercedes-Benz',
    chassisNote:
      "Прямі договори з виробником базових автомобілів дозволяють нам забезпечувати найкращі ціни на продукцію",
    faqTitle: "Поширені питання",
    faqs: [
      {
        question: "Які типи автомобілів швидкої допомоги ви виробляєте?",
        answer:
          "Ми виробляємо автомобілі швидкої допомоги типів А1, А2, В та С, а також спеціалізований медичний транспорт. Кожен тип відповідає конкретним вимогам та призначений для різних медичних завдань.",
        open: true,
      },
      { question: "Чи надаєте ви гарантію на автомобілі?" },
      { question: "Як довго займає виробництво одного автомобіля?" },
      { question: "Чи можливе індивідуальне замовлення з особливими вимогами?" },
      { question: "Де розташовані ваші сервісні центри?" },
    ],
  },
  en: {
    heroAlt: "Production of ambulances",
    heroArrowLabel: "Go to key metrics",
    heroTitle: "Production of ambulances",
    heroDescription:
      "We manufacture ambulances in A1, A2, B and C types in standard and neonatal configurations. We also build social transport for people with limited mobility, mobile clinics and other specialized solutions.",
    statsTitle: "Key metrics",
    stats: [
      { value: "2,82 bn", text: "Total value of concluded contracts" },
      {
        value: "3 100+",
        text: "Vehicles delivered to customers",
      },
      {
        value: "309",
        text: "Tender participations",
      },
      {
        value: "194",
        text: "Signed contracts",
      },
    ],
    statsCostTitle: "Competitive vehicle cost for public institutions",
    tenderStats: [
      {
        label: "Our offer",
        value: "~3.1 mln",
        accent: true,
      },
      {
        label: "Average market price",
        value: "~3.75 mln",
      },
    ],
    tenderNote: "Savings of ~650,000 UAH on each vehicle",
    vehiclesTitle: "Ambulance vehicles",
    vehiclesCaption:
      "Modern medical transport vehicles of classes A, B and C with full certification",
    vehicles: [
      {
        index: "A",
        title: "Types A1 and A2",
        variant: "a",
        description:
          "For transporting patients to medical facilities accompanied by medical staff.",
        logos: ["peugeot", "citroen", "ford"],
        image: "/figma/ambulance-cards/card-a.png",
        imageAlt: "Types A1 and A2",
        button: "Detailed information",
      },
      {
        index: "B",
        title: "Type B",
        variant: "b",
        description:
          "For providing medical care, transportation and patient monitoring at the pre-hospital stage.",
        logos: ["peugeot", "citroen", "ford", "mercedes"],
        image: "/figma/ambulance-cards/card-b.webp",
        imageAlt: "Type B",
        button: "Detailed information",
      },
      {
        index: "B",
        title: "Type C",
        variant: "c",
        description:
          "Resuscitation vehicle for emergency medical care, transportation and monitoring of patients in severe or critical condition.",
        logos: ["peugeot", "citroen", "ford", "mercedes"],
        image: "/figma/ambulance-cards/card-c.png",
        imageAlt: "Type C",
        button: "Detailed information",
      },
      {
        index: "social",
        title: "Social transport",
        variant: "social",
        description:
          "Specialized transport for people with limited mobility, mobile clinics and related tasks.",
        logos: ["peugeot", "citroen"],
        image: "/figma/ambulance-cards/card-social.png",
        imageAlt: "Social transport",
        button: "Detailed information",
        social: true,
      },
    ],
    aboutTitle: "About the company",
    aboutBody: [
      "Avtospetsprom LLC is the first and largest Ukrainian manufacturer of emergency medical vehicles.",
      "The company started its operations in 2012. Today, Avtospetsprom can produce up to 100 ambulance and special-purpose vehicles per month, including transport for people with limited mobility and mobile outpatient units.",
    ],
    aboutCta: "More about the company",
    companyAlt: "About the company",
    productionTitle: "Production",
    productionBody: [
      "The company has its own engineering department that constantly improves the ergonomics, reliability and comfort of ambulances both for medical teams and for patients.",
    ],
    productionCta: "More about production",
    productionAlt: "Production",
    serviceTitle: "Service maintenance",
    serviceBaseTitle: "Base vehicles",
    serviceBaseBody: [
      "Maintenance of base vehicles is carried out in regional service centers throughout the country.",
      "In addition to scheduled maintenance, service centers provide a wide range of services, including major repairs, installation of additional equipment, and warranty or post-warranty repairs.",
    ],
    serviceBaseCta: "Find a service center in your region",
    serviceBaseAlt: "Base vehicles",
    serviceMedicalTitle: "Medical equipment",
    serviceMedicalBody: [
      "Repair of medical equipment is provided by manufacturers or their official representatives in Ukraine upon request.",
      "To learn more, contact us or leave your request.",
    ],
    serviceMedicalCta: "Order medical equipment service",
    serviceMedicalAlt: "Medical equipment",
    partnersTitle: "We are honored to cooperate",
    partnersBody:
      "We manufacture ambulances for public and private medical institutions in Ukraine, NGOs, and international organizations.",
    partnerAltPrefix: "Partner",
    chassisTitle: "Chassis",
    chassisBody:
      'These ambulance types are produced on Citroën, Peugeot, Ford, and Mercedes-Benz base chassis',
    chassisNote:
      "Direct contracts with base vehicle manufacturers allow us to provide the best prices for our products",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "What types of ambulances do you manufacture?",
        answer:
          "We manufacture ambulances of types A1, A2, B and C, as well as specialized medical transport. Each type meets specific requirements and is designed for different medical tasks.",
        open: true,
      },
      { question: "Do you provide a warranty for the vehicles?" },
      { question: "How long does it take to manufacture one vehicle?" },
      { question: "Is a custom order with special requirements possible?" },
      { question: "Where are your service centers located?" },
    ],
  },
} satisfies Record<SiteLanguage, unknown>;

type MainPageProps = {
  page: SitePage;
};

function FaqChevron() {
  return (
    <span className={styles.faqChevron} aria-hidden="true">
      <svg
        viewBox="0 0 11.6667 6.66667"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.faqChevronIcon}
      >
        <path
          d="M0.833333 0.833333L5.83333 5.83333L10.8333 0.833333"
          stroke="#0F0F0F"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export async function MainPage({ page }: MainPageProps) {
  const cookieStore = await cookies();
  const language = cookieStore.get("avtospets-language")?.value === "en" ? "en" : "ua";
  const copy = pageCopy[language];
  const partners = Array.from({ length: 23 }, (_, index) => ({
    src: `/figma/partners-3476/partner-${String(index + 1).padStart(2, "0")}.png`,
    alt: `${copy.partnerAltPrefix} ${index + 1}`,
  }));
  const logoMap = {
    peugeot: {
      src: "/figma/ambulance-cards/logo-peugeot.webp",
      width: 36,
      height: 40,
      wrapClassName: styles.chassisLogoItemPeugeot,
      imageClassName: styles.chassisLogoPeugeot,
    },
    citroen: {
      src: "/figma/ambulance-cards/logo-citroen.webp",
      width: 50,
      height: 28,
      wrapClassName: styles.chassisLogoItemCitroen,
      imageClassName: styles.chassisLogoCitroen,
    },
    ford: {
      src: "/figma/ambulance-cards/logo-ford.webp",
      width: 71,
      height: 25,
      wrapClassName: styles.chassisLogoItemFord,
      imageClassName: styles.chassisLogoFord,
    },
    mercedes: {
      src: "/figma/ambulance-cards/logo-mercedes.webp",
      width: 58,
      height: 36,
      wrapClassName: styles.chassisLogoItemMercedes,
      imageClassName: styles.chassisLogoMercedes,
    },
  } as const;
  const vehicleImageWrapMap = {
    a: styles.vehicleImageWrapA,
    b: styles.vehicleImageWrapB,
    c: styles.vehicleImageWrapC,
    social: styles.vehicleImageWrapSocial,
  } as const;
  const vehicleImageMap = {
    a: styles.vehicleImageA,
    b: styles.vehicleImageB,
    c: styles.vehicleImageC,
    social: styles.vehicleImageSocial,
  } as const;
  const vehicleImageSizeMap = {
    a: { width: 309, height: 326 },
    b: { width: 1576, height: 1484 },
    c: { width: 309, height: 326 },
    social: { width: 309, height: 326 },
  } as const;

  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} page={page} />
      <main>
        <section className={styles.sectionLight}>
          <div className={styles.heroSection}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroSectionInner}>
            <div className={styles.heroImageWrap}>
              <Image
                src="/figma/hero409/hero-image.webp"
                alt={copy.heroAlt}
                width={4096}
                height={1696}
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 92vw, 1260px"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
              <p className={styles.heroDescription}>{copy.heroDescription}</p>
              <Link
                href="#key-metrics"
                className={styles.heroArrow}
                aria-label={copy.heroArrowLabel}
              >
                <Image
                  src="/figma/hero409/arrow.svg"
                  alt=""
                  width={62}
                  height={62}
                  unoptimized
                  className={styles.heroArrowIcon}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
          </div>
        </section>

        <section id="key-metrics" className={styles.sectionMuted}>
          <div className={styles.metricsSectionInner}>
            <h2 className={styles.sectionTitle}>{copy.statsTitle}</h2>

            <div className={styles.statsGrid}>
              {copy.stats.map((item) => (
                <article key={item.value} className={styles.statCard}>
                  <span className={styles.statValue}>{item.value}</span>
                  <p className={styles.statText}>{item.text}</p>
                </article>
              ))}
            </div>

            <div className={styles.priceBlock}>
              <h3 className={styles.priceHeading}>{copy.statsCostTitle}</h3>
              <div className={styles.tenderGrid}>
                {copy.tenderStats.map((item) => (
                  <article
                    key={item.value}
                    className={`${styles.tenderCard} ${
                      item.accent ? styles.tenderCardAccent : ""
                    }`}
                  >
                    <span className={styles.tenderLabel}>
                      {item.label}
                      {item.accent ? (
                        <Image
                          src="/figma/stats-cost-plus.svg"
                          alt=""
                          width={40}
                          height={40}
                          unoptimized
                          className={styles.tenderAccentIcon}
                          aria-hidden="true"
                        />
                      ) : null}
                    </span>
                    <span className={styles.tenderValue}>{item.value}</span>
                  </article>
                ))}
              </div>
              <div className={styles.tenderNote}>
                <Image
                  src="/figma/stats-cost-save.svg"
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className={styles.tenderNoteIcon}
                  aria-hidden="true"
                />
                <span>{copy.tenderNote}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionDark}>
          <div className={styles.vehiclesSection}>
            <div className={styles.vehiclesGlow} aria-hidden="true" />
            <div className={styles.vehiclesHeader}>
              <h2 className={styles.vehiclesTitle}>{copy.vehiclesTitle}</h2>
              <p className={styles.vehiclesDescription}>
                {copy.vehiclesCaption}
              </p>
            </div>

            <div className={styles.vehiclesGrid}>
              {copy.vehicles.map((vehicle) => {
                const vehicleImageSize =
                  vehicleImageSizeMap[
                    vehicle.variant as keyof typeof vehicleImageSizeMap
                  ];

                return (
                  <article
                    key={vehicle.title}
                    className={styles.vehicleCard}
                  >
                  <div className={styles.vehicleContent}>
                    <div
                      className={
                        vehicle.social
                          ? styles.vehicleBadgeSocial
                          : styles.vehicleBadge
                      }
                    >
                      {vehicle.social ? (
                        <Image
                          src="/figma/ambulance-cards/social-badge.svg"
                          alt=""
                          width={80}
                          height={80}
                          unoptimized
                          className={styles.vehicleBadgeSocialIcon}
                          aria-hidden="true"
                        />
                      ) : (
                        <span className={styles.vehicleBadgeText}>
                          {vehicle.index}
                        </span>
                      )}
                    </div>
                    <div className={styles.vehicleTextGroup}>
                      <h3 className={styles.vehicleTitle}>{vehicle.title}</h3>
                      <p className={styles.vehicleDescription}>
                        {vehicle.description}
                      </p>
                    </div>
                    <div className={styles.chassisLogos}>
                      {vehicle.logos.map((logo) => {
                        const asset = logoMap[logo as keyof typeof logoMap];

                        return (
                          <div
                            key={`${vehicle.title}-${logo}`}
                            className={`${styles.chassisLogoItem} ${asset.wrapClassName}`}
                          >
                            <Image
                              src={asset.src}
                              alt=""
                              width={asset.width}
                              height={asset.height}
                              loading="lazy"
                              sizes="72px"
                              className={asset.imageClassName}
                              aria-hidden="true"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <Link href="/production" className={styles.vehicleButton}>
                      <span>{vehicle.button}</span>
                      <Image
                        src="/figma/ambulance-cards/arrow-right.svg"
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className={styles.vehicleButtonIcon}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                  <div
                    className={
                      vehicleImageWrapMap[
                        vehicle.variant as keyof typeof vehicleImageWrapMap
                      ]
                    }
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      width={vehicleImageSize.width}
                      height={vehicleImageSize.height}
                      loading="lazy"
                      sizes="(max-width: 767px) 82vw, (max-width: 1439px) 44vw, 309px"
                      className={
                        vehicleImageMap[
                          vehicle.variant as keyof typeof vehicleImageMap
                        ]
                      }
                    />
                  </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.sectionLight}>
          <div className={styles.aboutManufacturingSection}>
            <div className={styles.aboutManufacturingRow}>
              <div className={styles.aboutDetails}>
                <h2 className={styles.aboutManufacturingTitle}>
                  {copy.aboutTitle}
                </h2>
                <div className={styles.aboutManufacturingText}>
                  {copy.aboutBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link href="/aboutus" className={styles.aboutButton}>
                  <span>{copy.aboutCta}</span>
                  <Image
                    src="/figma/about-manufacturing/arrow-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className={styles.aboutButtonIcon}
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className={styles.aboutImageCard}>
                <Image
                  src="/figma/about-manufacturing/company-image.webp"
                  alt={copy.companyAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                  className={styles.aboutImage}
                />
              </div>
            </div>

            <div className={styles.aboutManufacturingRow}>
              <div className={styles.aboutImageCard}>
                <Image
                  src="/figma/about-manufacturing/manufacturing-image.webp"
                  alt={copy.productionAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                  className={styles.aboutImage}
                />
              </div>
              <div className={styles.manufacturingDetails}>
                <h2 className={styles.aboutManufacturingTitle}>
                  {copy.productionTitle}
                </h2>
                <div className={styles.aboutManufacturingText}>
                  {copy.productionBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link href="/production" className={styles.manufacturingButton}>
                  <span>{copy.productionCta}</span>
                  <Image
                    src="/figma/about-manufacturing/arrow-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className={styles.aboutButtonIcon}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionDark}>
          <div className={styles.serviceSection}>
            <div className={styles.serviceGlow} aria-hidden="true" />
            <h2 className={styles.serviceSectionTitle}>{copy.serviceTitle}</h2>
            <div className={styles.serviceContent}>
              <div className={styles.serviceRow}>
                <div className={styles.serviceBaseDetails}>
                  <div className={styles.serviceBaseIconWrap}>
                    <Image
                      src="/figma/service-2746/base-inner.svg"
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className={styles.serviceBaseIcon}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.serviceTextGroup}>
                    <h3 className={styles.serviceCardTitle}>
                      {copy.serviceBaseTitle}
                    </h3>
                    <div className={styles.serviceCardText}>
                      {copy.serviceBaseBody.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <Link href="/services" className={styles.serviceBaseButton}>
                    <Image
                      src="/figma/service-2746/search-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className={styles.serviceActionIcon}
                      aria-hidden="true"
                    />
                    <span>{copy.serviceBaseCta}</span>
                  </Link>
                </div>
                <div className={styles.serviceImageCardExact}>
                  <Image
                    src="/figma/service-2746/service-base.webp"
                    alt={copy.serviceBaseAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                    className={styles.serviceImageExact}
                  />
                </div>
              </div>

              <div className={styles.serviceRow}>
                <div className={styles.serviceImageCardExact}>
                  <Image
                    src="/figma/service-2746/service-medical.webp"
                    alt={copy.serviceMedicalAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 650px"
                    className={styles.serviceImageExact}
                  />
                </div>
                <div className={styles.serviceMedicalDetails}>
                  <div className={styles.serviceMedicalIconWrap}>
                    <Image
                      src="/figma/service-2746/medical-inner.svg"
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className={styles.serviceMedicalIcon}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles.serviceTextGroup}>
                    <h3 className={styles.serviceCardTitle}>
                      {copy.serviceMedicalTitle}
                    </h3>
                    <div className={styles.serviceCardText}>
                      {copy.serviceMedicalBody.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <Link href="/contacts" className={styles.serviceMedicalButton}>
                    <Image
                      src="/figma/service-2746/request-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className={styles.serviceActionIcon}
                      aria-hidden="true"
                    />
                    <span>{copy.serviceMedicalCta}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionLight}>
          <div className={styles.partnersSection}>
            <div className={styles.partnersHeader}>
              <h2 className={styles.partnersTitle}>{copy.partnersTitle}</h2>
              <p className={styles.partnersBody}>{copy.partnersBody}</p>
            </div>
            <div className={styles.partnersGrid}>
              {partners.map((partner) => (
                <div key={partner.src} className={styles.partnerCard}>
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={266}
                    height={160}
                    loading="lazy"
                    sizes="(max-width: 767px) 42vw, 266px"
                    className={styles.partnerImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionDark}>
          <ChassisSection
            title={copy.chassisTitle}
            body={copy.chassisBody}
            note={copy.chassisNote}
          />
        </section>

        <section className={styles.sectionLightFaq}>
          <div className={styles.faqSection}>
            <h2 className={styles.faqSectionTitle}>{copy.faqTitle}</h2>
            <div className={styles.faqSectionList}>
              {copy.faqs.map((item) => (
                <details
                  key={item.question}
                  name="faq-main"
                  open={item.open}
                  className={styles.faqCardDetails}
                >
                  <summary className={styles.faqButtonRow}>
                    <span className={styles.faqQuestionText}>{item.question}</span>
                    <FaqChevron />
                  </summary>
                  {item.answer ? (
                    <div className={styles.faqAnswerWrap}>
                      <div className={styles.faqAnswerInner}>
                        <p className={styles.faqAnswer}>{item.answer}</p>
                      </div>
                    </div>
                  ) : null}
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
