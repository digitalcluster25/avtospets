import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">404</span>
        <h1>Страница не найдена</h1>
        <p>
          Маршрут отсутствует в текущей карте сайта. Проверьте slug в
          WordPress или вернитесь на главную.
        </p>
        <Link href="/" className={styles.link}>
          На главную
        </Link>
      </div>
    </main>
  );
}
