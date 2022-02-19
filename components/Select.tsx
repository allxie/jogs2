import styles from "@components/Select.module.scss";

function Select(props) {
  return (
    <select className={styles.select} {...props}>
      {props.children}
    </select>
  );
}

export default Select;
