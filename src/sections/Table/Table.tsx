import { useState, useEffect } from "react";
import styles from "./Table.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { removeOperation, setLoading } from "../../redux/users/usersSlice";
import { selectOperations } from "../../redux/users/usersSelectors";
import { delOperation } from "../../redux/users/usersOperations";
import { Modal } from "../../components/Modal/Modal";

type TableProps = {
  type: "expense" | "income";
};

export const Table = ({ type }: TableProps) => {
  const dispatch = useDispatch();
  const ops = useSelector(selectOperations) ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredOps = ops.filter((op) => op.type === type);

  const handleDelete = async (op: any) => {
    try {
      dispatch(setLoading(true));
      await delOperation(op);
      dispatch(removeOperation(op.id));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOp, setSelectedOp] = useState<any>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <ul className={styles.list}>
          {filteredOps.map((op) => (
            <>
              <li key={op.id} className={styles.item}>
                <div className={styles.left}>
                  <p className={styles.name}>{op.desc}</p>
                  <div className={styles.down}>
                    <p className={styles.date}>{formatDate(op.date)}</p>
                    <p className={styles.category}> {op.category}</p>
                  </div>
                </div>
                <div className={styles.right}>
                  <p
                    className={`${styles.sum} ${
                      op.type === "income" ? styles.income : styles.expense
                    }`}
                  >
                    {op.sum} грн.
                  </p>
                  <button
                    className={styles.del}
                    type="button"
                    onClick={() => {
                      openModal();
                      setSelectedOp(op);
                    }}
                  >
                    <svg className={styles.icon} width="18" height="18">
                      <use href="#delete"></use>
                    </svg>
                  </button>
                </div>
              </li>
              <div className={styles.line}></div>
            </>
          ))}
          {filteredOps.length === 0 && (
            <p className={styles.noresults}>У вас поки що немає операцій</p>
          )}
        </ul>
      ) : (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.row}>
                <th className={styles.data_h}>Дата</th>
                <th className={styles.data_h}>Опис</th>
                <th className={styles.data_h}>категорія</th>
                <th className={styles.data_h}>сума</th>
                <th className={styles.data_h}></th>
              </tr>
            </thead>

            <tbody className={styles.body}>
              {filteredOps.map((op) => (
                <tr key={op.id} className={styles.row}>
                  <td className={styles.data}>{formatDate(op.date)}</td>
                  <td className={styles.data}>{op.desc}</td>
                  <td className={styles.data}>{op.category}</td>
                  <td
                    className={`${styles.dataSum} ${
                      op.type === "income" ? styles.income : styles.expense
                    }`}
                  >
                    {op.type === "income" ? "+ " : "- "} {op.sum} грн.
                  </td>

                  <td className={styles.data}>
                    <button
                      className={styles.del}
                      type="button"
                      onClick={() => {
                        openModal();
                        setSelectedOp(op);
                      }}
                    >
                      <svg className={styles.icon} width="18" height="18">
                        <use href="#delete"></use>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOps.length === 0 && (
            <p className={styles.noresults}>У вас поки що немає операцій</p>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        type={"operation"}
        success={() => {
          if (selectedOp) {
            handleDelete(selectedOp);
            closeModal();
          }
        }}
      />
    </>
  );
};
