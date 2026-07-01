"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SiteButton } from "@/components/site/button";
import { ChassisSection } from "@/components/site/chassis-section";
import { useContactForm } from "@/components/site/contact-form-provider";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import type { SitePage } from "@/lib/site/types";
import styles from "./production-page.module.css";

type ProductionPageProps = {
  page: SitePage;
};

const typeCards = [
  {
    kind: "copy",
    title: "Типи А1 та А2",
    body: 'Автомобілі типів А1 та А2 призначені для транспортування пацієнтів, які, ймовірно, не є "екстреними", до медичних закладів у супроводі медичного персоналу. Різниця між двома типами — наявність додаткового крісла для медичного працівника.',
  },
  { kind: "letter", letter: "B" },
  { kind: "letter", letter: "С" },
] as const;

const constructionCards = [
  {
    rowClassName: styles.constructionCardTall,
    emoji: "🔧",
    title: "Ходова частина",
    body: `Обрані для виробництва "швидких" автомобілі відповідають вимогам до плавності ходу завдяки м'якій підвісці, яка дозволяє створити максимально комфортні умови для пацієнта, а також необхідні умови для проведення лікувальних заходів і медичних маніпуляцій.`,
  },
  {
    rowClassName: styles.constructionCardTall,
    emoji: "⚙️",
    title: "Двигун",
    body: "На автомобілях установлено потужні двигуни, які забезпечують швидкість на дорогах і прохідність у сільській місцевості або під час снігових заносів.",
  },
  {
    rowClassName: styles.constructionCardTall,
    emoji: "🚗",
    title: "Кабіна водія",
    body: "У кабіні водія зручно розміщені пульт управління спеціальними світловими приладами та сигналами, а також панель управління вентилятором та опаленням автомобіля. Сидіння відповідають усім вимогам щодо безпечної та довговічної експлуатації.",
  },
  {
    rowClassName: styles.constructionCardShort,
    emoji: "🛡️",
    title: "Ізоляція",
    body: "Кузов виготовлений з використанням новітньої віброшумоізоляції та теплоізоляції, а стінки та стеля салону укомплектовані панеллю з гладкою поверхнею, котра не вбирає запахи та стійка до впливу дезінфекційних засобів.",
  },
  {
    rowClassName: styles.constructionCardShort,
    emoji: "🏥",
    title: "Медичний салон",
    body: "Обладнанням для транспортування та здійснення основного медичного догляду. Швидкий доступ до обладнання. Кліматичне та вентиляційне обладнання. Водонепроникне антистатичне покриття підлоги. Перегородка зі зсувним вікном або інтеркомом.",
  },
  {
    rowClassName: styles.constructionCardShort,
    emoji: "🧱",
    title: "Матеріали",
    body: "Як основу інтер'єру компанія використовує монолітну стіну зі склопластику, який має підвищену стійкість до пошкоджень і міцніший в порівнянні з АБС-пластиковою основою.",
  },
] as const;

const medicalCards = [
  "/figma/production-page/med-01.png",
  "/figma/production-page/med-02.png",
  "/figma/production-page/med-03.png",
  "/figma/production-page/med-04.png",
  "/figma/production-page/med-05.png",
  "/figma/production-page/med-06.png",
  "/figma/production-page/med-07.png",
  "/figma/production-page/med-08.png",
  "/figma/production-page/med-09.png",
  "/figma/production-page/med-10.png",
] as const;

const initialGalleryCards = [
  { src: "/figma/production-page/gallery-01.png" },
  { src: "/figma/production-page/gallery-02.png" },
  { src: "/figma/production-page/gallery-03.png" },
] as const;

const extraGalleryCards = [
  { src: "/figma/production-page/gallery-01.png" },
  { src: "/figma/production-page/gallery-02.png" },
  { src: "/figma/production-page/gallery-03.png" },
  { src: "/figma/production-page/gallery-01.png" },
  { src: "/figma/production-page/gallery-02.png" },
  { src: "/figma/production-page/gallery-03.png" },
] as const;

const MOBILE_BREAKPOINT = 900;
const DESKTOP_INITIAL_GALLERY_COUNT = initialGalleryCards.length;
const MOBILE_INITIAL_GALLERY_COUNT = 4;
const MOBILE_GALLERY_INCREMENT = 2;

export function ProductionPage({ page }: ProductionPageProps) {
  const { openContactForm } = useContactForm();
  const [isMobileGallery, setIsMobileGallery] = useState(false);
  const allGalleryCards = useMemo(
    () => [...initialGalleryCards, ...extraGalleryCards],
    [],
  );
  const [visibleGalleryCount, setVisibleGalleryCount] = useState<number>(
    DESKTOP_INITIAL_GALLERY_COUNT,
  );
  const visibleGalleryCards = allGalleryCards.slice(0, visibleGalleryCount);
  const hasMoreGalleryPhotos = visibleGalleryCount < allGalleryCards.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    function syncGalleryMode(event?: MediaQueryList | MediaQueryListEvent) {
      const matches = event ? event.matches : mediaQuery.matches;

      setIsMobileGallery(matches);
      setVisibleGalleryCount((current) =>
        Math.max(
          matches ? MOBILE_INITIAL_GALLERY_COUNT : DESKTOP_INITIAL_GALLERY_COUNT,
          Math.min(current, allGalleryCards.length),
        ),
      );
    }

    syncGalleryMode();
    mediaQuery.addEventListener("change", syncGalleryMode);

    return () => {
      mediaQuery.removeEventListener("change", syncGalleryMode);
    };
  }, [allGalleryCards.length]);

  return (
    <div className={styles.page}>
      <Header currentPath={page.uri} page={page} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumbMuted}>Головна</span>
                <span className={styles.breadcrumbMuted}>/</span>
                <span className={styles.breadcrumbCurrent}>Виробництво</span>
              </div>

              <div className={styles.heroTextGroup}>
                <h1 className={styles.heroTitle}>Виробництво</h1>
                <div className={styles.heroBody}>
                  <p>
                    ТОВ &quot;Автоспецпром&quot; виробляє автомобілі швидкої допомоги в
                    типах А1, А2, В та С в стандартній та неонатальній
                    конфігураціях. А також спеціалізований транспорт для
                    перевезення людей з обмеженими фізичними можливостями,
                    мобільних амбулаторій тощо.
                  </p>
                  <p>
                    Підприємство має власний конструкторський відділ, який
                    постійно працює над поліпшенням ергономічності, надійності
                    та комфорту автомобілів швидкої допомоги як для лікарів
                    (фельдшерських бригад), так і для пацієнтів.
                  </p>
                </div>
              </div>

              <SiteButton
                href="/contacts"
                variant="primary"
                size="l"
                className={styles.heroButton}
                onClick={(event) => {
                  event.preventDefault();
                  openContactForm();
                }}
              >
                Звʼязатися з нами
              </SiteButton>
            </div>

            <div className={styles.heroImageCard}>
              <Image
                src="/figma/production-page/hero-image.png"
                alt="Виробництво"
                fill
                sizes="650px"
                unoptimized
                className={styles.heroImage}
                priority
              />
            </div>
          </div>

          <div className={styles.heroGlow} aria-hidden="true" />
        </section>

        <section className={styles.typesSection}>
          <h2 className={styles.sectionTitle}>Типи автомобілів швидкої допомоги</h2>
          <div className={styles.typesGrid}>
            {typeCards.map((card) =>
              card.kind === "copy" ? (
                <article key={card.title} className={styles.typeCard}>
                  <div className={styles.typeCardGlow} aria-hidden="true" />
                  <h3 className={styles.typeCardTitle}>{card.title}</h3>
                  <p className={styles.typeCardBody}>{card.body}</p>
                </article>
              ) : (
                <article key={card.letter} className={styles.typeLetterCard}>
                  <div className={styles.typeCardGlow} aria-hidden="true" />
                  <span className={styles.typeLetter}>{card.letter}</span>
                </article>
              ),
            )}
          </div>
        </section>

        <section className={styles.constructionSection}>
          <div className={styles.constructionInner}>
            <h2 className={styles.sectionTitle}>Конструкція автомобілів</h2>
            <div className={styles.constructionGrid}>
              {constructionCards.map((card) => (
                <article
                  key={card.title}
                  className={`${styles.constructionCard} ${card.rowClassName}`}
                >
                  <div className={styles.constructionBadge}>{card.emoji}</div>
                  <h3 className={styles.constructionTitle}>{card.title}</h3>
                  <p className={styles.constructionBody}>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.medicalSection}>
          <div className={styles.medicalHeader}>
            <h2 className={styles.sectionTitle}>Медичне обладнання</h2>
            <p className={styles.medicalBody}>
              Фахівці нашої компанії комплектують “швидкі” необхідним медичним
              обладнанням згідно з вимогами до відповідного типу автомобілю (А1
              та А2, В та С, а також неонатальні).
            </p>
            <p className={styles.medicalBody}>
              Ми використовуємо медичне обладнання яке відповідає стандартам
              щодо надання невідкладної медичної допомоги, безпеки та комфорту
              пацієнтів і медпрацівників.
            </p>
          </div>

          <div className={styles.medicalGrid}>
            {medicalCards.map((src, index) => (
              <div key={src} className={styles.medicalCard}>
                <Image
                  src={src}
                  alt={`Медичне обладнання ${index + 1}`}
                  fill
                  sizes="266px"
                  unoptimized
                  className={styles.medicalImage}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.chassisShell}>
          <ChassisSection
            title="Шасі"
            body={'Зазначені типи "швидких" виробляються на базових шасі Citroën, Peugeot, Ford, Mercedes-Benz'}
            note="Прямі договори з виробником базових автомобілів дозволяють нам забезпечувати найкращі ціни на продукцію"
          />
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.galleryGrid}>
            {visibleGalleryCards.map((card, index) => (
              <div key={index} className={styles.galleryCard}>
                <Image
                  src={card.src}
                  alt={`Фото виробництва ${index + 1}`}
                  fill
                  sizes="426px"
                  unoptimized
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>

          <SiteButton
            disabled={!hasMoreGalleryPhotos}
            onClick={() => {
              if (!hasMoreGalleryPhotos) {
                return;
              }

              setVisibleGalleryCount((current) =>
                Math.min(
                  current +
                    (isMobileGallery
                      ? MOBILE_GALLERY_INCREMENT
                      : extraGalleryCards.length),
                  allGalleryCards.length,
                ),
              );
            }}
            variant="tertiary"
            size="m"
            className={styles.galleryButton}
          >
            Більше фото
          </SiteButton>
        </section>
      </main>

      <Footer />
    </div>
  );
}
