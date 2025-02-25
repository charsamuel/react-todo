import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Confetti from "react-confetti";

export function TodoCard({
  todos,
  handleAddTodo,
  handleDeleteTodo,
  handleCompleteTodo,
  handleUndoTodo,
}) {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "open") return !todo.complete;
    if (filter === "complete") return todo.complete;
    return true;
  });

  const handleCompleteWithConfetti = (index) => {
    handleCompleteTodo(index);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen w-full">
      {showConfetti && <Confetti />}

      {/* Todo List */}
      <div className="flex flex-col items-start justify-start p-6 w-full overflow-y-auto bg-orange-200">
        <div className="flex items-center gap-4">
          <img
            src="./peep.svg"
            alt="Happy Cartoon Character"
            className="w-20 sm:w-24 md:w-32 bg-amber-700"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black underline text-orange-800">
            MY TODO APP
          </h1>
        </div>

        {/* Task Counters */}
        <div className="mt-6 space-y-1 text-sm sm:text-md">
          <h3 className="text-black font-bold">
            Open Tasks: {todos.filter((todo) => !todo.complete).length}
          </h3>
          <h3 className="text-black font-bold">
            Completed: {todos.filter((todo) => todo.complete).length}
          </h3>
          <h3 className="text-blue-600 font-bold">Total: {todos.length}</h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 my-4">
          {["all", "open", "complete"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-2 text-sm sm:text-md rounded-md font-medium transition ${
                filter === type
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="flex flex-col gap-4 w-full">
          {filteredTodos.map((todo, index) => (
            <div
              key={index}
              className={`p-4 border rounded-md shadow-md ${
                todo.complete
                  ? "bg-gray-800 text-white opacity-50"
                  : "bg-white text-black"
              }`}
            >
              <p className={todo.complete ? "line-through" : ""}>{todo.input}</p>
              <div className="flex justify-between mt-2">
                {!todo.complete ? (
                  <button
                    onClick={() => handleCompleteWithConfetti(index)}
                    className="text-white bg-black hover:bg-gray-700 font-medium rounded-lg text-xs sm:text-sm px-4 py-2"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => handleUndoTodo(index)}
                    className="text-white bg-yellow-500 hover:bg-yellow-700 font-medium rounded-lg text-xs sm:text-sm px-4 py-2"
                  >
                    Undo
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="text-white bg-orange-700 hover:bg-red-700 font-medium rounded-lg text-xs sm:text-sm px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field & Add Button */}
        <div className="w-full p-4 flex items-center justify-start sticky bottom-0 bg-orange-200">
          <div className="flex gap-2 w-full">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add task"
              className="flex-1 border border-gray-300 bg-black text-white text-sm rounded-lg p-2.5 focus:ring-teal-400 focus:border-teal-400 outline-none"
            />
            <button
              onClick={() => {
                if (!inputValue) return;
                handleAddTodo(inputValue);
                setInputValue("");
              }}
              className="p-3 rounded-full bg-cyan-500 text-white hover:bg-blue-600 transition shadow-sm"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/*  Image */}
      <div className="hidden lg:flex items-center justify-center h-screen">
        <img
          src="https://images.pexels.com/photos/5546874/pexels-photo-5546874.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Task background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
