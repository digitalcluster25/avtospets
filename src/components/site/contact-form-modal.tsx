"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import styles from "./contact-form-modal.module.css";

const contactOptions = ["Telegram", "WhatsApp", "Телефон"] as const;

type ContactFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactFormModal({
  isOpen,
  onClose,
}: ContactFormModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedContactMethod, setSelectedContactMethod] = useState(
    "Спосіб звʼязку з вами",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function resetFormState() {
    setIsDropdownOpen(false);
    setPhone("");
    setName("");
    setSelectedContactMethod("Спосіб звʼязку з вами");
    setIsSubmitting(false);
    setSubmitMessage("");
    setIsSuccess(false);
  }

  function handleClose() {
    resetFormState();
    onClose();
  }

  function formatPhoneInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    const country = digits.slice(0, 2);
    const first = digits.slice(2, 5);
    const second = digits.slice(5, 8);
    const third = digits.slice(8, 10);
    const fourth = digits.slice(10, 12);

    if (!country) {
      return "";
    }

    let formatted = `+${country}`;

    if (first) {
      formatted += ` ${first}`;
    }

    if (second) {
      formatted += ` ${second}`;
    }

    if (third) {
      formatted += ` ${third}`;
    }

    if (fourth) {
      formatted += ` ${fourth}`;
    }

    return formatted;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!phone.trim() || !name.trim()) {
      setSubmitMessage("Заповніть номер телефону та імʼя.");
      return;
    }

    if (selectedContactMethod === "Спосіб звʼязку з вами") {
      setSubmitMessage("Оберіть спосіб звʼязку.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          name,
          preferredContactMethod: selectedContactMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsSuccess(true);
    } catch {
      setSubmitMessage("Не вдалося відправити форму.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={isSuccess ? styles.successDialog : styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
      >
        {isSuccess ? (
          <>
            <div className={styles.successContent}>
              <span className={styles.successIcon}>
                <Image
                  src="/figma/contact-modal/success-icon.svg"
                  alt=""
                  fill
                  unoptimized
                />
              </span>

              <div className={styles.successHeader}>
                <h2 id="contact-form-title" className={styles.successTitle}>
                  Ваше замовлення прийнято
                </h2>
                <p className={styles.successSubtitle}>
                  Очікуйте на дзвінок. З вами зв&apos;яжуться наші спеціалісти!
                </p>
              </div>
            </div>

            <button
              type="button"
              className={styles.successButton}
              onClick={handleClose}
            >
              <span className={styles.successButtonLabel}>ОК</span>
            </button>
          </>
        ) : (
          <>
            <div className={styles.header}>
              <h2 id="contact-form-title" className={styles.title}>
                Заповніть форму
              </h2>
              <p className={styles.subtitle}>
                Наш менеджер зв&apos;яжеться з вами впродовж кількох годин
              </p>
            </div>

            <form className={styles.content} onSubmit={handleSubmit}>
              <div className={styles.contactPromptRow}>
                <p className={styles.contactPrompt}>
                  Щоб не чекати, ви можете зв&apos;язатися з нами натиснувши на
                  кнопку телефона.
                </p>

                <a href="tel:+380442336740" className={styles.phoneCard}>
                  <span className={styles.phoneIconCard}>
                    <span className={styles.phoneIcon}>
                      <Image
                        src="/figma/contact-modal/call.svg"
                        alt=""
                        fill
                        unoptimized
                      />
                    </span>
                  </span>
                  <span className={styles.phoneNumber}>+380 (44) 233-67-40</span>
                </a>
              </div>

              <input
                type="tel"
                className={styles.input}
                placeholder="+38 044 233 67 40"
                value={phone}
                onChange={(event) =>
                  setPhone(formatPhoneInput(event.target.value))
                }
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Імʼя"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <div className={styles.dropdownWrap}>
                <button
                  type="button"
                  className={styles.dropdownField}
                  onClick={() => setIsDropdownOpen((current) => !current)}
                >
                  <span className={styles.dropdownValue}>
                    {selectedContactMethod}
                  </span>
                  <span className={styles.dropdownIcon}>
                    <Image
                      src="/figma/contact-modal/arrow-down.svg"
                      alt=""
                      fill
                      unoptimized
                    />
                  </span>
                </button>

                {isDropdownOpen ? (
                  <div className={styles.dropdownMenu}>
                    {contactOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={
                          selectedContactMethod === option
                            ? styles.dropdownOptionActive
                            : styles.dropdownOption
                        }
                        onClick={() => {
                          setSelectedContactMethod(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                <span className={styles.submitLabel}>Відправити</span>
              </button>

              {submitMessage ? (
                <p className={styles.submitMessage}>{submitMessage}</p>
              ) : null}

              <div className={styles.socialSection}>
                <p className={styles.socialTitle}>Ми в соціальних мережах</p>
                <div className={styles.socialIcons}>
                  <span
                    className={styles.socialIconLink}
                    title="Instagram"
                  >
                    <span className={styles.socialIcon}>
                      <span className={styles.instagramInset}>
                        <Image
                          src="/figma/contact-modal/instagram.svg"
                          alt=""
                          fill
                          unoptimized
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className={styles.socialIconLink}
                    title="Facebook"
                  >
                    <span className={styles.socialIcon}>
                      <span className={styles.facebookInset}>
                        <Image
                          src="/figma/contact-modal/facebook.svg"
                          alt=""
                          fill
                          unoptimized
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className={styles.socialIconLink}
                    title="LinkedIn"
                  >
                    <span className={styles.socialIcon}>
                      <span className={styles.linkedinInset}>
                        <Image
                          src="/figma/contact-modal/linkedin.svg"
                          alt=""
                          fill
                          unoptimized
                        />
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </form>
          </>
        )}

        <button
          type="button"
          className={styles.closeButton}
          aria-label="Закрити"
          onClick={handleClose}
        >
          <span className={styles.closeIcon}>
            <Image
              src="/figma/contact-modal/close.svg"
              alt=""
              fill
              unoptimized
            />
          </span>
        </button>
      </div>
    </div>
  );
}
