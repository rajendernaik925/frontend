import { useState, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { title: "Total Users",  value: 1245,  display: "1,245",   change: "+12%", up: true,  icon: "👥", suffix: "" },
  { title: "Orders",       value: 328,   display: "328",     change: "+5%",  up: true,  icon: "📦", suffix: "" },
  { title: "Revenue",      value: 54120, display: "₹54,120", change: "+18%", up: true,  icon: "💰", suffix: "" },
  { title: "Pending",      value: 14,    display: "14",      change: "-3%",  up: false, icon: "⏳", suffix: "" },
];

const orders = [
  { id: "#4201", user: "Rajender Naik",  item: "Laptop",     amount: "₹45,000", status: "Delivered", avatar: "RN" },
  { id: "#4202", user: "Sonia Agarwal",  item: "Phone",      amount: "₹12,500", status: "Pending",   avatar: "SA" },
  { id: "#4203", user: "Amit Sharma",    item: "Headphones", amount: "₹3,620",  status: "Cancelled", avatar: "AS" },
  { id: "#4204", user: "Priya Singh",    item: "Keyboard",   amount: "₹1,200",  status: "Delivered", avatar: "PS" },
  { id: "#4205", user: "Karan Mehta",    item: "Monitor",    amount: "₹18,000", status: "Pending",   avatar: "KM" },
];

const chartData = [
  { month: "Jul", val: 38 }, { month: "Aug", val: 52 }, { month: "Sep", val: 41 },
  { month: "Oct", val: 67 }, { month: "Nov", val: 58 }, { month: "Dec", val: 75 },
];

const topProducts = [
  { name: "Laptop Pro X",   pct: 87, sales: 142 },
  { name: "Wireless Phone", pct: 60, sales: 98  },
  { name: "BT Headphones",  pct: 45, sales: 74  },
  { name: "Mech Keyboard",  pct: 31, sales: 51  },
];

const activityFeed = [
  { msg: "New order #4205 placed",        time: "Just now",   dot: "#22c55e" },
  { msg: "Payment received ₹12,500",      time: "2 min ago",  dot: "#1a6fd4" },
  { msg: "Order #4198 shipped",           time: "9 min ago",  dot: "#f59e0b" },
  { msg: "User Priya Singh registered",   time: "18 min ago", dot: "#8b5cf6" },
  { msg: "Order #4192 cancelled",         time: "34 min ago", dot: "#ef4444" },
];

const statusStyle: Record<string, { bg: string; color: string; dot: string }> = {
  Delivered: { bg: "rgba(34,197,94,0.12)",  color: "#22c55e", dot: "#22c55e" },
  Pending:   { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", dot: "#f59e0b" },
  Cancelled: { bg: "rgba(239,68,68,0.12)",  color: "#ef4444", dot: "#ef4444" },
};

// Avatar color pairs
const avatarColors: Record<string, [string, string]> = {
  RN: ["#dbeafe", "#1d4ed8"], SA: ["#fef3c7", "#d97706"],
  AS: ["#fee2e2", "#dc2626"], PS: ["#dcfce7", "#16a34a"], KM: ["#ede9fe", "#7c3aed"],
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [now, setNow]         = useState(new Date());
  const [hovBar, setHovBar]   = useState<number | null>(null);
  const [ticker, setTicker]   = useState(0);   // pulses the live dot

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Pulse ticker
  useEffect(() => {
    const id = setInterval(() => setTicker(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const maxVal = Math.max(...chartData.map(d => d.val));

  // Subtle sparkline SVG path helper
  const sparkPath = (data: number[], w: number, h: number) => {
    const max = Math.max(...data); const min = Math.min(...data);
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * w,
      h - ((v - min) / (max - min || 1)) * h * 0.8 - h * 0.1,
    ]);
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  };
  const sparkVals = chartData.map(d => d.val);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", padding: "0 0 32px", boxSizing: "border-box", minWidth: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes barGrow {
          from { height: 0 !important; }
          to   { }
        }

        .fade-in { animation: fadeSlide 0.45s ease both; }
        .live-dot { animation: pulse 2s ease-in-out infinite; }

        .stat-tile {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }
        .stat-tile:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 16px 40px rgba(13,58,120,0.22) !important;
        }

        .order-row { transition: background 0.15s; cursor: pointer; }
        .order-row:hover { background: rgba(26,111,212,0.04) !important; }

        .act-item { transition: background 0.15s; border-radius: 10px; padding: 8px 10px; }
        .act-item:hover { background: rgba(255,255,255,0.06); }

        .pill-btn {
          border: none; border-radius: 8px; padding: 5px 13px;
          font-size: 12px; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .pill-btn:hover { filter: brightness(1.1); }

        .bar-col { cursor: pointer; }
        .bar-col:hover .bar-fill { filter: brightness(1.2); }
      `}</style>

      {/* ── TOP HEADER BANNER ─────────────────────────────────────── */}
      <div className="fade-in" style={{
        background: "linear-gradient(145deg, rgb(26,111,212) 0%, rgb(18,82,163) 60%, rgb(13,58,120) 100%)",
        borderRadius: "20px",
        padding: "24px 28px",
        marginBottom: "22px",
        position: "relative",
        overflow: "hidden",
        animationDelay: "0s",
      }}>
        {/* Decorative circles */}
        {[
          { w: 220, h: 220, t: -80, r: -60, op: 0.07 },
          { w: 140, h: 140, t: 20,  r: 80,  op: 0.05 },
          { w: 100, h: 100, b: -30, l: 160, op: 0.06 },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            width: c.w, height: c.h, borderRadius: "50%",
            background: `rgba(255,255,255,${c.op})`,
            top: c.t, right: c.r, bottom: c.b, left: c.l,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Live Dashboard
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>
              Overview
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
              {dateStr}
            </p>
          </div>

          {/* Live clock */}
          <div style={{
            background: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(8px)",
            borderRadius: "16px",
            padding: "14px 24px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "0.05em", fontVariantNumeric: "tabular-nums" }}>
              {timeStr}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px", letterSpacing: "0.05em" }}>
              IST · LIVE
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
            }}>📊 Export</button>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              border: "none",
              background: "#fff",
              color: "rgb(18,82,163)", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            }}>+ New Order</button>
          </div>
        </div>
      </div>

      {/* ── STAT TILES ────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "20px" }}>
        {stats.map((s, i) => (
          <div key={s.title} className="fade-in stat-tile" style={{
            borderRadius: "18px",
            background: "#fff",
            border: "1.5px solid #e8edf5",
            padding: "20px 22px",
            boxShadow: "0 4px 16px rgba(13,58,120,0.07)",
            animationDelay: `${0.08 + i * 0.07}s`,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Gradient accent bar top */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "3px",
              background: "linear-gradient(90deg, rgb(26,111,212), rgb(13,58,120))",
              borderRadius: "18px 18px 0 0",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "12px",
                background: "linear-gradient(135deg, rgb(26,111,212), rgb(13,58,120))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>{s.icon}</div>
              <span style={{
                fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "20px",
                background: s.up ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                color: s.up ? "#16a34a" : "#dc2626",
              }}>{s.change}</span>
            </div>

            <div style={{ fontSize: "27px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px", lineHeight: 1 }}>
              {s.display}
            </div>
            <div style={{ marginTop: "5px", fontSize: "12.5px", color: "#94a3b8", fontWeight: 500 }}>
              {s.title}
            </div>

            {/* Sparkline */}
            <svg width="100%" height="28" style={{ marginTop: "10px", display: "block" }} viewBox="0 0 120 28" preserveAspectRatio="none">
              <path d={sparkPath(sparkVals, 120, 28)} fill="none"
                stroke="url(#sp)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="sp" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgb(26,111,212)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(13,58,120)" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* ── MIDDLE ROW: Chart + Activity ──────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px", marginBottom: "20px" }}>

        {/* Bar Chart */}
        <div className="fade-in" style={{
          background: "#fff", borderRadius: "18px",
          border: "1.5px solid #e8edf5",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(13,58,120,0.07)",
          animationDelay: "0.36s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>Revenue Trend</div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Monthly performance</div>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {["1M","3M","6M"].map((t, i) => (
                <button key={t} className="pill-btn" style={{
                  background: i === 2 ? "linear-gradient(135deg,rgb(26,111,212),rgb(13,58,120))" : "#f1f5f9",
                  color: i === 2 ? "#fff" : "#64748b",
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Y-axis labels + bars */}
          <div style={{ display: "flex", gap: "0" }}>
            {/* Y labels */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: "24px", paddingRight: "10px", height: "170px" }}>
              {["100k","75k","50k","25k","0"].map(l => (
                <span key={l} style={{ fontSize: "9px", color: "#cbd5e1", fontWeight: 600 }}>{l}</span>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              {/* Grid lines */}
              <div style={{ position: "relative", height: "146px", marginBottom: "8px" }}>
                {[0,25,50,75,100].map(p => (
                  <div key={p} style={{
                    position: "absolute", left: 0, right: 0,
                    bottom: `${p}%`, height: "1px",
                    background: p === 0 ? "#e2e8f0" : "rgba(226,232,240,0.5)",
                  }} />
                ))}

                {/* Bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "100%", position: "relative", zIndex: 1 }}>
                  {chartData.map((d, i) => {
                    const hov = hovBar === i;
                    return (
                      <div key={d.month} className="bar-col" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}
                        onMouseEnter={() => setHovBar(i)} onMouseLeave={() => setHovBar(null)}>
                        {/* Tooltip */}
                        <div style={{
                          fontSize: "10px", fontWeight: 700,
                          color: "rgb(18,82,163)",
                          background: hov ? "#eff6ff" : "transparent",
                          borderRadius: "6px", padding: hov ? "2px 6px" : "0",
                          marginBottom: "4px",
                          transition: "all 0.15s",
                          opacity: hov ? 1 : 0,
                          whiteSpace: "nowrap",
                        }}>₹{d.val}k</div>

                        <div className="bar-fill" style={{
                          width: "100%",
                          height: `${(d.val / maxVal) * 100}%`,
                          borderRadius: "8px 8px 3px 3px",
                          background: hov
                            ? "linear-gradient(180deg, rgb(26,111,212), rgb(13,58,120))"
                            : i === chartData.length - 1
                              ? "linear-gradient(180deg, rgba(26,111,212,0.6), rgba(13,58,120,0.6))"
                              : "linear-gradient(180deg, #dbeafe, #bfdbfe)",
                          transition: "background 0.2s, height 0.5s ease",
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X labels */}
              <div style={{ display: "flex", gap: "10px" }}>
                {chartData.map(d => (
                  <div key={d.month} style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>{d.month}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="fade-in" style={{
          background: "linear-gradient(145deg, rgb(26,111,212) 0%, rgb(18,82,163) 60%, rgb(13,58,120) 100%)",
          borderRadius: "18px",
          padding: "22px",
          boxShadow: "0 4px 16px rgba(13,58,120,0.2)",
          animationDelay: "0.44s",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div className="live-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>Live Activity</div>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginBottom: "18px" }}>
            Real-time events
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
            {activityFeed.map((a, i) => (
              <div key={i} className="act-item" style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: a.dot, marginTop: "4px", flexShrink: 0,
                  boxShadow: `0 0 6px ${a.dot}`,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.88)", fontWeight: 500, lineHeight: 1.4 }}>
                    {a.msg}
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary strip */}
          <div style={{
            marginTop: "16px", paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px",
          }}>
            {[{ l: "Today", v: "₹8.2k" }, { l: "Orders", v: "23" }, { l: "Users", v: "+7" }].map(x => (
              <div key={x.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>{x.v}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "1px" }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Orders table + Top Products ────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px" }}>

        {/* Orders Table */}
        <div className="fade-in" style={{
          background: "#fff", borderRadius: "18px",
          border: "1.5px solid #e8edf5",
          boxShadow: "0 4px 16px rgba(13,58,120,0.07)",
          overflow: "hidden",
          animationDelay: "0.52s",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 22px 14px",
            background: "linear-gradient(90deg, rgba(26,111,212,0.04), transparent)",
            borderBottom: "1.5px solid #f1f5f9",
          }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Recent Orders</div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "1px" }}>5 of 328 orders</div>
            </div>
            <button style={{
              padding: "6px 14px", borderRadius: "8px",
              border: "1.5px solid #e2e8f0", background: "#fff",
              fontSize: "12px", fontWeight: 600, color: "#475569", cursor: "pointer",
            }}>View all →</button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Order", "Customer", "Item", "Amount", "Status"].map(h => (
                  <th key={h} style={{
                    padding: "10px 18px", textAlign: "left",
                    fontSize: "10px", fontWeight: 700, color: "#94a3b8",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => {
                const s = statusStyle[o.status];
                const [abg, acol] = avatarColors[o.avatar] || ["#e2e8f0", "#475569"];
                return (
                  <tr key={o.id} className="order-row"
                    style={{ borderTop: "1px solid #f1f5f9", animationDelay: `${0.52 + idx * 0.04}s` }}>
                    <td style={{ padding: "13px 18px", fontSize: "12px", fontWeight: 700, color: "rgb(26,111,212)" }}>{o.id}</td>
                    <td style={{ padding: "13px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: abg, color: acol,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", fontWeight: 800, flexShrink: 0,
                        }}>{o.avatar}</div>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{o.user}</span>
                      </div>
                    </td>
                    <td style={{ padding: "13px 18px", fontSize: "13px", color: "#64748b" }}>{o.item}</td>
                    <td style={{ padding: "13px 18px", fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{o.amount}</td>
                    <td style={{ padding: "13px 18px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        padding: "4px 10px", borderRadius: "20px",
                        background: s.bg, color: s.color,
                        fontSize: "11px", fontWeight: 700,
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div className="fade-in" style={{
          background: "#fff", borderRadius: "18px",
          border: "1.5px solid #e8edf5",
          padding: "22px",
          boxShadow: "0 4px 16px rgba(13,58,120,0.07)",
          animationDelay: "0.58s",
        }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginBottom: "3px" }}>Top Products</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "20px" }}>By sales this month</div>

          {topProducts.map((p, i) => (
            <div key={p.name} style={{ marginBottom: i < topProducts.length - 1 ? "18px" : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12.5px", color: "#334155", fontWeight: 600 }}>{p.name}</span>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>{p.sales}</span>
              </div>
              {/* Track */}
              <div style={{ height: "7px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${p.pct}%`,
                  borderRadius: "99px",
                  background: `linear-gradient(90deg, rgb(26,111,212) 0%, rgb(13,58,120) 100%)`,
                  transition: "width 0.8s ease",
                }} />
              </div>
              <div style={{ textAlign: "right", marginTop: "3px", fontSize: "10px", color: "#cbd5e1", fontWeight: 600 }}>
                {p.pct}%
              </div>
            </div>
          ))}

          {/* Divider metrics */}
          <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1.5px solid #f1f5f9" }}>
            {[
              { label: "Total SKUs",   val: "24",   icon: "📦" },
              { label: "Avg Rating",   val: "4.7★", icon: "⭐" },
              { label: "Return Rate",  val: "2.1%", icon: "↩️" },
            ].map(m => (
              <div key={m.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "7px 0",
                borderBottom: "1px solid #f8fafc",
              }}>
                <span style={{ fontSize: "12px", color: "#64748b", display: "flex", gap: "7px", alignItems: "center" }}>
                  <span>{m.icon}</span>{m.label}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}