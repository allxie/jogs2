import styles from "@components/StoryLayout.module.scss";

function StoryLayout(props) {
  return <div className={styles.storyLayout}>{props.children}</div>;
}

export default StoryLayout;
