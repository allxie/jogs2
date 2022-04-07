import styles from "@components/H1.module.scss";
import React from "react";

function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={styles.heading} {...props}>
      {props.children}
    </h1>
  );
}

export default H1;
