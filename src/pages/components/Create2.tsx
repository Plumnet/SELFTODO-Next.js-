import React, { useState } from 'react'

export default function Create2({ add, title, addform }: any) {

    // const [todos, setTodos] = useState<any>([]);

    // //todoTitleはtodosの中に含まれている
    // const [todoTitle, setTodoTitle] = useState("");

    // //todoIdはtodosの中に含まれている
    // const [todoId, setTodoId] = useState(todos.length + 1);

    // const handleAddFormChanges = (e: any) => {
    //     setTodoTitle(e.target.value);
    // };

    // const handleAddTodo = () => {
    //     //
    //     setTodos([...todos, { id: todoId, title: todoTitle }]);
    //     //
    //     setTodoId(todoId + 1);
    //     //
    //     setTodoTitle("");
    //     // console.log(handleAddTodo)
    // };

    //Create.tsxの関数をコメントアウト化
    return (
        <div>
            <input type="text" value={title} onChange={addform} />
            {/* 問題2. ボタンを押すと、新しいtodoがTodoリストに追加されるようにしよう*/}
            <button onClick={add}>作成</button>
            {/* <button onClick={add}>テスト</button> */}
            {/* ここまで */}
        </div>
    )
}
