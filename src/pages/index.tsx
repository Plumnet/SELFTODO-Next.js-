import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Create from "./components/Create";
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
  ]);

  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState('')
  const [newTitle, setNewTitle] = useState('')

  const handleAddFormChanges = (e: any) => {
    setTodoTitle(e.target.value);
  };

  const handleAddTodo = () => {
    //
    setTodos([...todos, { id: todoId, title: todoTitle }]);
    //
    setTodoId(todoId + 1);
    //
    setTodoTitle("");
    console.log('テスト')
  };

  const handleDeleteTodo = (targetTodo: any) => {
    console.log(targetTodo)
    setTodos(todos.filter((todo) => todo !== targetTodo))
  }



  return (
    <main>
      <div>
        <input type="text" value={todoTitle} onChange={handleAddFormChanges} />
        {/* 問題2. ボタンを押すと、新しいtodoがTodoリストに追加されるようにしよう*/}
        <button onClick={handleAddTodo}>作成</button>
        {/* ここまで */}
      </div>
      <div>
        <Create add={handleAddTodo} title={todoTitle} addform={handleAddFormChanges} />
      </div>
      <ul>
        {todos.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTodo(task)}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}