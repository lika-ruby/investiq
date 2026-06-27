import styles from "./Auth.module.scss";
import { Container } from "../Container/Container.tsx";
import { useState } from "react";
import { Btn } from "../Button/Button.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  registerUser,
  loginUser,
  updateUser,
} from "../../redux/users/usersOperations.ts";

import {
  setUser,
  updateName,
  setLoading,
  setError,
} from "../../redux/users/usersSlice.ts";

import { Link } from "react-router-dom";
type AuthProps = {
  type: "register" | "login";
};

export const Auth = ({ type }: AuthProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const user = await registerUser(email, password);
      dispatch(setUser(user));
      await updateUser(name);

      dispatch(updateName(name));
      dispatch(setLoading(false));
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      dispatch(setError("Registration error"));
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const user = await loginUser(email, password);
      dispatch(setUser(user));
      dispatch(setLoading(false));

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      dispatch(setError("Login error"));
      dispatch(setLoading(false));
    }
  };

  return (
    <section className={styles.sect}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h1 className={styles.title}>InvestIQ</h1>
            <p className={styles.subtitle}>Smart Finance</p>
          </div>
          <form
            onSubmit={type === "register" ? handleRegister : handleLogin}
            className={styles.form}
          >
            <p className={styles.text}>
              Ви можете авторизуватися за допомогою акаунта Google
            </p>
            <div className={styles.google_center}>
              <div className={styles.google_wrap}>
                <svg className={styles.google_icon} width="18" height="18">
                  <use href="#google"></use>
                </svg>
                <p className={styles.google_text}>Google</p>
              </div>
            </div>
            <p className={styles.text}>
              Або увійти за допомогою ел. пошти та праолю після реєстрації
            </p>

            {type === "register" ? (
              <div className={styles.labels}>
                <label className={styles.label}>
                  Ім'я
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Василь Подолець"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className={styles.label}>
                  Електронна пошта:
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className={styles.label}>
                  Пароль:
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
            ) : (
              <div className={styles.labels}>
                <label className={styles.label}>
                  Електронна пошта:
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className={styles.label}>
                  Пароль:
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
            )}

            {type === "register" ? (
              <div className={styles.btns}>
                <Btn
                  text={"реєстрація"}
                  btnType={"submit"}
                  variant={"primary"}
                  shadow={true}
                />
                <Link className={styles.link} to={"/login"}>
                  У вас вже є акаунт? Тоді перейдіть на сторінку Log in
                </Link>
              </div>
            ) : (
              <div className={styles.btns}>
                <Btn
                  text={"увійти"}
                  btnType={"submit"}
                  variant={"primary"}
                  shadow={true}
                />
                <Link className={styles.link} to={"/register"}>
                  У вас ще не має акаунту? Тоді перейдіть на сторінку Register
                </Link>
              </div>
            )}
          </form>
        </div>
      </Container>
      <div className={styles.bg_rect}></div>
    </section>
  );
};
