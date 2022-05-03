import styles from "@components/H2.module.scss";

function H2(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2 className={styles.heading} {...props}>
      {props.children}
    </h2>
  );
}

export default H2;
