import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      setToken(res.data.token);
      // alert("Login Successful ✅");
      navigate("/dashboard");
      // refresh();
      window.location.reload();
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      width: "98vw",
      height: "97vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#e8edf5",
      fontFamily: "'Segoe UI', sans-serif",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        width: "780px",
        height: "460px",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        overflow: "hidden",
      }}>

        {/* Left Panel */}
        <div style={{
          flex: "1",
          background: "linear-gradient(145deg, #1a6fd4 0%, #1252a3 60%, #0d3a78 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "40px 30px",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{
            position: "absolute", bottom: "-40px", left: "-30px",
            width: "180px", height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }} />
          <div style={{
            position: "absolute", bottom: "30px", left: "40px",
            width: "120px", height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
          }} />
          <div style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "140px", height: "140px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <h1 style={{
              color: "#fff",
              fontSize: "28px",
              fontWeight: "800",
              letterSpacing: "2px",
              margin: "0 0 8px 0",
              textTransform: "uppercase",
            }}>WELCOME</h1>
            <p style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              margin: "0 0 24px 0",
            }}>YOUR HEADLINE NAME</p>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              lineHeight: "1.7",
              maxWidth: "200px",
              margin: "0 auto",
            }}>
              Sign in to access your personalized dashboard and tools.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{
          flex: "1",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 44px",
        }}>
          <h2 style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#1a1a2e",
            margin: "0 0 28px 0",
            alignSelf: "flex-start",
          }}>Sign in</h2>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* Email Field */}
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <span style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "#aaa", fontSize: "15px",
              }}>👤</span>
              <input
                type="email"
                name="email"
                placeholder="Username"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "11px 12px 11px 36px",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#333",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target.style.borderColor = "#1a6fd4")}
                onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
              />
            </div>

            {/* Password Field */}
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <span style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "#aaa", fontSize: "15px",
              }}>🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "11px 12px 11px 36px",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#333",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target.style.borderColor = "#1a6fd4")}
                onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
              />
              <span style={{
                position: "absolute", right: "12px", top: "50%",
                transform: "translateY(-50%)", color: "#aaa", fontSize: "12px",
                cursor: "pointer",
              }}>Show</span>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <a href="#" style={{ fontSize: "12px", color: "#1a6fd4", textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #1a6fd4, #1252a3)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                marginBottom: "12px",
                letterSpacing: "0.5px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Sign In
            </button>

            {/* Divider */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px",
            }}>
              <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
              <span style={{ fontSize: "12px", color: "#bbb" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
            </div>

            {/* OAuth Button */}
            <button
              type="button"
              style={{
                width: "100%",
                padding: "11px",
                background: "#fff",
                color: "#444",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontWeight: "500",
              }}
            >
              <span>🔗</span> Sign in with oauth
            </button>
          </form>

          {/* Register Link */}
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1a6fd4", fontWeight: "600", textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


