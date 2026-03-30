// src/components/AppInitializer.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { setUserInfo } from "../utils/userStorage";
import type { Props } from "../types/user";

// interface Props {
//   children: React.ReactNode;
// }

export default function AppInitializer({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();

    console.log("[AppInitializer] token:", token); // ← debug: confirm it's running

    if (!token) {
      setReady(true);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("[AppInitializer] user fetched:", res.data.user);
        const { id, name, email } = res.data.user;
        setUserInfo({ id, name, email });
      })
      .catch((err) => {
        console.warn("[AppInitializer] profile fetch failed:", err.message);
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  // Block the entire app until user info is resolved
  if (!ready) {
    return (
      <div style={{
        width: "100vw", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f0f4fb", fontFamily: "'Segoe UI', sans-serif",
        color: "#1a6fd4", fontWeight: 600, fontSize: 14, gap: 10,
      }}>
        <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>⟳</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        Initializing…
      </div>
    );
  }

  return <>{children}</>;
}