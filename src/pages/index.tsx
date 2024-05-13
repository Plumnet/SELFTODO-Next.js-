import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [todos, setTodos] = useState([
  //   // { id: 1, title: '買い物に行く', status: 'done' },
  //   // { id: 2, title: '子どものお迎え', status: 'notStarted' },
  //   // { id: 3, title: '企画書の提出', status: 'inProgress' }
  // ])
  // const [todoTitle, setTodoTitle] = useState('')
  // const [todoId, setTodoId] = useState(todos.length + 1)
  // const [isEditable, setIsEditable] = useState(false)
  // const [editId, setEditId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  // const [filter, setFilter] = useState('notStarted')
  // const [filteredTodos, setFilteredTodos] = useState([])

  // const handleAddFormChanges = (e) => {
  //   setTodoTitle(e.target.value)
  // }

  // const resetFormInput = () => {
  //   setTodoTitle('')
  // }

  // const handleAddTodo = () => {
  //   setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }])
  //   setTodoId(todoId + 1)
  //   resetFormInput()
  // }

  // const handleDeleteTodo = (targetTodo) => {
  //   setTodos(todos.filter((todo) => todo !== targetTodo))
  // }

  // const handleOpenEditForm = (todo) => {
  //   setIsEditable(true)
  //   setEditId(todo.id)
  //   setNewTitle(todo.title)
  // }

  // const handleEditFormChange = (e) => {
  //   setNewTitle(e.target.value)
  // }

  // const handleCloseEditForm = () => {
  //   setIsEditable(false)
  //   setEditId('')
  // }

  // const handleEditTodo = () => {
  //   const newArray = todos.map((todo) =>
  //     todo.id === editId ? { ...todo, title: newTitle } : todo
  //   )
  //   setTodos(newArray)
  //   setNewTitle('')
  //   setEditId()
  //   handleCloseEditForm()
  // }

  // const handleStatusChange = (targetTodo, e) => {
  //   const newArray = todos.map((todo) =>
  //     todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
  //   )
  //   setTodos(newArray)
  // }

  // useEffect(() => {
  //   const filteringTodos = () => {
  //     switch (filter) {
  //       case 'notStarted':
  //         setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
  //         break
  //       // 問題1. 絞り込みの処理を書こう
  //       case 'inProgress':
  //         setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
  //         break
  //       case 'done':
  //         setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
  //         break
  //       // ここまで
  //       default:
  //         setFilteredTodos(todos)
  //     }
  //   }
  //   // 問題2. filteringTodosを呼び出そう
  //   filteringTodos()
  //   // ここまで
  // }, [filter, todos])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <div>
            type="text"
            label="新しいタイトル"
            value='ダミー1'
            {/* // onChange={handleEditFormChange} */}
          </div>
          <div>
            {/* <input
              type="text"
              label="タイトル"
              value={todoTitle}
            // onChange={handleAddFormChanges}
            /> */}
            {/* <button onClick={handleAddTodo}>作成</button> */}
            {/* <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">すべて</option>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select> */}
          </div>
          )}

          <ul>
            {/* 問題3. 絞り込んだtodoを一覧に渡そう
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo, e)}
                >
                  <option value="notStarted">未着手</option>
                  <option value="inProgress">作業中</option>
                  <option value="done">完了</option>
                </select>
                <button onClick={() => handleOpenEditForm(todo)}>編集</button>
                <button onClick={() => handleDeleteTodo(todo)}>削除</button>
              </li>
            ))} */}
            {/* ここまで */}
          </ul>
        </>
      </main>
    </>
  );
}