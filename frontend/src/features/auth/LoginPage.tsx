import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../api/http";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await http.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/movies");
    } catch {
      alert("Błędne dane logowania");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">
        <input className="border w-full p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="border w-full p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-black text-white w-full p-2" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}