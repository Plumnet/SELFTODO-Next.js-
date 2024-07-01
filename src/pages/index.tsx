import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import db from "@/lib/firebase/firebase";
import { QuerySnapshot, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import db from '@/firebase';

export default function index() {
  const [posts, setPosts] = useState([]);
  const initialState = ['id: 1', 'id: 2'];
  const [taskId, setTaskId] = useState(initialState);

  //ReactでLINEクローンの作り方 - React×Firebaseチュートリ//ReactでLINEクローンの作り方 - React×Firebaseチュートリアルの38:20の時点のコード
  function Line() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      //エラー発生箇所、"プロパティ 'collection' は型 'Firestore' に存在しません。"
      db.collection("messages")
        .limit(50)
        .onSnapshot((snapshot: any) => {
          setMessages(snapshot.docs.map((doc: any) => doc.data()))
        })
    }, []);


    return (
      <div>
        //エラー発生箇所、"型 'void' を型 'ReactNode' に割り当てることはできません。"
        {console.log(messages)}
        <div className="msgs">
          {messages.map(({ id, text }))}
          <div key={id}>
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  }
  // <div>
  //   <ChakraProvider>
  //     <Box sx={innerBoxStyles}>
  //       <Text fontSize={32} color='RED' textAlign={['left']}>
  //         ホーム画面
  //       </Text>

  //     </Box>
  //     <Flex align="center" justify="center" padding={200}>
  //       <Link href={"/list"}>
  //         <Text fontSize={32}>
  //           一覧画面へ
  //         </Text>
  //       </Link>
  //     </Flex>
  //   //https://qiita.com/masakiwakabayashi/items/8d33f6df1a7ec4dbfa3a/参考記事
  //     <div className="msgs">
  //       {messages.map(({ id, text }) => (
  //         <div>
  //           <div key={id}>
  //             <p>{text}</p>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

}