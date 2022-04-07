import styles from "@components/Content.module.scss";
import React from "react";

function Content(props: React.PropsWithChildren<unknown>) {
  return <div className={styles.content}>{props.children}</div>;
}

export default Content;
