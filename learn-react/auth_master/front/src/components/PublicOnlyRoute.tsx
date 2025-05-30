import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

export default function PublicOnlyRoute() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
    setIsShow(true);
  }, [isLoggedIn, navigate]);
  return <>{show && <Outlet />}</>;
}
