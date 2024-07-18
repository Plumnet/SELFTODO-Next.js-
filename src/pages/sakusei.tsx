import React, { useState } from 'react'
import Create from './components/Create'
import { Link } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import db from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import CreateHyozi from './components/CreateHyozi';


//コンポーネントを他のファイルから参照できるようにする
export default function sakusei(todo: any) {
    //オブジェクトの各要素の型指定
    type Todo = {
        id: number;
        title: string;
    };

    //Stateにはオブジェクトの型を指定
    const [todos, setTodos] = useState<Todo[]>([])
    //新規登録のための、IdのState
    const [todoId, setTodoId] = useState(todos.length + 1);
    //新規登録のための、TitleのState
    const [todoTitle, setTodoTitle] = useState("");

    //クリックイベント用の追加用のための関数
    const handleAddTodo = async () => {
        //スプレッド構文により、変数todosにtodoIdとtodoTitleを追加
        setTodos([...todos, { id: todoId, title: todoTitle }]);
        //現在のIdに+1する
        setTodoId(todoId + 1);
        //Titleを空にする
        setTodoTitle("");
        //Titleが空になっているかの確認
        console.log(todoTitle)
        await setDoc(doc(db, "todo", todoId.toString()), { id: todoId, titile: todoTitle })
    };

    //チェンジイベント用の追加のための関数
    const handleAddFormChanges = (e: any) => {
        setTodoTitle(e.target.value);
    };

    //画像の制御
    const innerBoxStyles = {
        p: '5',
        backgroundImage:
            'url(http://rynona.sakura.ne.jp/sblo_files/rygames/image/Ws001282_-thumbnail2.png) ',
    }


    const docData = {
        id: todo.id,
        title: todo.title,
        text: todo.text,
    };

    async function newTodo(todo: any) {
        await setDoc(doc(db, "todo", '3'), { id: 3, titile: 10, text: 20 })
    }




    //表示部分
    return (
        //ChakraUIを使用するのに、不可欠
        <ChakraProvider>
            <div>
                {/* 見出し部分の表示領域 */}
                <Box sx={innerBoxStyles}>
                    <Text fontSize={32} color='Yellow' textAlign={['left']}>
                        作成画面
                    </Text>
                </Box>
                {/* addはonClick、titleは入力フォームの値、addformはonChange */}
                <Create add={handleAddTodo} title={todoTitle} addform={handleAddFormChanges} />
                <CreateHyozi map={todo} />
                <button onClick={() => newTodo(todo)}>ボタン</button>
            </div>
        </ChakraProvider >
    )
}
