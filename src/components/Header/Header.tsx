import { Container } from "../Container/Container.tsx";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/usersSelectors.ts";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/users/usersSlice.ts";
import { logoutUser } from "../../redux/users/usersOperations";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal.tsx";
import { useState } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
            <svg className={styles.logo} width="99" height="31">
              <use href="#logo" />
            </svg>
            {user !== null ? (
              <div className={styles.right}>
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    {user?.displayName?.[0] ?? "U"}
                  </div>
                  <p className={styles.name}>{user?.displayName ?? "User"}</p>
                </div>
                <div className={styles.line}></div>
                <button
                  className={styles.btn}
                  onClick={() => {
                    openModal();
                  }}
                  type="button"
                >
                  <span className={styles.btn_text}>Вийти</span>
                  <svg className={styles.logout} width="16" height="16">
                    <use href="#logout"></use>
                  </svg>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </Container>
      </header>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        type={"logout"}
        success={() => {
          handleLogout();
          closeModal();
        }}
      />
    </>
  );
};
