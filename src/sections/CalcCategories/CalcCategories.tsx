import { useEffect, useState } from "react";
import {
  categoriesExpenseData,
  categoriesIncomeData,
} from "../../data/catagories";
import { useSelector } from "react-redux";
import { selectOperations } from "../../redux/users/usersSelectors";

import { useNavigate } from "react-router-dom";
import { HomeContainer } from "../../components/HomeContainer/HomeContainer";
import styles from "./CalcCategories.module.scss";

type CalcCategoriesProps = {
  type: "expense" | "income";
  date: Date | null;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const CalcCategories = ({
  type,
  date,
  setCategory,
}: CalcCategoriesProps) => {
  const ops = useSelector(selectOperations);
  const [isExpense, setIsExpense] = useState(type === "expense");

  const navigate = useNavigate();

  const toggleIsExpense = () => {
    setIsExpense((prev) => !prev);
  };

  useEffect(() => {
    if (isExpense) {
      navigate("/calculations/expense");
    } else {
      navigate("/calculations/income");
    }
  }, [isExpense, navigate]);

  const getSumByCategory = (category: string) => {
    if (!ops || !date) return 0;

    let sum = 0;

    ops.forEach((op) => {
      const opDate = new Date(op.date);

      const isSameMonth =
        opDate.getMonth() === date.getMonth() &&
        opDate.getFullYear() === date.getFullYear();

      const isSameType =
        type === "expense" ? op.type === "expense" : op.type === "income";

      const isSameCategory = op.category === category;
      if (isSameMonth && isSameType && isSameCategory) {
        sum += Number(op.sum) || 0;
      }
    });

    return sum;
  };

  return (
    <div className={styles.sect}>
      <HomeContainer>
        <div className={styles.wrap}>
          <div className={styles.choose}>
            <button
              className={styles.arrow}
              onClick={toggleIsExpense}
              type="button"
            >
              <svg className={styles.arrowL} width="11" height="6">
                <use href="#arrow-down"></use>
              </svg>
            </button>

            <p className={styles.subtitle}>
              {isExpense ? "Витрати" : "Доходи"}
            </p>

            <button
              className={styles.arrow}
              onClick={toggleIsExpense}
              type="button"
            >
              <svg className={styles.arrowR} width="11" height="6">
                <use href="#arrow-down"></use>
              </svg>
            </button>
          </div>

          <ul className={styles.list}>
            {(isExpense ? categoriesExpenseData : categoriesIncomeData).map(
              (data) => (
                <li className={styles.item} key={data.text}>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setCategory(data.text);
                    }}
                  >
                    <p className={styles.sum}>
                      {getSumByCategory(data.text)} грн.
                    </p>
                    <svg className={styles.icon} width="56" height="56">
                      <use href={`#${data.url}`}></use>
                    </svg>
                    <p className={styles.category}>{data.text}</p>
                    <div className={styles.box}></div>
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </HomeContainer>
    </div>
  );
};
