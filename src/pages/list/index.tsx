import React, { useEffect, useState } from 'react'
import Delete from '../components/Delete';
import Link from 'next/link';
import { Box, Button, ChakraProvider, Text } from '@chakra-ui/react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import db, { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

//コンポーネントを他のファイルから参照できるようにする
export default function Home() {
    //オブジェクトの各要素の型指定
    type Todo = {
        docId: string;
        docTitle: string;
        id: number;
        title: string;
    };

    type Select = {
        code: string;
    };

    //オブジェクトの配列の型を指定
    const [todos, setTodos] = useState<Todo[]>([]);

    //firestoreのデータ保持用のstate
    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState<any>("");

    const [error, setError] = useState("");

    //画像の制御
    const innerBoxStyles = {
        p: '5',
        backgroundImage:
            'url(https://dynabook.com/assistpc/faq/pcdata2/images2/017385a.gif) ',
    }

    async function red(docId: string) {
        await deleteDoc(doc(db, "todo", docId));
    }

    // import { collection, getDocs, addDoc } from 'firebase/firestore';
    // import { db } from './firebaseConfig';

    // // 読み取り操作のデバッグ
    // async function readTodos() {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "todos"));
    //         querySnapshot.forEach((doc) => {
    //             console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //         });
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             const inputElement = document.querySelector<HTMLInputElement>('#error');
    //             if (!inputElement) return;
    //             setError(error.message);
    //             console.error("読み取りエラー:", error);
    //             console.error("エラーコード:", error.code);

    //             console.error("エラーメッセージ:", error.message);
    //         } else {
    //             setError('An unknown error occurred');
    //         }

    //     }
    // }

    // // 書き込み操作のデバッグ
    // async function addTodo(title: any) {
    //     try {
    //         const docRef = await addDoc(collection(db, "todos"), {
    //             title: title,
    //             completed: false,
    //             createdAt: new Date()
    //         });
    //         console.log("ドキュメント追加成功。ID:", docRef.id);
    //     } catch (error) {
    //         console.error("書き込みエラー:", error);
    //         console.error("エラーコード:", error.code);
    //         console.error("エラーメッセージ:", error.message);
    //     }
    // }







    //非同期関数、定義の方で、awaitが代入されているので、
    //これを使わないと、コンパイルエラーになってしまう。
    async function todo() {
        //クエリを実行し、結果をQuerySnapshotとして返す。DocumentReferenceを参照している。
        const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
            //docsは配列を示している、その中身がQueryDocumentSnapshot。
            snapshot.docs.map((doc) => {
                //ドキュメントのデータが取得できているかの確認
                // console.log('doc', doc.data())
                //https://qiita.com/maiyama18/items/86a4573fdce800221b72の解説より
                //ドキュメントのデータを返す。
                return { docId: doc.id, ...doc.data() };
            })
        );
        const querySnapshot = await getDocs(collection(db, "todo"));
        querySnapshot.forEach(() => {
        });
        //tasksがデータが取得出来ているかの確認
        console.log('task', tasks)
        //stateのデータをtasksに更新
        setTodos(tasks as any)

        const handleAddTodo = async () => {
            onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);
                const q = query(collection(db, "todo"), where("currentUser.id", "==", "todoId"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id === " => ", doc.data());
                });
            }
            )
        }
        //todo関数を呼び出す
        useEffect(() => {
            todo()
        }, []);
    }
    todo()
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
                    <a href="/create">
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
                                        pathname: `/list/${todo.docId}`,
                                    }}>
                                    <span>{todo.title}</span>
                                </Link>
                                {/* 編集画面へ遷移させる */}
                                <Link href={{
                                    pathname: `/list/edit/${todo.docId}`,
                                    query: { title: todo.title, },
                                }}>
                                    <Button colorScheme='teal' size='sm' m={2}>編集</Button>
                                </Link>
                                {/* handleDeleteはonClick、todoはhandleDeleteの引数 */}
                                <Delete handleDelete={red} todo={todo} />
                            </li>
                        ))}
                    </ul >
                </Box>
            </>
        </ChakraProvider >
    )
}
