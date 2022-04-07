import styles from "@components/NumberInput.module.scss";

function NumberInput(props) {
  if(props.color === 'green') {
    console.log(props.defaultValue)
  }
  return (
    <input 
      type="number"
      className={`${styles.numberInput}
      ${styles[props.color]}`}
      {...props}
    >
      {props.children}
    </input>
  );
}

export default NumberInput;