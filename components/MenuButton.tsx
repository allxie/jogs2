import styles from "@components/MenuButton.module.scss";

function Trash(props) {
  return (
    <button className={styles.menuButton} {...props}>
      {props.children}
    </button>
  );
}

export default Trash;
