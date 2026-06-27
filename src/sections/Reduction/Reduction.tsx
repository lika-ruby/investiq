import { useSelector } from "react-redux";
import { selectOperations } from "../../redux/users/usersSelectors";
import styles from "./Reduction.module.scss";

type ReductionProps = {
  type: "expense" | "income";
};

export const Reduction = ({ type }: ReductionProps) => {
  const ops = useSelector(selectOperations) ?? [];

  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date();

    date.setMonth(date.getMonth() - i);

    const month = date.toLocaleDateString("uk-UA", {
      month: "long",
    });

    const total = ops
      .filter((op) => {
        const opDate = new Date(op.date);

        return (
          op.type === type &&
          opDate.getMonth() === date.getMonth() &&
          opDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, op) => sum + Number(op.sum), 0);

    months.push({
      month,
      total,
    });
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Зведення</p>
      <ul className={styles.list}>
        {months.map((m) => (
          <li className={styles.item} key={m.month}>
            <p className={styles.month}>{m.month}</p>
            <p className={styles.sum}>{m.total} грн.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
