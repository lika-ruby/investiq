import { Auth } from "../components/Auth/Auth.tsx";
import { Bg } from "../components/Bg/Bg.tsx";

export default function LoginPage() {
  return (
    <div style={{ position: "relative" }}>
      <Auth type={"login"} />
      <Bg />
    </div>
  );
}
