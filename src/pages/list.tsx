import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Create2 from './components/Create2';
import Delete from './components/Delete';
import Create from './components/Create';
import Edit from './components/Edit';
import EditForm from './components/EditForm';
import Router from 'next/router';
import Link from 'next/link';
import { Box, Button, ButtonGroup, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase';
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
    const [todos, setTodos] = useState([
        // { id: 1, title: "姉に誕生日プレゼントを買う" },
        // { id: 2, title: "論文提出" },
        // { id: 3, title: "市役所に住民票の写しをもらいに行く" },
        // { id: 4, title: "12345" },
        // { id: 5, title: "678910" },
        // { id: 6, title: "11,12,13,14,15" },
        // { id: 7, title: "16" },
        // { id: 8, title: "17" },
        // { id: 9, title: "18" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
        // { id: 10, title: "19" },
    ]);

    //todoTitleはtodosの中に含まれている
    const [todoTitle, setTodoTitle] = useState("");

    //todoIdはtodosの中に含まれている
    const [todoId, setTodoId] = useState(todos.length + 1);

    const [isEditable, setIsEditable] = useState(false)
    const [editId, setEditId] = useState('')
    const [newTitle, setNewTitle] = useState('')

    //firestoreのデータ保持用のstate
    const [posts, setPosts] = useState([]);

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
    };

    const handleDeleteTodo = (targetTodo: any) => {
        console.log(targetTodo)
        setTodos(todos.filter((todo) => todo !== targetTodo))
    }

    const handleOpenEditForm = (todo: any) => {
        setIsEditable(true)
        setEditId(todo.id)
        // console.log(todo.id)
        setNewTitle(todo.title)
    }

    const handleEditFormChange = (e: any) => {
        setNewTitle(e.target.value)
    }

    const handleCloseEditForm = () => {
        setIsEditable(false)
        setEditId('')
        console.log(editId)
    }

    const handleEditTodo = () => {
        // 問題2. 編集内容をTodoリストの配列に加えよう
        //ここまで
        const newArray = todos.map((todo) =>
            todo.id === editId ? { ...todo, title: newTitle } : todo
        )
        setTodos(newArray)
        setEditId('')
        // 問題3. Todoリストの更新後にstateを初期化しよう
        setNewTitle('')
        handleCloseEditForm()
        // ここまで
    }

    const innerBoxStyles = {
        p: '5',
        backgroundImage:
            'url(https://dynabook.com/assistpc/faq/pcdata2/images2/017385a.gif) ',
    }

    //非同期関数、定義の方で、awaitが代入されているので、
    //これを使わないと、コンパイルエラーになってしまう。
    async function todo() {
        //クエリを実行し、結果をQuerySnapshotとして返す。DocumentReferenceを参照している。
        const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
            //docsは配列を示している、その中身がQueryDocumentSnapshot。
            snapshot.docs.map((doc) => {
                console.log('doc', doc.data())
                //https://qiita.com/maiyama18/items/86a4573fdce800221b72の解説より
                //データを抽出し、特定のフィールドを取得。
                return doc.data();
            })
        );
        //tasksがデータが取得出来ているかの確認
        console.log('task', tasks)
        //stateのデータをtasksに更新
        setTodos(tasks as any)
    }
    //todo関数を呼び出す
    useEffect(() => {
        todo()
    }, []);
    // todo()
    //こちらのログは、画面上でpostと表示される
    //40行目と同じ内容ではある
    console.log('post', posts)


    return (
        <>
            <ChakraProvider>
                <Box sx={innerBoxStyles}>
                    <Text fontSize={32} color='Green' textAlign={['left']}>
                        一覧画面
                    </Text>
                </Box>
                <Box m={4}>
                    <a href="/sakusei">
                        <Button colorScheme='red' size='sm'>
                            タスク作成
                        </Button>
                    </a>
                </Box>
                {/* <Link href={"/sakusei"}>作成画面へ</Link> */}
                <Box m={8}>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <Link href="list/syousai[id]">
                                    <span>{todo.title}</span>
                                </Link>
                                <a href="/hensyuu" marigin='10px'>
                                    <Button colorScheme='teal' size='sm' m={2} onClick={() => handleOpenEditForm(todo)}>編集</Button>
                                </a>
                                < Delete handleDelete={handleDeleteTodo} todo={todo} />
                                <ul>
                                    {/* <Edit OpenEditForm={handleOpenEditForm} todo={todo} /> */}
                                </ul>
                                {/* <button onClick={() => handleDeleteTodo(todo)}>削除</button> */}
                                {/* < Delete handleDelete={handleDeleteTodo} todo={todo} /> */}
                            </li>
                        ))}
                    </ul >
                </Box>
                {/* <h1>{Router.query.name}</h1>
            <p>{`値: ${Router.query.proficiency}`}</p> */}
            </ChakraProvider >
        </>
    )
}
