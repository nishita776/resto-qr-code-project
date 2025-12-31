import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card static-card"
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "32px 36px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          Restaurant Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          style={{ width: "100%", marginTop: "8px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "14px",
            marginTop: "20px",
          }}
        >
          Staff access only
        </p>
      </div>
    </div>
  );
}
