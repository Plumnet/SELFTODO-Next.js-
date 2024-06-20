import { Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react'

export default function Create({ add, title, addform }: any) {

    const [todos, setTodos] = useState<any>([]);

    const [todoTitle, setTodoTitle] = useState("");
    const [todoId, setTodoId] = useState(todos.length + 1);

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
        // console.log(handleAddTodo)
    };

    return (
        <div>
            <div>
                <Input type="text" value={title} onChange={addform} width="300px" />
                {/* 問題2. ボタンを押すと、新しいtodoがTodoリストに追加されるようにしよう*/}
                <Button colorScheme='teal' size='md' onClick={add}>作成</Button>
                {/* ここまで */}
            </div>
        </div>
    )
}


