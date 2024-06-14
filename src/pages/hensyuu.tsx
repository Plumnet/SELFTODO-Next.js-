import React, { useState } from 'react'
import Edit from './components/Edit'

export default function Hensyuu() {

    const handleEditTodo = () => {
        type Todo = {
            id: number;
            title: string;
        };
        const [todos, setTodos] = useState<Todo[]>([])
        const [editId, setEditId] = useState('')
        const [newTitle, setNewTitle] = useState('')
        // 問題2. 編集内容をTodoリストの配列に加えよう
        //ここまで
        const newArray = todos.map((todo) =>
            todo.id === editId ? { ...todo, title: newTitle } : todo
        )
        setTodos(newArray)
        setEditId('')
        // 問題3. Todoリストの更新後にstateを初期化しよう
        setNewTitle('')
        // handleCloseEditForm()
        // ここまで
    }

    const handleEditFormChange = (e: any) => {
        setNewTitle(e.target.value)
    }

    return (
        <div>
            <Edit save={handleEditTodo} edittitle={setNewTitle} editform={handleEditFormChange} ></Edit>
        </div>
    )
}

