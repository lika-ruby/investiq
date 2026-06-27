import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";

import { selectOperations } from "../../redux/users/usersSelectors";
import { HomeContainer } from "../../components/HomeContainer/HomeContainer";
import styles from "./Chart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

type ChartProps = {
  category: string;
  type: "expense" | "income";
  date: Date | null;
};

export const Chart = ({ category, type, date }: ChartProps) => {
  const ops = useSelector(selectOperations);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { labels, values } = useMemo(() => {
    if (!ops?.length || !date) return { labels: [], values: [] };
    const products: Record<string, number> = {};
    ops
      .filter((op) => {
        const opDate = new Date(op.date);
        return (
          opDate.getMonth() === date.getMonth() &&
          opDate.getFullYear() === date.getFullYear() &&
          op.type === type &&
          (category === "" || op.category === category)
        );
      })
      .forEach((op) => {
        const product = op.desc?.trim() || "Без назви";
        products[product] = (products[product] ?? 0) + Number(op.sum || 0);
      });
    const sortedProducts = Object.entries(products).sort((a, b) => b[1] - a[1]);
    return {
      labels: sortedProducts.map(([name]) => name),
      values: sortedProducts.map(([, sum]) => sum),
    };
  }, [ops, category, type, date]);

  const maxValue = useMemo(
    () => (values.length > 0 ? Math.max(...values) : 0),
    [values]
  );

  const backgroundColors = useMemo(() => {
    return values.map((_, index) => (index % 3 === 0 ? "#FF751D" : "#FFDEC7"));
  }, [values]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderRadius: isMobile
          ? { topRight: 10, bottomRight: 10, topLeft: 0, bottomLeft: 0 }
          : { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 },
        borderSkipped: false,
        barPercentage: isMobile ? 0.35 : 0.6, // Тонші стовпчики, щоб звільнити місце для тексту над ними
        maxBarThickness: isMobile ? undefined : 38,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: isMobile ? "y" : "x",

    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        // На десктопі показуємо завжди. На мобілці показуємо ТІЛЬКИ якщо значення більше 0
        display: (context) => {
          return isMobile
            ? (context.dataset.data[context.dataIndex] as number) > 0
            : true;
        },
        // КЛЮЧОВЕ НАЛАШТУВАННЯ ДЛЯ МОБІЛКИ:
        // Притискаємо суму до правого кінця стовпчика (align: "right", anchor: "end")
        align: isMobile ? "right" : "top",
        anchor: "end",
        // На десктопі зміщуємо вгору над стовпчиком.
        // На мобілці offset: 0, але за допомогою підняття осі Y назва і ціна стануть на один рівень.
        offset: isMobile ? 0 : 8,
        formatter: (value) => {
          return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
        },
        font: {
          family: "Roboto, sans-serif",
          size: 12,
        },
        color: "#52555F",
        // Додатковий зсув для мобілки, щоб вирівняти суму по висоті з назвою
        ...(isMobile && {
          padding: { bottom: 24 }, // Піднімає суму вгору рівно на рівень дзеркального тексту осі Y
        }),
      },
    },

    scales: {
      y: {
        display: true,
        grid: {
          display: !isMobile, // Горизонтальна сітка тільки для десктопа/планшета
          color: "#F5F6FB",
        },
        border: { display: false },
        ticks: {
          display: isMobile, // Вмикаємо назви товарів на мобілці через вісь Y
          color: "#52555F",
          font: { size: 12 },
          mirror: true, // Закидає текст назви всередину графіка (він починається від 0 лінії)
          labelOffset: -14, // Піднімає назву вгору над стовпчиком
          crossAlign: "start",
        },
      },
      x: {
        display: true,
        grid: { display: false },
        border: { display: false },
        max: isMobile && maxValue > 0 ? maxValue : undefined,
        ticks: {
          display: !isMobile,
          color: "#52555F",
          font: { size: 12 },
        },
      },
    },

    layout: {
      padding: isMobile
        ? // Важливо дати padding.right, щоб сума в кінці стовпчика мала простір і не ховалася за край картки
          { right: 85, top: 25, bottom: 15, left: 10 }
        : { top: 35, left: 10, right: 10, bottom: 10 },
    },
  };

  if (!labels.length) {
    return null;
  }

  return (
    <section className={styles.chartSect}>
      <HomeContainer>
        <div className={styles.chartWrap}>
          <div
            className={styles.chart}
            style={{ height: isMobile ? `${labels.length * 65}px` : "400px" }}
          >
            <Bar data={data} options={options} />
          </div>
        </div>
      </HomeContainer>
    </section>
  );
};
