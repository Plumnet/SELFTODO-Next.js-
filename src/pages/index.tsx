import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Create from "./components/Create";
import Delete from "./components/Delete";
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

  const handleOpenEditForm = (todo: any) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }

  const handleEditFormChange = (e: any) => {
    setNewTitle(e.target.value)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
  }

  const handleEditTodo = (todo: any) => {
    // 問題2. 編集内容をTodoリストの配列に加えよう
    //ここまで
    const newArray = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    )
    setTodos(newArray)
    setEditId('')
    // 問題3. Todoリストの更新後にstateを初期化しよう
    setNewTitle('')
    handleCloseEditForm('')
    // ここまで
  }


  return (
    <>
      {isEditable ? (
        <div>
          <input
            type="text"
            label="新しいタイトル"
            value={newTitle}
            onChange={handleEditFormChange}
          />
          {/* 問題1. 編集ボタンを押すと関数が実行されるようにしよう*/}
          <button onClick={handleEditTodo}>編集を保存</button>
          {/* ここまで */}
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            label="タイトル"
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <Create add={handleAddTodo} title={todoTitle} addform={handleAddFormChanges} />
        </div>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
            <Delete handleDelete={handleDeleteTodo} todo={todo} />
          </li>
        ))}
      </ul>
    </>
  )
}