"use client";

import React, { ReactNode } from "react";
import styles from "./form-card.module.css";

type FormCardProps = {
  title: string;
  message?: string;
  children: ReactNode;
};

export default function FormCard({ title, message, children }: FormCardProps) {
  return (
    <div className={styles.wrapper}>
      <form className={styles.formCard}>
        <h2 className={styles.title}>{title}</h2>
        {message && <p className={styles.message}>{message}</p>}
        {children}
      </form>
    </div>
  );
}
