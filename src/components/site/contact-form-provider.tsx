"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ContactFormModal } from "@/components/site/contact-form-modal";

type ContactFormContextValue = {
  closeContactForm: () => void;
  openContactForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      closeContactForm: () => setIsOpen(false),
      openContactForm: () => setIsOpen(true),
    }),
    [],
  );

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      <ContactFormModal isOpen={isOpen} onClose={value.closeContactForm} />
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);

  if (!context) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }

  return context;
}
