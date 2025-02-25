import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import { TodoCard } from "./components/TodoCard";

function App() {
  const [todos, setTodos] = useState([
    { input: "Hello! Add your first todo!", complete: true },
  ]);
  const [selectedTab, setSelectedTab] = useState("All");

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }
  function handleUndoTodo(index) {
    let newTodoList = [...todos];
    let undoneTodo = {
      ...todos.find((todo, i) => todo.complete && i === index),
      complete: false,
    };

    let completedIndex = todos.findIndex(
      (todo) => todo.complete && todo.input === undoneTodo.input
    );
    newTodoList[completedIndex] = undoneTodo;

    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(index) {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo["complete"] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }
  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index;
    });
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }
  function handleSaveData(currTodos) {
    localStorage.setItem("todo-app", JSON.stringify({ todos: currTodos }));
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem("todo-app")) {
      return;
    }
    // console.log('here')
    let db = JSON.parse(localStorage.getItem("todo-app"));
    setTodos(db.todos);
  }, []);
  return (
    <>
      <TodoCard
        handleUndoTodo={handleUndoTodo}
        handleAddTodo={handleAddTodo}
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;
