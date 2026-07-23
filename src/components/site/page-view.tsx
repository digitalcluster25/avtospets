import { cookies } from "next/headers";
import { FooterStatic } from "@/components/site/footer-static";
import { Header } from "@/components/site/header";
import { ContactFormProvider } from "@/components/site/contact-form-provider";
import { OpenContactFormButton } from "@/components/site/open-contact-form-button";
import { SiteButton } from "@/components/site/button";
import {
  SITE_LANGUAGE_COOKIE_KEY,
  type SiteLanguage,
} from "@/components/site/site-language";
import type {
  CardSection,
  ContactSection,
  DocumentsSection,
  GallerySection,
  RichTextSection,
  SitePage,
  StatsSection,
  TestimonialsSection,
} from "@/lib/site/types";
import styles from "./page-view.module.css";

type PageViewProps = {
  page: SitePage;
};

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? (
        <p className={styles.sectionDescription}>{description}</p>
      ) : null}
    </div>
  );
}

function CardsSection({ section }: { section: CardSection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.cardGrid}>
          {section.items.map((item, index) => (
            <article className={styles.card} key={item.title}>
              <span className={styles.cardIndex}>
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSectionView({ section }: { section: StatsSection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.statsGrid}>
          {section.items.map((item) => (
            <article className={styles.stat} key={item.label}>
              <span className={styles.statValue}>{item.value}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySectionView({ section }: { section: GallerySection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.gallery}>
          {section.items.map((item) => (
            <article className={styles.galleryItem} key={item.title}>
              <strong className={styles.cardTitle}>{item.title}</strong>
              <div className={styles.galleryAccent} />
              <p className={styles.galleryCaption}>{item.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSectionView({
  section,
}: {
  section: TestimonialsSection;
}) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.quoteGrid}>
          {section.items.map((item) => (
            <blockquote key={item.author} className={styles.quote}>
              <p className={styles.quoteText}>{item.quote}</p>
              <footer className={styles.quoteAuthor}>
                {item.author}
                {item.role ? `, ${item.role}` : ""}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentsSectionView({ section }: { section: DocumentsSection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.documents}>
          {section.items.map((item) => (
            <article key={item.name} className={styles.document}>
              <span className={styles.documentName}>{item.name}</span>
              <span className={styles.documentMeta}>{item.meta}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSectionView({ section }: { section: ContactSection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className={styles.contactGrid}>
          <div className={styles.contactPanel}>
            <h3 className={styles.cardTitle}>{section.panelTitle}</h3>
            <p className={styles.cardBody}>{section.panelBody}</p>
          </div>
          <div className={styles.contactList}>
            {section.items.map((item) => (
              <div key={item.label} className={styles.contactItem}>
                <span className={styles.contactLabel}>{item.label}</span>
                <span className={styles.contactValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RichTextSectionView({ section }: { section: RichTextSection }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      </div>
    </section>
  );
}

function renderSections(page: SitePage) {
  return page.sections.map((section) => {
    switch (section.type) {
      case "cards":
        return <CardsSection key={section.id} section={section} />;
      case "stats":
        return <StatsSectionView key={section.id} section={section} />;
      case "gallery":
        return <GallerySectionView key={section.id} section={section} />;
      case "testimonials":
        return <TestimonialsSectionView key={section.id} section={section} />;
      case "documents":
        return <DocumentsSectionView key={section.id} section={section} />;
      case "contact":
        return <ContactSectionView key={section.id} section={section} />;
      case "richText":
        return <RichTextSectionView key={section.id} section={section} />;
      default:
        return null;
    }
  });
}

export async function PageView({ page }: PageViewProps) {
  const cookieStore = await cookies();
  const language: SiteLanguage =
    cookieStore.get(SITE_LANGUAGE_COOKIE_KEY)?.value === "en" ? "en" : "ua";

  if (page.uri === "/") {
    const { MainPage } = await import("@/components/site/main-page");
    return <MainPage page={page} />;
  }

  if (
    page.uri === "/avtomobili-type-c" ||
    page.uri.startsWith("/avtomobili-type-c/") ||
    page.uri === "/avtomobili-type-social" ||
    page.uri.startsWith("/avtomobili-type-social/")
  ) {
    const { TypeCPage } = await import("@/components/site/type-c-page");
    return <TypeCPage language={language} page={page} />;
  }

  if (page.uri === "/production") {
    const { ProductionPage } = await import("@/components/site/production-page");
    return (
      <ContactFormProvider>
        <ProductionPage language={language} page={page} />
      </ContactFormProvider>
    );
  }

  if (page.uri === "/contacts") {
    const { ContactPage } = await import("@/components/site/contact-page");
    return (
      <ContactFormProvider>
        <ContactPage language={language} page={page} />
      </ContactFormProvider>
    );
  }

  if (page.uri === "/services") {
    const { ServicePage } = await import("@/components/site/service-page");
    return (
      <ContactFormProvider>
        <ServicePage language={language} page={page} />
      </ContactFormProvider>
    );
  }

  if (page.uri === "/aboutus") {
    const { AboutPage } = await import("@/components/site/about-page");
    return <AboutPage language={language} page={page} />;
  }

  if (page.uri === "/testimonials") {
    const { TestimonialsPage } = await import("@/components/site/testimonials-page");
    return <TestimonialsPage language={language} page={page} />;
  }

  if (page.uri === "/sertifications") {
    const { CertificationsPage } = await import("@/components/site/certifications-page");
    return <CertificationsPage language={language} page={page} />;
  }

  return (
    <ContactFormProvider>
      <div className={styles.shell}>
        <Header currentPath={page.uri} initialLanguage={language} page={page} />
        <main>
          <section className={styles.hero}>
            <div className="container">
              <div className={styles.heroPanel}>
                <div className={styles.heroGrid}>
                  <div className={styles.heroContent}>
                    <span className="eyebrow">{page.eyebrow}</span>
                    <h1 className={styles.heroTitle}>{page.title}</h1>
                    <p className={styles.heroDescription}>{page.description}</p>
                    <div className={styles.heroActions}>
                      <OpenContactFormButton
                        className={styles.primaryAction}
                        href={page.ctaHref}
                        variant="primary"
                        size="l"
                      >
                        {page.ctaLabel ?? "Связаться"}
                      </OpenContactFormButton>
                      <SiteButton
                        className={styles.secondaryAction}
                        href="#content"
                        variant="secondary"
                        size="l"
                      >
                        Смотреть структуру
                      </SiteButton>
                    </div>
                  </div>

                  <div className={styles.heroFacts}>
                    {page.heroFacts.map((fact) => (
                      <article key={fact.label} className={styles.factCard}>
                        <span className={styles.factValue}>{fact.value}</span>
                        <span className={styles.factLabel}>{fact.label}</span>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="content">{renderSections(page)}</div>
          <div className={styles.footerSpace} />
        </main>
        <FooterStatic language={language} />
      </div>
    </ContactFormProvider>
  );
}
