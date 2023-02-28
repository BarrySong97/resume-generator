import React, { ReactNode } from "react";
import styles from "./index.module.css";

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  return <div className={styles.page}>{children}</div>;
}
