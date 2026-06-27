import styles from "./AddItem.module.scss";
import { Btn } from "../../components/Button/Button.tsx";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setOperation,
  setError,
} from "../../redux/users/usersSlice.ts";
import { addOperation } from "../../redux/users/usersOperations.ts";
import { useState } from "react";
import {
  categoriesExpenseData,
  categoriesIncomeData,
} from "../../data/catagories.ts";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

type AuthProps = {
  type: "expense" | "income";
};

export const AddItem = ({ type }: AuthProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sum, setSum] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [choosed, setChoosed] = useState<boolean>(false);

  const handleOperation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !desc || !sum) return;

    try {
      dispatch(setLoading(true));

      const operation = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        desc,
        category,
        sum: Number(sum),
        type,
      };
      console.log(operation);

      await addOperation(operation);

      dispatch(setOperation(operation));

      setDesc("");
      setSum("");
      setCategory("");
      setChoosed(false);
      navigate("/");

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError("Add operation error"));
      dispatch(setLoading(false));
    }
  };

  const toggleWindow = () => {
    setOpen((prev) => !prev);
  };

  const resetForm = () => {
    setDesc("");
    setSum("");
    setCategory("");
    setChoosed(false);
  };

  return (
    <div className={styles.sect}>
      <div className={styles.container}>
        <Link className={styles.backlink} to={"/"}>
          <svg className={styles.arrowBack} width="24" height="24">
            <use href="#arrow-back"></use>
          </svg>
        </Link>
        <form className={styles.form} onSubmit={handleOperation}>
          <div className={styles.top}>
            <p className={styles.date}>
              <svg className={styles.calendar} width="20" height="20">
                <use href="#calendar"></use>
              </svg>
              {new Date().toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <div className={styles.inputs}>
              <input
                className={styles.desc}
                type="text"
                placeholder="Опис товару"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <div className={styles.wrapper}>
                <button
                  type="button"
                  onClick={toggleWindow}
                  className={`${styles.category} ${
                    choosed ? styles.choosed : ""
                  }`}
                >
                  {category === "" ? "Категорія товару" : category}
                  <svg
                    className={`${styles.arrow} ${open ? styles.open : ""}`}
                    width="11"
                    height="6"
                  >
                    <use href="#arrow-down"></use>
                  </svg>
                </button>
                <ul className={`${styles.list} ${open ? styles.open : ""}`}>
                  {type === "expense"
                    ? categoriesExpenseData.map((c) => (
                        <li key={c.id} id={c.text} className={styles.item}>
                          <button
                            onClick={() => {
                              setCategory(c.text);
                              toggleWindow();
                              setChoosed(true);
                            }}
                            className={styles.btn}
                          >
                            {c.text}
                          </button>
                        </li>
                      ))
                    : categoriesIncomeData.map((c) => (
                        <li key={c.id} id={c.text} className={styles.item}>
                          <button
                            onClick={() => {
                              setCategory(c.text);
                              toggleWindow();
                              setChoosed(true);
                            }}
                            className={styles.btn}
                          >
                            {c.text}
                          </button>
                        </li>
                      ))}
                </ul>
              </div>

              <label className={styles.sumWrapper}>
                <input
                  className={styles.sum}
                  type="number"
                  placeholder="0,00"
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                  required
                />
                <div className={styles.line}></div>
                <svg className={styles.calculator} width="20" height="20">
                  <use href="#calculator"></use>
                </svg>
              </label>
            </div>
          </div>
          <div className={styles.btns}>
            <Btn
              text={"ввести"}
              btnType={"submit"}
              variant={"primary"}
              shadow={false}
            />
            <Btn
              text={"Очистити"}
              btnType={"reset"}
              variant={"secondlyO"}
              shadow={false}
              func={resetForm}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
