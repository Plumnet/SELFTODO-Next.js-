import React, { useEffect, useState } from 'react'
import Delete from './components/Delete';
import Link from 'next/link';
import { Box, Button, ChakraProvider, Text } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase';
import CreateHyozi from './components/CreateHyozi';

//コンポーネントを他のファイルから参照できるようにする
export default function Home() {
    //オブジェクトの各要素の型指定
    type Todo = {
        id: number;
        title: string;
    };

    const query = {
        id: 1,
        name: "yakkun",
    };

    //オブジェクトの配列の型を指定
    const [todos, setTodos] = useState<Todo[]>([]);

    //firestoreのデータ保持用のstate
    const [posts, setPosts] = useState([]);

    //クリックイベント用の削除のための関数
    //targetTodoとtodoで一致していない値を除外する
    const handleDeleteTodo = (targetTodo: any) => {
        console.log('targetTodo', targetTodo)
        setTodos(todos.filter((todo) => todo !== targetTodo))
    }

    //画像の制御
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
                //ドキュメントのデータが取得できているかの確認
                console.log('doc', doc.data())
                //https://qiita.com/maiyama18/items/86a4573fdce800221b72の解説より
                //ドキュメントのデータを返す。
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

    //表示部分
    return (
        //ChakraUIを使用するのに、不可欠      
        <ChakraProvider>
            <>
                {/* 見出し部分の表示領域 */}
                <Box sx={innerBoxStyles}>
                    <Text fontSize={32} color='Green' textAlign={['left']}>
                        一覧画面
                    </Text>
                </Box>
                {/* 作成ボタンの表示領域*/}
                <Box m={4}>
                    <a href="/sakusei">
                        <Button colorScheme='red' size='sm'>
                            タスク作成
                        </Button>
                    </a>
                </Box>
                {/* タスク項目、編集ボタン、削除ボタンの表示領域*/}
                <Box m={8}>
                    <ul>
                        {/* todosの結果を配列として返す */}
                        {todos.map((todo) => (
                            <li key={todo.id} >
                                {/* 動的ルーティング 、idに対応した詳細画面へ遷移させる */}
                                <Link
                                    href={{
                                        pathname: `/list/${todo.id}`,
                                        query: {
                                            id: todo.id,
                                            title: todo.title,
                                        },
                                    }}>
                                    <span>{todo.title}</span>
                                </Link>
                                {/* 編集画面へ遷移させる */}
                                <Link href={{
                                    pathname: `/list/edit/${todo.id}`,
                                    query: {
                                        id: todo.id,
                                        title: todo.title,
                                    },
                                }}>
                                    <Button colorScheme='teal' size='sm' m={2}>編集</Button>
                                </Link>
                                {/* handleDeleteはonClick、todoはhandleDeleteの引数 */}
                                <Delete handleDelete={handleDeleteTodo} todo={todo} />
                            </li>
                        ))}
                    </ul >
                </Box>
            </>
        </ChakraProvider >
    )
}
