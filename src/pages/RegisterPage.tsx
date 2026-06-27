import { Auth } from "../components/Auth/Auth.tsx";
import { Bg } from "../components/Bg/Bg.tsx";

export default function RegisterPage() {
  return (
    <div style={{ position: "relative" }}>
      <Auth type={"register"} />
      <Bg />
    </div>
  );
}
