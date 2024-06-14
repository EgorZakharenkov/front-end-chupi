import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type Props = {
  children: string;
  onClick?: () => void;
  variant?: "default" | "green";
};
const Button: React.FC<Props> = ({ children, onClick, variant }) => {
  return (
    <button
      type={"button"}
      className={classNames(styles.button, {
        [styles.green]: variant === "green",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
