import React, { useEffect, useState } from 'react'
import Create from './components/Create'
import { Box, ChakraProvider, Text } from '@chakra-ui/react';
import db, { auth } from '@/firebase';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth';

export default function create(todo: any) {


    const router3 = useRouter();
    console.log(router3)

    //オブジェクトの各要素の型指定
    type Todo = {
        id: number;
        title: string;
    };

    //コンポーネントを他のファイルから参照できるようにする
    const router2 = useRouter();

    const router = useRouter();
    console.log(router)

    async function todo2() {
        const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
            snapshot.docs.map((doc) => {
                return { docId: doc.id, ...doc.data() };
            })
        );
    }

    useEffect(() => {
        todo2()
    }, []);


    //Stateにはオブジェクトの型を指定
    const [todos, setTodos] = useState<Todo[]>([])
    //新規登録のための、IdのState
    const [todoId, setTodoId] = useState(todos.length + 1);
    //新規登録のための、TitleのState
    const [todoTitle, setTodoTitle] = useState("");
    //新規登録のための、UserIdのState
    const [todoUserId, setUserId] = useState(todo2);
    console.log('確認', router2.query.id)
    const [user, setUser] = useState<any>("");



    //クリックイベント用の追加用のための関数
    const handleAddTodo = async () => {
        onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            //スプレッド構文により、変数todosにtodoIdとtodoTitleを追加
            setTodos([...todos, { id: todoId, title: todoTitle }]);
            //Titleを空にする
            setTodoTitle("");
            //Titleの値を確認する
            console.log(todoTitle);
            const docRef = await addDoc(collection(db, "todo"), {
                id: todoId,
                todoTitle: todoTitle
            });
            //現在は、todoIdとtodoTitleの2つを設定
            const createuser = async (currentUser: any) => {
                await setDoc(doc(db, "todo", docRef.id), { id: currentUser?.uid, title: todoTitle })
            }
            createuser(currentUser)
            router.push('/list')
        })
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
                <button onClick={() => newTodo(todo)}>ボタン</button>
            </div>
        </ChakraProvider >
    )
}
