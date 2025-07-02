import { Box, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

import Header from './components/Header'

export default function index() {
  //画像の制御
import React, { useEffect, useState } from 'react'
// import db from "@/lib/firebase/firebase";
import { QuerySnapshot, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import db from '@/firebase';


export default function index() {
  const [posts, setPosts] = useState([]);
  const initialState = ['id: 1', 'id: 2'];
  const [todoId, setTodoId] = useState([]);//←配列は、これではいけませんか？

  //https://zenn.dev/kiwichan101kg/articles/ee5460b61bce25の条件付きデータの取得より、Cannot read properties of undefined (reading 'data')エラーになってしまいます。
  async function todo() {
    const col = collection(db, "todo");
    const q = query(col, where("id", "==", todoId));
    const todo = await getDocs(q).then((snapshot) => {
      return snapshot.docs[0].data();
    });
    console.log(todo)
  }

  todo()




  //表示部分
  return (
    //1つの要素でしか、返却できないので必要不可欠
    <>
      {/* ChakraUIを使うのに必要不可欠 */}
      <ChakraProvider>
        {/* 要素の範囲 */}
        < Box sx={innerBoxStyles} >
          {/* テキストの制御 */}
          <Text fontSize={32} color='RED' textAlign={['left']}>
            ホーム画面
          </Text>
        </Box >
        {/* 要素を並列にする */}
        <Flex align="center" justify="center" padding={200}>
          {/* リンクを設定する */}
          <Link href={"/list"}>
            <Text fontSize={32}>
              一覧画面へ
            </Text>
          </Link>
          <Link href={"/login"}>
            <Text fontSize={32}>
              ログイン画面へ
            </Text>
          </Link>
          <Link href={"/register"}>
            <Text fontSize={32}>
              新規登録画面へ
            </Text>
          </Link>
        </Flex>
      </ChakraProvider>
    </>
  )
}
