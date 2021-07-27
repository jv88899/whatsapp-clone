import React from "react";
import useWindowSize from "./hooks/useWindowSize";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import "./App.css";

export default function App() {
  const page = useWindowSize();
  const [user] = useAuthState(auth);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app" style={{ ...page }}>
      App
    </div>
  );
}
