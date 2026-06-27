import type { SetStateAction } from "react";
import { Btn } from "../Button/Button.tsx";

type ModalProps = {};

export const Modal = ({}: ModalProps) => {
  <div>
    <div>
      <p></p>
      <div>
        <Btn
          text={"Так"}
          btnType={"button"}
          variant={"primary"}
          shadow={false}
        />
        <Btn
          text={"Ні"}
          btnType={"button"}
          variant={"secondlyO"}
          shadow={false}
        />
      </div>
    </div>
  </div>;
};
