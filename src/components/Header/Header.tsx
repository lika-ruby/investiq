import { Container } from "../Container/Container.tsx";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/usersSelectors.ts";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/users/usersSlice.ts";
import { logoutUser } from "../../redux/users/usersOperations";
import { useNavigate } from "react-router-dom";

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
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <svg className={styles.logo} width="99" height="31">
            <use href="#logo" />
          </svg>
          {user !== null ? (
            <div className={styles.right}>
              <div className={styles.user}>
                <img className={styles.avatar} src="#" alt="" />
                <p className={styles.name}>{user.displayName}</p>
              </div>
              <div className={styles.line}></div>
              <button
                className={styles.btn}
                onClick={handleLogout}
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
  );
};
