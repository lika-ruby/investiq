import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Balance } from "../sections/Balance/Balance";
import { CalcSum } from "../sections/CalcSum/CalcSum";
import { CalcCategories } from "../sections/CalcCategories/CalcCategories";
import { Chart } from "../sections/Chart/Chart";
import { Bg } from "../components/Bg/Bg";

export default function CalculationsPage() {
  const { type } = useParams();

  const calcType = type === "income" ? "income" : "expense";

  const [monthOffset, setMonthOffset] = useState(0);
  const [category, setCategory] = useState(
    `${calcType === "expense" ? "Все для дому" : "ЗП"}`
  );

  useEffect(() => {
    if (calcType === "expense") {
      setCategory("Все для дому");
    } else {
      setCategory("ЗП");
    }
  }, [calcType]);

  const currentDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthOffset);
    return date;
  }, [monthOffset]);

  return (
    <div style={{ position: "relative" }}>
      <Balance
        monthOffset={monthOffset}
        setMonthOffset={setMonthOffset}
        date={currentDate}
        page="calc"
      />

      <CalcSum date={currentDate} />

      <CalcCategories
        type={calcType}
        date={currentDate}
        setCategory={setCategory}
      />
      <Chart category={category} type={calcType} date={currentDate} />
      <Bg />
    </div>
  );
}
