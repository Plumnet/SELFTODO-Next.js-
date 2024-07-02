import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import db from "@/lib/firebase/firebase";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import db from '@/firebase';


export default function index() {
  const [posts, setPosts] = useState([]);
  const [taskId, setTaskId] = useState([]);

  // async function todo() {
  //   const col = collection(db, "todo");
  //   const q = query(col, where("id", "==", 1));
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
    setPosts(tasks as any)
  }

  todo()
  console.log('post', posts)



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
        <Box>
          {posts.map((task: any) => (
            <p> {task.text}</p>
          ))}
        </Box>
      </ChakraProvider>
    </div >
  )
}
