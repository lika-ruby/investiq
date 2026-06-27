import styles from "./Button.module.scss";
type BtnProps = {
  text: string;
  func?: () => void;
  btnType: "button" | "submit" | "reset";
  variant: "primary" | "secondlyF" | "secondlyO" | "diseable";
  shadow: boolean;
};

export const Btn = ({ text, func, btnType, variant, shadow }: BtnProps) => {
  return (
    <button
      onClick={func}
      type={btnType}
      className={`${styles.btn} ${styles[variant]} ${
        shadow ? styles.shadow : ""
      }`}
    >
      {text}
    </button>
  );
};
