import React, { ReactNode } from "react";
import styles from "./Wrapper.module.css";

interface Props {
  children?: ReactNode;
}

const Wrapper = ({ children }: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>{children}</div>
    </div>
  );
};

export default Wrapper;
