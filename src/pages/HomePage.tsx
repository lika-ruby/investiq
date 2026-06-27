import { useParams } from "react-router-dom";
import { Balance } from "../sections/Balance/Balance";
import { MainView } from "../sections/MainView/MainView";
import { Bg } from "../components/Bg/Bg";

export default function HomePage() {
  const { type } = useParams();

  const currentType = type === "income" ? "income" : "expense";

  return (
    <div style={{ position: "relative" }}>
      <Balance page="home" />
      <MainView type={currentType} />

      <Bg />
    </div>
  );
}
