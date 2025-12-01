import { useEffect, useState } from "react";

function TodoList({ todos, selectedTab, setTodos, token }) {
  const [task, setTask] = useState("");

  // Fetch all todos
  async function fetchTodos() {
    try {
      const res = await fetch("/todos", {
        headers: { Authorization: token }, //metadata along with the request
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json(); //Fetch api already parsed the res object passed which is a list of tasks
      setTodos(data); //append object to stateful var
    } catch (err) {
      console.error(err.message);
    }
  }

  // Add a new todo
  async function addTodo() {
    if (!task) return;

    try {
      const res = await fetch("/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ task }),
      });
      if (!res.ok) throw new Error("Failed to add todo");

      setTask("");
      await fetchTodos(); //And then display after delete await

    } catch (err) {
      console.error(err.message);
    }
  }

  // Update a todo // or more so complete a task
  async function updateTodo(id) {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    try {
      const res = await fetch(`/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ task: target.task, completed: 1 }),
      });
      if (!res.ok) throw new Error("Failed to update todo");

      await fetchTodos(); //And then display after update
    } catch (err) {
      console.error(err.message);
    }
  }

  // Delete a todo
  async function deleteTodo(id) {
    try {
      const res = await fetch(`/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error("Failed to delete todo");

      await fetchTodos(); //And then display after delete
    } catch (err) {
      console.error(err.message);
    }
  }

  // Initial load
  useEffect(() => {
    if (!token) return;
    fetchTodos();
  }, [token]);


  
  // Filter todos based on tab
  const filtered = todos.filter((todo) =>
    selectedTab === "All"
      ? true
      : selectedTab === "Complete"
      ? todo.completed
      : !todo.completed
  );

  return (
    <main>
      {filtered.map((todo) => (
        <div key={todo.id} className="card todo-item">
          <p>{todo.task}</p>
          <div className="todo-buttons">
            <button
              onClick={() => updateTodo(todo.id)}
              disabled={todo.completed}
            >
              <h6>Done</h6>
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              <h6>Delete</h6>
            </button>
          </div>
        </div>
      ))}

      <div className="input-container">
        <input
          placeholder="Add task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>+</button>
      </div>
    </main>
  );
}

export default TodoList;
