import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectOperations,
  selectStartingBalance,
} from "../../redux/users/usersSelectors";
import { Btn } from "../../components/Button/Button";
import { updateStartingBalance } from "../../redux/users/usersOperations";
import { setStartingBalance } from "../../redux/users/usersSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { HomeContainer } from "../../components/HomeContainer/HomeContainer";
import styles from "./Balance.module.scss";

type BalanceProps = {
  monthOffset?: number;
  setMonthOffset?: React.Dispatch<React.SetStateAction<number>>;
  date?: Date;
  page: "home" | "calc";
};

export const Balance = ({
  monthOffset,
  setMonthOffset,
  date,
  page,
}: BalanceProps) => {
  const dispatch = useDispatch();
  const ops = useSelector(selectOperations) ?? [];
  const startBalance = useSelector(selectStartingBalance) ?? 0;
  const { income, expense } = ops.reduce(
    (acc, op) => {
      const sum = Number(op.sum) || 0;

      if (op.type === "income") {
        acc.income += sum;
      }

      if (op.type === "expense") {
        acc.expense += sum;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = Number(startBalance) + income - expense;
  const [value, setValue] = useState("");

  const handleConfirm = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (value.trim() === "") return;

    const newBalance = Number(value);

    if (isNaN(newBalance)) return;

    try {
      await updateStartingBalance(newBalance);

      dispatch(setStartingBalance(newBalance));

      setValue("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {page === "home" ? (
        <div className={styles.sect}>
          <HomeContainer>
            <div className={styles.wrap}>
              <Link className={styles.navTo} to="/calculations">
                Перейти до розрахунків
                <svg className={styles.statisticIcon} width="24" height="24">
                  <use href="#bar-chart"></use>
                </svg>
              </Link>
              <div className={styles.void}></div>
              <form className={styles.form} onSubmit={handleConfirm}>
                <p className={styles.balanceTitle}>Баланс:</p>
                <div className={styles.balanceWrap}>
                  <input
                    className={styles.input}
                    type="number"
                    value={value}
                    placeholder={String(balance)}
                    onFocus={() => setValue("")}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Btn
                    text={"підтвердити"}
                    btnType={"submit"}
                    variant={"diseable"}
                    shadow={false}
                  />
                </div>
              </form>
              <Link className={styles.nav} to="/calculations">
                Перейти до розрахунків
                <svg className={styles.statisticIcon} width="24" height="24">
                  <use href="#bar-chart"></use>
                </svg>
              </Link>
            </div>
          </HomeContainer>
        </div>
      ) : (
        <div className={styles.sect}>
          <HomeContainer>
            <Link className={styles.navBack} to="/">
              <svg className={styles.backIcon} width="24" height="24">
                <use href="#arrow-back"></use>
              </svg>
            </Link>
            <div className={styles.wrap}>
              <Link className={styles.nav} to="/">
                <svg className={styles.backIcon} width="24" height="24">
                  <use href="#arrow-back"></use>
                </svg>
                Повернутись на головну
              </Link>
              <form className={styles.form} onSubmit={handleConfirm}>
                <p className={styles.balanceTitle}>Баланс:</p>
                <div className={styles.balanceWrap}>
                  <input
                    className={styles.input}
                    type="number"
                    value={value}
                    placeholder={String(balance)}
                    onFocus={() => setValue("")}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Btn
                    text={"підтвердити"}
                    btnType={"submit"}
                    variant={"diseable"}
                    shadow={false}
                  />
                </div>
              </form>
              <div className={styles.date}>
                <button
                  className={styles.arrow}
                  type="button"
                  onClick={() => setMonthOffset((p) => p + 1)}
                >
                  <svg className={styles.arrowL} width="11" height="6">
                    <use href="#arrow-down"></use>
                  </svg>
                </button>
                <div className={styles.texts}>
                  <p className={styles.text}>Поточний період</p>

                  <p className={styles.data}>
                    {date.toLocaleDateString("uk-UA", {
                      month: "long",
                    })}
                  </p>

                  <p className={styles.data}>
                    {date.toLocaleDateString("uk-UA", {
                      year: "numeric",
                    })}
                  </p>
                </div>

                <button
                  className={styles.arrow}
                  type="button"
                  disabled={monthOffset === 0}
                  onClick={() => setMonthOffset((p) => p - 1)}
                >
                  <svg className={styles.arrowR} width="11" height="6">
                    <use href="#arrow-down"></use>
                  </svg>
                </button>
              </div>
            </div>
          </HomeContainer>
        </div>
      )}
    </>
  );
};
