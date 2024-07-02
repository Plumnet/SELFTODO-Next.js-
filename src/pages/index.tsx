import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
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

  const innerBoxStyles = {
    // boxSize: '150px',
    p: '5',
    backgroundImage:
      'url(https://livedoor.blogimg.jp/zeropasoakita/imgs/e/5/e555c3b1-s.jpg) ',
  }

  return (
    <div>
      <ChakraProvider>
        <Box sx={innerBoxStyles}>
          <Text fontSize={32} color='RED' textAlign={['left']}>
            ホーム画面
          </Text>
        </Box>
        <Flex align="center" justify="center" padding={200}>
          <Link href={"/list"}>
            <Text fontSize={32}>
              一覧画面へ
            </Text>
          </Link>
        </Flex>
      </ChakraProvider>
    </div >
  )
}