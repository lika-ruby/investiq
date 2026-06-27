import { useSelector } from "react-redux";
import { selectOperations } from "../../redux/users/usersSelectors";
import { HomeContainer } from "../../components/HomeContainer/HomeContainer";
import styles from "./CalcSum.module.scss";

type Props = {
  date: Date;
};

export const CalcSum = ({ date }: Props) => {
  const ops = useSelector(selectOperations) ?? [];

  const targetMonth = date.getMonth();
  const targetYear = date.getFullYear();

  const { expense, income } = ops.reduce(
    (acc, op) => {
      const opDate = new Date(op.date);

      const isSameMonth =
        opDate.getMonth() === targetMonth &&
        opDate.getFullYear() === targetYear;

      if (!isSameMonth) return acc;

      const sum = Number(op.sum);

      if (op.type === "expense") {
        acc.expense += sum;
      }

      if (op.type === "income") {
        acc.income += sum;
      }

      return acc;
    },
    { expense: 0, income: 0 }
  );

  return (
    <div className={styles.sect}>
      <HomeContainer>
        <div className={styles.wrap}>
          <p className={styles.text}>
            Витрати: <span className={styles.expense}>- {expense} грн.</span>
          </p>
          <div className={styles.line}></div>
          <p className={styles.text}>
            Доходи: <span className={styles.income}>+ {income} грн.</span>
          </p>
        </div>
      </HomeContainer>
    </div>
  );
};
