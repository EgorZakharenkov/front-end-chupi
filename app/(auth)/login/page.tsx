import { CustomForm } from "@/app/(auth)/components/CustomForm/CustomForm";
import React from "react";
import styles from "../register/page.module.scss";
export default function Page() {
  return (
    <div className={styles.register}>
      <CustomForm />
      <div className={styles.black}>
        <h2>Chupi</h2>
      </div>
    </div>
  );
}
