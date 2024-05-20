import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, title: "姉に誕生日プレゼントを買う" },
    { id: 2, title: "論文提出" },
    { id: 3, title: "市役所に住民票の写しをもらいに行く" },
    { id: 4, title: "12345" },
    { id: 5, title: "678910" },
    { id: 6, title: "11,12,13,14,15" },
    { id: 7, title: "16" },
    { id: 8, title: "17" },
    { id: 9, title: "18" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
    { id: 10, title: "19" },
  ]);

  // const [todoTitle, setTodoTitle] = useState("");
  // const [todoId, setTodoId] = useState(todos.length + 1);

  // const handleAddFormChanges = (e) => {
  //   setTodoTitle(e.target.value);
  // };

  // const handleAddTodo = () => {
  //   //
  //   setTodos([...todos, { id: todoId, title: todoTitle }]);
  //   //
  //   setTodoId(todoId + 1);
  //   //
  //   setTodoTitle("");
  // };

  return (
    <main>
      <div>
        <create />
      </div>
      <ul>
        {todos.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </main >
  );
}