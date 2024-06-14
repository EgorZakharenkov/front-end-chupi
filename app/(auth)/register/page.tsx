"use client";

import React from "react";
import styles from "./page.module.scss";
import { CustomForm } from "@/app/(auth)/components/CustomForm/CustomForm";

export default function Page() {
  return (
    <div className={styles.register}>
      <div className={styles.black}>
        <h2>Chupi</h2>
      </div>
      <CustomForm register />
    </div>
  );
}
