"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteButton } from "@/components/site/button";
import {
  SITE_LANGUAGE_COOKIE_KEY,
  SITE_LANGUAGE_STORAGE_KEY,
  type SiteLanguage,
} from "@/components/site/site-language";
import type { SitePage } from "@/lib/site/types";
import styles from "./header.module.css";

const translations = {
  ua: {
    vehicles: "Наші авто",
    dropdownItems: [
      { href: "/avtomobili-type-a", label: "Тип А", isAvailable: false },
      { href: "/avtomobili-type-b", label: "Тип В", isAvailable: false },
      { href: "/avtomobili-type-c", label: "Тип С", isAvailable: true },
      {
        href: "/avtomobili-type-social",
        label: "Соціальний",
        isAvailable: false,
      },
    ],
    headerItems: [
      { href: "/production", label: "Виробництво" },
      { href: "/services", label: "Сервіс" },
      { href: "/sertifications", label: "Сертифікати" },
      { href: "/aboutus", label: "Про компанію" },
      { href: "/testimonials", label: "Відгуки" },
      { href: "/contacts", label: "Контакти" },
    ],
    contact: "Звʼязатися з нами",
  },
  en: {
    vehicles: "Vehicles",
    dropdownItems: [
      { href: "/avtomobili-type-a", label: "Type A", isAvailable: false },
      { href: "/avtomobili-type-b", label: "Type B", isAvailable: false },
      { href: "/avtomobili-type-c", label: "Type C", isAvailable: true },
      {
        href: "/avtomobili-type-social",
        label: "Social",
        isAvailable: false,
      },
    ],
    headerItems: [
      { href: "/production", label: "Production" },
      { href: "/services", label: "Service" },
      { href: "/sertifications", label: "Certificates" },
      { href: "/aboutus", label: "About us" },
      { href: "/testimonials", label: "Reviews" },
      { href: "/contacts", label: "Contacts" },
    ],
    contact: "Contact us",
  },
} satisfies Record<
  SiteLanguage,
  {
    vehicles: string;
    dropdownItems: Array<{ href: string; isAvailable: boolean; label: string }>;
    headerItems: Array<{ href: string; label: string }>;
    contact: string;
  }
>;

type HeaderProps = {
  currentPath: string;
  initialLanguage: SiteLanguage;
  page: SitePage;
  transparent?: boolean;
};

export function Header({
  currentPath,
  initialLanguage,
  page,
  transparent = false,
}: HeaderProps) {
  const [language, setLanguage] = useState<SiteLanguage>(initialLanguage);
  const copy = translations[language];
  const [openMenu, setOpenMenu] = useState<"vehicles" | "language" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const vehiclesRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (
        vehiclesRef.current?.contains(target) ||
        languageRef.current?.contains(target)
      ) {
        return;
      }

      setOpenMenu(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.documentElement.lang = language === "ua" ? "uk" : "en";
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
    document.cookie = `${SITE_LANGUAGE_COOKIE_KEY}=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  function closeAllMenus() {
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }

  return (
    <header className={transparent ? styles.headerTransparent : styles.header}>
      <div className={transparent ? styles.barTransparent : styles.bar}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/figma/header-logo-exact.svg"
            alt="Автоспецпром"
            width={213}
            height={32}
            priority
            className={styles.brandImage}
          />
        </Link>

        <nav className={styles.nav}>
          <div
            ref={vehiclesRef}
            className={`${styles.dropdownGroup} ${
              openMenu === "vehicles" ? styles.dropdownGroupOpen : ""
            }`}
          >
            <button
              type="button"
              className={
                `${currentPath.startsWith("/avtomobili-type-") ? styles.navLinkActive : styles.navLink} ${styles.dropdownTrigger}`
              }
              aria-haspopup="menu"
              aria-expanded={openMenu === "vehicles"}
              onClick={() =>
                setOpenMenu((current) =>
                  current === "vehicles" ? null : "vehicles",
                )
              }
            >
              <span>{copy.vehicles}</span>
              <span className={styles.caretWrap} aria-hidden>
                <Image
                  src="/figma/header-caret-menu.svg"
                  alt=""
                  width={10}
                  height={6}
                  className={styles.caret}
                />
              </span>
            </button>

            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownMenuInner}>
                {copy.dropdownItems.map((item) =>
                  item.isAvailable ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.dropdownItem}
                      onClick={() => setOpenMenu(null)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      key={item.href}
                      className={styles.dropdownItemDisabled}
                      aria-disabled="true"
                    >
                      <span className={styles.dropdownItemText}>{item.label}</span>
                      <span className={styles.dropdownItemChip}>В разработке</span>
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {copy.headerItems.map((item) => {
            const active = currentPath === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.navLinkActive : styles.navLink}
                onClick={() => setOpenMenu(null)}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.mobileToggle}
            aria-expanded={mobileMenuOpen}
            aria-label="Відкрити меню"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span className={styles.mobileToggleBar} />
            <span className={styles.mobileToggleBar} />
            <span className={styles.mobileToggleBar} />
          </button>
          <div
            ref={languageRef}
            className={`${styles.langGroup} ${
              openMenu === "language" ? styles.langGroupOpen : ""
            }`}
          >
            <button
              type="button"
              className={styles.lang}
              aria-haspopup="menu"
              aria-expanded={openMenu === "language"}
              onClick={() =>
                setOpenMenu((current) =>
                  current === "language" ? null : "language",
                )
              }
            >
              <span>{language.toUpperCase()}</span>
              <span className={styles.caretWrap} aria-hidden>
                <Image
                  src="/figma/header-caret-lang.svg"
                  alt=""
                  width={10}
                  height={6}
                  className={styles.caret}
                />
              </span>
            </button>

            <div className={styles.langMenu}>
              <div className={styles.langMenuInner}>
                <button
                  type="button"
                  className={
                    language === "ua"
                      ? styles.langMenuItemActive
                      : styles.langMenuItem
                  }
                  onClick={() => {
                    setLanguage("ua");
                    setOpenMenu(null);
                  }}
                >
                  UA
                </button>
                <button
                  type="button"
                  className={
                    language === "en"
                      ? styles.langMenuItemActive
                      : styles.langMenuItem
                  }
                  onClick={() => {
                    setLanguage("en");
                    setOpenMenu(null);
                  }}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
          <SiteButton
            href={page.ctaHref ?? "/contacts"}
            variant="primary"
            size="l"
            className={styles.cta}
          >
            {copy.contact}
          </SiteButton>
        </div>
      </div>
      <button
        type="button"
        className={`${styles.mobileOverlay} ${
          mobileMenuOpen ? styles.mobileOverlayOpen : ""
        }`}
        aria-label="Закрити меню"
        tabIndex={mobileMenuOpen ? 0 : -1}
        aria-hidden={!mobileMenuOpen}
        onClick={closeAllMenus}
      />
      <div
        className={`${styles.mobilePanel} ${
          mobileMenuOpen ? styles.mobilePanelOpen : ""
        }`}
        inert={!mobileMenuOpen}
      >
            <div className={styles.mobilePanelHeader}>
              <Link href="/" className={styles.mobilePanelBrand} onClick={closeAllMenus}>
                <Image
                  src="/figma/header-logo-exact.svg"
                  alt="Автоспецпром"
                  width={213}
                  height={32}
                  className={styles.mobilePanelLogo}
                />
              </Link>
              <button
                type="button"
                className={styles.mobileClose}
                aria-label="Закрити меню"
                onClick={closeAllMenus}
              >
                ×
              </button>
            </div>

            <div className={styles.mobilePanelBody}>
              <div className={styles.mobileSection}>
                <p className={styles.mobileLabel}>{copy.vehicles}</p>
                <div className={styles.mobileLinks}>
                  {copy.dropdownItems.map((item) =>
                    item.isAvailable ? (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={
                          currentPath === item.href
                            ? styles.mobileLinkActive
                            : styles.mobileLink
                        }
                        onClick={closeAllMenus}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        key={item.href}
                        className={styles.mobileLinkDisabled}
                        aria-disabled="true"
                      >
                        <span className={styles.mobileLinkText}>{item.label}</span>
                        <span className={styles.mobileLinkChip}>В разработке</span>
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.mobileSection}>
                <div className={styles.mobileLinks}>
                  {copy.headerItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        currentPath === item.href ? styles.mobileLinkActive : styles.mobileLink
                      }
                      onClick={closeAllMenus}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.mobileFooter}>
                <div className={styles.mobileLangs}>
                  <button
                    type="button"
                    className={language === "ua" ? styles.mobileLangActive : styles.mobileLang}
                    onClick={() => setLanguage("ua")}
                  >
                    UA
                  </button>
                  <button
                    type="button"
                    className={language === "en" ? styles.mobileLangActive : styles.mobileLang}
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </button>
                </div>
                <SiteButton
                  href={page.ctaHref ?? "/contacts"}
                  onClick={closeAllMenus}
                  variant="primary"
                  size="l"
                  className={styles.mobileCta}
                >
                  {copy.contact}
                </SiteButton>
              </div>
            </div>
          </div>
    </header>
  );
}
