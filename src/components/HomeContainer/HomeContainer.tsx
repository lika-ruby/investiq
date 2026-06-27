import styles from "./HomeContainer.module.scss";

type Props = {
  children: any;
};

export const HomeContainer = ({ children }: Props) => {
  return <div className={styles.homeContainer}>{children}</div>;
};
