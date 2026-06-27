import styles from "./HomeContainer.module.scss";

export const HomeContainer = ({ children }) => {
  return <div className={styles.homeContainer}>{children}</div>;
};
