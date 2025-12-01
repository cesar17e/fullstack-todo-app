import { useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import TodoList from "../components/TodoList";

function Dashboard({ token, logout }) {
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div>

      {/* Logout Button */}
      <button 
        onClick={logout}
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        Logout
      </button>

      <Header todos={todos} />

      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        todos={todos}
      />

      <TodoList
        todos={todos}
        selectedTab={selectedTab}
        setTodos={setTodos}
        token={token}
      />

    </div>
  );
}

export default Dashboard;
