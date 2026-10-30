import Link from "next/link";
import { cookies } from "next/headers";
import { tr } from "@/components/site/i18n";
import { SITE_LANGUAGE_COOKIE_KEY } from "@/components/site/site-language";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const cookieStore = await cookies();
  const language =
    cookieStore.get(SITE_LANGUAGE_COOKIE_KEY)?.value === "en" ? "en" : "ua";

  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">404</span>
        <h1>{tr(language, "Страница не найдена")}</h1>
        <p>
          {tr(
            language,
            "Маршрут отсутствует в текущей карте сайта. Проверьте slug в WordPress или вернитесь на главную.",
          )}
        </p>
        <Link href="/" className={styles.link}>
          {tr(language, "На главную")}
        </Link>
      </div>
    </main>
  );
}
