import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize = "l" | "m";

type SiteButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  leftIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  rightIcon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function getVariantStateClass(variant: ButtonVariant, disabled: boolean) {
  if (!disabled) {
    switch (variant) {
      case "secondary":
        return styles.secondary;
      case "tertiary":
        return styles.tertiary;
      case "ghost":
        return styles.ghost;
      default:
        return styles.primary;
    }
  }

  switch (variant) {
    case "secondary":
      return styles.secondaryDisabled;
    case "tertiary":
      return styles.tertiaryDisabled;
    case "ghost":
      return styles.ghostDisabled;
    default:
      return styles.primaryDisabled;
  }
}

export function SiteButton({
  children,
  className,
  disabled = false,
  href,
  leftIcon,
  onClick,
  rightIcon,
  size = "l",
  variant = "primary",
}: SiteButtonProps) {
  const sizeClass = size === "m" ? styles.sizeM : styles.sizeL;
  const labelClass = size === "m" ? styles.labelM : styles.labelL;
  const variantClass = getVariantStateClass(variant, disabled);
  const classes = cx(
    styles.button,
    sizeClass,
    variantClass,
    disabled && styles.disabled,
    className,
  );

  const content = (
    <>
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      <span className={labelClass}>{children}</span>
      {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        disabled={disabled}
        className={classes}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span aria-disabled="true" className={classes}>
        {content}
      </span>
    );
  }

  return (
    <button type="button" disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
