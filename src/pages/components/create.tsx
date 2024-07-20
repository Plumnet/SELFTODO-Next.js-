import db from '@/firebase';
import { Box, Button, Input } from '@chakra-ui/react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import CreateHyozi from './CreateHyozi';

export default function Create({ add, title, addform }: any) {

    const [todos, setTodos] = useState<any>([]);

    const [todoTitle, setTodoTitle] = useState("");
    const [todoId, setTodoId] = useState(todos.length + 1);

    console.log('create', todos)

    const handleAddTodo = async () => {
        //スプレッド構文により、変数todosにtodoIdとtodoTitleを追加
        setTodos([...todos, { id: todoId, title: todoTitle }]);
        //現在のIdに+1する
        setTodoId(todoId + 1);
        //Titleを空にする
        setTodoTitle("");
        //Titleの値を確認する
        console.log(todoTitle)
        await addDoc(collection(db, "todo"), { id: todoId, titile: todoTitle })
    };



    return (
        <div>
            <div>
                <Input type="text" value={title} onChange={addform} width="300px" />
                {/* 問題2. ボタンを押すと、新しいtodoがTodoリストに追加されるようにしよう*/}
                <Button colorScheme='teal' size='md' onClick={add}>作成</Button>
                {/* ここまで */}
                <Box m={8}>
                    <ul>
                        {todos.map((todo: any) => (
                            < li key={todo.id} >
                                {/* インライン要素で表示する */}
                                <span>{todo.title}</span>
                            </li>
                        ))}
                    </ul>
                </Box>
            </div>
        </div >
    )
}


