import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { useEffect, lazy, Suspense } from "react";
import { initAuthListener } from "./redux/users/usersOperations";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CalculationsPage = lazy(() => import("./pages/CalculationsPage"));
const AddPage = lazy(() => import("./pages/AddPage"));

function App() {
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path=":type" element={<HomePage />} />

          <Route path=":type/add" element={<AddPage />} />

          <Route path="calculations" element={<CalculationsPage />} />
          <Route path="calculations/:type" element={<CalculationsPage />} />

          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
