import React, { useState } from 'react'

export default function create() {
    const [todos, setTodos] = useState([])

    const [todoTitle, setTodoTitle] = useState("");
    const [todoId, setTodoId] = useState(todos.length + 1);

    const handleAddFormChanges = (e) => {
        setTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        //
        setTodos([...todos, { id: todoId, title: todoTitle }]);
        //
        setTodoId(todoId + 1);
        //
        setTodoTitle("");
    };

    return (
        <div>
            <input type="text" value={todoTitle} onChange={handleAddFormChanges} />
            {/* 問題2. ボタンを押すと、新しいtodoがTodoリストに追加されるようにしよう*/}
            <button onClick={handleAddTodo}>作成</button>
            {/* ここまで */}
        </div>
    )
}


