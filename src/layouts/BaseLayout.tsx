// src/layouts/BaseLayout.tsx
import { Suspense } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { getUserInfo, clearUserInfo } from "../utils/userStorage";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: "⊞", end: true },
  { path: "/profile",   label: "Profile",   icon: "👤", end: false },
];

function PageLoader() {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center",
      justifyContent: "center", color: "#1a6fd4",
      gap: 10, fontSize: 14, fontWeight: 600,
    }}>
      <span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>⟳</span>
      Loading…
    </div>
  );
}

export default function BaseLayout() {
  const navigate = useNavigate();

  const user      = getUserInfo();
  const initials  = user ? user.name.split(" ").map((n: string) => n[0]).join("") : "?";
  const firstName = user?.name.split(" ")[0] ?? "";
  const fullName  = user?.name ?? "";

  const logout = () => {
    removeToken();
    clearUserInfo();
    navigate("/login");
  };

  return (
    // ① Root: fill viewport exactly, no overflow
    <div style={{
      width: "98vw",
      height: "97vh",
      overflow: "hidden",
      display: "flex",
      background: "#f0f4fb",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .nav-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          cursor: pointer; margin-bottom: 4px;
          font-size: 13.5px; font-weight: 500;
          color: #555; text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nav-link:hover  { background: rgba(26,111,212,0.08); color: #1a6fd4; }
        .nav-link.active { background: #e8f0fb; color: #1a6fd4; font-weight: 700; }
        .logout-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; }

        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d9f0; border-radius: 99px; }
      `}</style>

      {/* ── Sidebar ── fixed height, no scroll needed */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        height: "100vh",          // ← pin to viewport
        background: "#fff",
        borderRight: "1px solid #e8edf5",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        overflow: "hidden",       // ← sidebar never scrolls
      }}>
        {/* Brand */}
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #f0f4fb" }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#1252a3", letterSpacing: "-0.5px" }}>
            MR<span style={{ color: "#1a6fd4" }}>.</span>NAIK<span style={{ color: "#1a6fd4" }}>.</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "16px 16px 0", borderTop: "1px solid #f0f4fb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #1a6fd4, #1252a3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
            }}>{initials}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{firstName}</div>
              <div style={{ fontSize: 11, color: "#999" }}>Job Seeker</div>
            </div>
          </div>
          <button 
            className="logout-btn"
            onClick={logout}
            style={{
              width: "100%", padding: "9px",
              border: "1.5px solid #e8edf5", borderRadius: 8,
              background: "#fff", cursor: "pointer",
              fontSize: 12.5, fontWeight: 600, color: "#888",
              transition: "all 0.2s",
            }}
          >🚪 Logout</button>
        </div>
      </aside>

      {/* ── Right column: header + scrollable main ── */}
      <div style={{
        flex: 1,
        height: "100vh",          // ← pin to viewport
        overflow: "hidden",       // ← clip, let only <main> scroll
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Top Header — fixed height, never shrinks */}
        <header style={{
          flexShrink: 0,           // ← must not shrink
          height: 60,
          background: "#fff",
          borderBottom: "1px solid #e8edf5",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
            Hi, Welcome Back, {fullName}! 👋
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              background: "#f0f4fb", borderRadius: 8, padding: "7px 14px",
              fontSize: 12.5, color: "#555",
              display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
            }}>
              🔔
              <span style={{
                background: "#1a6fd4", color: "#fff", borderRadius: "50%",
                width: 16, height: 16, fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>4</span>
            </div>

            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #1a6fd4, #1252a3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>{initials}</div>
          </div>
        </header>

        {/* ── Main content — ONLY this scrolls ── */}
        <main style={{
          flex: 1,                 // ← takes remaining height after header
          overflowY: "auto",       // ← scroll lives here only
          overflowX: "hidden",
          padding: "24px 32px",
        }}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>

      </div>
    </div>
  );
}