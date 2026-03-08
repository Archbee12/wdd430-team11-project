"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import styles from "./auth-form.module.css";

type PasswordInputProps = {
  name: string;
  placeholder?: string;
};

export default function PasswordInput({ name, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.passwordWrapper}>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={styles.passwordInput}
      />

      <button
        type="button"
        className={styles.eyeButton}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeSlashIcon className={styles.eyeIcon} />
        ) : (
          <EyeIcon className={styles.eyeIcon} />
        )}
      </button>
    </div>
  );
}