import React from "react";
import styles from "./BreadCrumb.module.scss";

const BreadCrumb: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className={styles.breadCrump}>
      <p>{name}</p>
    </div>
  );
};

export default BreadCrumb;
