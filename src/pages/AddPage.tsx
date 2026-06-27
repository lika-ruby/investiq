import { useParams } from "react-router-dom";
import { AddItem } from "../sections/AddItem/AddItem";
import { Bg } from "../components/Bg/Bg";

type AddPageProps = {
  type: "income" | "expense";
};

export default function AddPage() {
  const { type } = useParams<AddPageProps>();
  console.log(type);

  return (
    <div>
      <AddItem type={type ?? "expense"} />
      <Bg />
    </div>
  );
}
