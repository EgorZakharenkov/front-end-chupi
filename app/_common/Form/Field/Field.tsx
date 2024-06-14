import React from "react";
import { useField } from "formik";
import styles from "./Field.module.scss";
import classNames from "classnames";
type Props = {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
  variant?: "default" | "dark";
  value?: string;
};
export const Field: React.FC<Props> = ({
  label,
  value = "",
  variant,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div
      className={classNames(styles.customField, {
        [styles.dark]: variant === "dark",
      })}
    >
      <label>{label}</label>
      <input
        {...field}
        {...props}
        className={classNames(styles.input, {
          [styles.inputErrors]: meta.touched && meta.error,
        })}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
