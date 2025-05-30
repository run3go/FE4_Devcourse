import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { axiosInstance } from "./api/axios";

export default function App() {
  const login = useAuthStore((state) => state.login);
  const getToken = async () => {
    try {
      const {
        data: { accessToken },
      }: { data: { accessToken: string } } = await axiosInstance.post("/token");
      login(accessToken);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <>
        <Routes>
          {/* Public route - 누구나 접근 가능 */}
          <Route path="/" element={<Home />} />

          {/* Public routes - 인증되지 않은 사람만 접근 가능 */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes - 인증된 사람만 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* 404 Page */}
          <Route path="/404" element={<NotFound />} />

          {/* Redirect any unknown routes to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </>
    </>
  );
}
