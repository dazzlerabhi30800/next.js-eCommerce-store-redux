"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTodos, todo } from "@/store/store";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
const Todos = () => {
  const [todoString, setTodoString] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todoReducer);
  const { todos } = state;
  const handleTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoString.length < 5) return;
    dispatch(addTodos({ id: new Date().toString(), todo: todoString }));
    setTodoString("");
  };
  return (
    <div className={`${styles.flexCol} gap-10`}>
      {/* Header */}
      <form onSubmit={handleTodo} className={`flex gap-2`}>
        <input
          type="text"
          value={todoString}
          onChange={(e) => setTodoString(e.target.value)}
          placeholder="Enter your Todo"
          className="p-3 rounded-lg bg-transparent border border-cyan-200 focus:outline-none focus:border-pink-500 text-xl placeholder:text-gray-400"
        />
        <button className="bg-gradient-to-r from-blue-500 to-pink-400 py-3 px-10 rounded-lg text-xl">
          Add
        </button>
      </form>
      <div className={`${styles.flexCol} gap-4`}>
        {todos?.map((todo: todo) => (
          <div
            key={todo.id}
            className={`p-3 rounded-md border border-orange-500 bg-black text-white shadow-xl shadow-orange-600/10`}
          >
            {todo.todo}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
