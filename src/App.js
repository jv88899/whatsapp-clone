import React from "react";
import useWindowSize from "./hooks/useWindowSize";
import Login from "./components/Login";
import useAuthUser from "./hooks/useAuthUser";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  const page = useWindowSize();
  const user = useAuthUser();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app" style={{ ...page }}>
      <div className="app__body">
        <Sidebar user={user} page={page} />
      </div>
    </div>
  );
}
