import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import useAuthUser from "./hooks/useAuthUser";
import useWindowSize from "./hooks/useWindowSize";

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
        <Route path="/room/:roomId">
          <Chat user={user} page={page} />
        </Route>
      </div>
    </div>
  );
}
