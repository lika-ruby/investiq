import styles from "./Container.module.scss";

type Props = {
  children: any;
};

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
