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

  // async function todo() {
  //   const col = collection(db, "todo");
  //   const q = query(col, where("id", "==", taskId));
  //   const task: any = await getDocs(q).then((snapshot) => {
  //     return snapshot.docs[0].data();
  //   });
  //   console.log(task)
  // }

  async function todo() {
    const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
      snapshot.docs.map((doc) => {
        return doc.data();
      })
    );
    console.log(tasks)
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
          doc.data()
        </Box>
        <Flex align="center" justify="center" padding={200}>
          <Link href={"/list"}>
            <Text fontSize={32}>
              一覧画面へ
            </Text>
          </Link>
        </Flex>
        //https://qiita.com/masakiwakabayashi/items/8d33f6df1a7ec4dbfa3a/参考記事
        {
          // map関数を使ってstaffのデータを表示
          tasks.map((task: any) => {
            return (
              <Box key={task.id}>
                <Flex>
                  <Box p={3} minWidth={'73px'}>
                    {task.name}
                  </Box>
                </ChakraProvider>
              </div>
            )
          }
        }