import { useState } from 'react'
import Create from './components/create'
import { Box, Text } from '@chakra-ui/react';
import db, { auth } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router'

export default function CreatePage() {
    const router = useRouter();

    //新規登録のための、TitleのState
    const [todoTitle, setTodoTitle] = useState("");



    //クリックイベント用の追加用のための関数
    const handleAddTodo = async () => {
        if (!todoTitle.trim()) {
            console.error("タイトルが入力されていません");
            alert("タイトルを入力してください");
            return;
        }

        //Titleの値を確認する
        console.log("Creating todo:", todoTitle);

        try {
            // 現在のユーザーを取得
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error("ユーザーがログインしていません");
                // ログインしていなくても作成できるように修正
                const docRef = await addDoc(collection(db, "todo"), {
                    id: "anonymous",
                    title: todoTitle,
                    createdAt: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                setTodoTitle(""); // 入力フィールドをクリア
                router.push('/list');
                return;
            }

            // ユーザーIDとタイトルを持つドキュメントを作成
            const docRef = await addDoc(collection(db, "todo"), {
                id: currentUser.uid,
                title: todoTitle,
                createdAt: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            setTodoTitle(""); // 入力フィールドをクリア
            router.push('/list');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("タスクの作成に失敗しました: " + error);
        }
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

    //表示部分
    return (
        <div>
            {/* 見出し部分の表示領域 */}
            <Box sx={innerBoxStyles}>
                <Text fontSize={32} color='Yellow' textAlign={['left']}>
                    作成画面
                </Text>
            </Box>
            {/* addはonClick、titleは入力フォームの値、addformはonChange */}
            <Create add={handleAddTodo} title={todoTitle} addform={handleAddFormChanges} />
        </div>
    )
}
