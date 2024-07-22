import React, { useState } from 'react'
import Edit from './components/Edit'
import EditForm from './components/EditForm';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Hensyuu() {
    type Todo = {
        id: number;
        title: string;
    };
    const [todos, setTodos] = useState<Todo[]>([])
    const [editId, setEditId] = useState('')
    const [newTitle, setNewTitle] = useState('')
    console.log(newTitle)

    const router = useRouter();
    console.log(router)



    const handleEditTodo = () => {

        // 問題2. 編集内容をTodoリストの配列に加えよう
        //ここまで
        const newArray = todos.map((todo) =>
            todo.id === editId ? { ...todo, title: newTitle } : todo
        )
        // console.log(todos.id)
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

    const innerBoxStyles = {
        p: '5',
        backgroundImage:
            'url(https://iphone-mania.jp/uploads/2019/07/macOS-Catalina-Drift.png) ',
    }

    return (
        <ChakraProvider>
            <div>
                <h1>{router.query.id}</h1>
                <p>{`タスク名: ${router.query.title}`}</p>
            </div>
            <Box sx={innerBoxStyles}>
                <Text fontSize={32} color='White' textAlign={['left']}>
                    編集画面
                </Text>
            </Box>
            <div>
                <EditForm save={handleEditTodo} edittitle={router.query.title} editform={handleEditFormChange} ></EditForm>
            </div>
        </ChakraProvider>
    )
}

