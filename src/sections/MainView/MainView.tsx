import { AddItem } from "../AddItem/AddItem";
import { Table } from "../Table/Table";
import { Reduction } from "../Reduction/Reduction";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HomeContainer } from "../../components/HomeContainer/HomeContainer";
import { useEffect, useState } from "react";
import styles from "./MainView.module.scss";

export const MainView = ({ type }) => {
  const location = useLocation();

  const basePath = location.pathname.startsWith("/calculations")
    ? "/calculations"
    : "";

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setIsMobile(e.matches);

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className={styles.sect}>
      <HomeContainer>
        <div className={styles.wrap}>
          <div className={styles.links}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={`${basePath}/expense`}
            >
              Витрати
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              to={`${basePath}/income`}
            >
              Дохід
            </NavLink>
          </div>
          <div className={styles.main}>
            {isMobile && <AddItem type={type} />}
            <div className={styles.down}>
              <Table type={type} />
              <Reduction type={type} />
            </div>
          </div>
          <div className={styles.adds}>
            <Link className={styles.add} to={`/expense/add`}>
              витрати
            </Link>
            <Link className={styles.add} to={`/income/add`}>
              дохід
            </Link>
          </div>
        </div>
      </HomeContainer>
    </div>
  );
};
