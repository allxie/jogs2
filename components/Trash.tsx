import styles from "@components/Trash.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function Trash(props) {
  return (
    <button className={styles.trash} {...props}>
      {props.children}
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export default Trash;
