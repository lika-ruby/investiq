import { Btn } from "../Button/Button";

import styles from "./Modal.module.scss";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  type: "logout" | "operation";
  success: () => void;
};

export const Modal = ({ isOpen, closeModal, type, success }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p className={styles.text}>
          {type === "logout" ? "Ви дійсно хочете вийти?" : "Ви впевнені?"}
        </p>

        <div className={styles.btns}>
          <Btn
            text={"так"}
            btnType={"button"}
            variant={"primary"}
            shadow={false}
            func={() => {
              success();
              closeModal();
            }}
          />

          <Btn
            text={"ні"}
            btnType={"button"}
            variant={"secondlyO"}
            shadow={false}
            func={closeModal}
          />
        </div>

        <button className={styles.close} onClick={closeModal}>
          <svg className={styles.icon} width="13" height="13">
            <use href="#cross"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
