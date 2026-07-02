import Image from "next/image";
import styles from "./chassis-section.module.css";

type ChassisSectionProps = {
  body: string;
  note: string;
  title: string;
};

const chassisCards = [
  {
    key: "peugeot",
    itemClassName: styles.brandItemPeugeot,
    imageClassName: styles.brandImagePeugeot,
    src: "/figma/chassis-3475/logo-peugeot.webp",
    width: 92,
    height: 100,
  },
  {
    key: "citroen",
    itemClassName: styles.brandItemCitroen,
    imageClassName: styles.brandImageCitroen,
    src: "/figma/chassis-3475/logo-citroen.webp",
    width: 154,
    height: 86,
  },
  {
    key: "ford",
    itemClassName: styles.brandItemFord,
    imageClassName: styles.brandImageFord,
    src: "/figma/chassis-3475/logo-ford.webp",
    width: 181,
    height: 65,
  },
  {
    key: "mercedes",
    itemClassName: styles.brandItemMercedes,
    imageClassName: styles.brandImageMercedes,
    src: "/figma/chassis-3475/logo-mercedes.webp",
    width: 180,
    height: 112,
  },
] as const;

export function ChassisSection({ body, note, title }: ChassisSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>

      <div className={styles.grid}>
        {chassisCards.map((item) => (
          <div key={item.key} className={styles.card}>
            <div className={styles.frame}>
              <div className={item.itemClassName}>
                <Image
                  src={item.src}
                  alt={item.key}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  sizes="(max-width: 768px) 40vw, 180px"
                  className={item.imageClassName}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.note}>{note}</p>
    </section>
  );
}
