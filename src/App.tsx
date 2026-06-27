import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { useEffect, lazy, Suspense } from "react";

import { initAuthListener } from "./redux/users/usersOperations";
import { useSelector } from "react-redux";
import { selectIsAuth, selectAuthLoading } from "./redux/users/usersSelectors";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CalculationsPage = lazy(() => import("./pages/CalculationsPage"));
const AddPage = lazy(() => import("./pages/AddPage"));

function App() {
  const isAuth = useSelector(selectIsAuth);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    initAuthListener();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isAuth ? <Layout /> : <Navigate to="/register" replace />}
        >
          <Route index element={<HomePage />} />
          <Route path=":type" element={<HomePage />} />
          <Route path=":type/add" element={<AddPage />} />
          <Route path="calculations" element={<CalculationsPage />} />
          <Route path="calculations/:type" element={<CalculationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
