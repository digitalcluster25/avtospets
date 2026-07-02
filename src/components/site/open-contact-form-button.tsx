"use client";

import type { ReactNode } from "react";
import { SiteButton } from "@/components/site/button";
import { useContactForm } from "@/components/site/contact-form-provider";

type OpenContactFormButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  size?: "l" | "m";
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
};

export function OpenContactFormButton({
  children,
  className,
  href = "/contacts",
  size = "l",
  variant = "primary",
}: OpenContactFormButtonProps) {
  const { openContactForm } = useContactForm();

  return (
    <SiteButton
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        openContactForm();
      }}
      size={size}
      variant={variant}
    >
      {children}
    </SiteButton>
  );
}
