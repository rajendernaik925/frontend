import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const strength = (() => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#1a6fd4"][strength];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 12px 11px 36px",
    border: "1.5px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    background: "#fafafa",
    fontFamily: "'Segoe UI', sans-serif",
    transition: "border-color 0.2s",
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
        width: "820px",
        height: "520px",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        overflow: "hidden",
      }}>

        {/* Left Panel */}
        <div style={{
          width: "260px",
          flexShrink: 0,
          background: "linear-gradient(145deg, #1a6fd4 0%, #1252a3 60%, #0d3a78 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "40px 28px",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{
            position: "absolute", bottom: "-40px", left: "-30px",
            width: "180px", height: "180px", borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }} />
          <div style={{
            position: "absolute", bottom: "30px", left: "40px",
            width: "120px", height: "120px", borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
          }} />
          <div style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "140px", height: "140px", borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <h1 style={{
              color: "#fff", fontSize: "26px", fontWeight: "800",
              letterSpacing: "2px", margin: "0 0 8px 0", textTransform: "uppercase",
            }}>JOIN US</h1>
            <p style={{
              color: "rgba(255,255,255,0.7)", fontSize: "11px",
              letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 24px 0",
            }}>YOUR HEADLINE NAME</p>
            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: "12.5px",
              lineHeight: "1.7", maxWidth: "180px", margin: "0 auto",
            }}>
              Create your account and start your journey with us today.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{
          flex: 1,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 44px",
          overflowY: "auto",
        }}>
          <div style={{ width: "100%", maxWidth: "360px" }}>
            <h2 style={{
              fontSize: "20px", fontWeight: "700", color: "#1a1a2e",
              margin: "0 0 4px 0",
            }}>Create account</h2>
            <p style={{ fontSize: "12.5px", color: "#999", margin: "0 0 22px 0" }}>
              Fill in your details to get started
            </p>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div style={{ marginBottom: "13px" }}>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#aaa", fontSize: "15px",
                  }}>👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#1a6fd4")}
                    onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "13px" }}>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#aaa", fontSize: "15px",
                  }}>✉️</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#1a6fd4")}
                    onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: "6px" }}>
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#aaa", fontSize: "15px",
                  }}>🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password (min. 8 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, paddingRight: "52px" }}
                    onFocus={e => (e.target.style.borderColor = "#1a6fd4")}
                    onBlur={e => (e.target.style.borderColor = "#e0e0e0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute", right: "12px", top: "50%",
                      transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#aaa", fontSize: "12px", padding: "2px 4px",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Strength bars */}
                {formData.password && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "7px" }}>
                    <div style={{ display: "flex", gap: "4px", flex: 1 }}>
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} style={{
                          flex: 1, height: "3px", borderRadius: "99px",
                          background: n <= strength ? strengthColor : "#e8e8e8",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    <span style={{
                      fontSize: "11px", fontWeight: "600",
                      color: strengthColor, minWidth: "34px", textAlign: "right",
                    }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "9px",
                margin: "16px 0 18px",
              }}>
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{
                    width: "15px", height: "15px", marginTop: "1px",
                    accentColor: "#1a6fd4", cursor: "pointer", flexShrink: 0,
                  }}
                />
                <label htmlFor="agree" style={{
                  fontSize: "12px", color: "#999", lineHeight: "1.5", cursor: "pointer",
                }}>
                  I agree to the{" "}
                  <a href="#" style={{ color: "#1a6fd4", textDecoration: "none" }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" style={{ color: "#1a6fd4", textDecoration: "none" }}>Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !agreed}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: loading || !agreed
                    ? "#93b8e8"
                    : "linear-gradient(135deg, #1a6fd4, #1252a3)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading || !agreed ? "not-allowed" : "pointer",
                  marginBottom: "12px",
                  letterSpacing: "0.5px",
                  transition: "opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      display: "inline-block", width: "15px", height: "15px",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "#fff", borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Creating...
                  </>
                ) : "Create Account"}
              </button>

              {/* Divider */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px",
              }}>
                <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
                <span style={{ fontSize: "12px", color: "#bbb" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
              </div>

              {/* OAuth */}
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
                <span>🔗</span> Sign up with oauth
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "#999" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1a6fd4", fontWeight: "600", textDecoration: "none" }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Register;