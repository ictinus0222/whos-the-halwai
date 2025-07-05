import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Spy Among Us</h1>
      <button onClick={() => navigate("/create")}>Create Room</button>
      <button onClick={() => navigate("/join")}>Join Room</button>
    </div>
  );
}