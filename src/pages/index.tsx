import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import db from "../firebase";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";

export default function index() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //データベースからデータを取得する
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => doc))
    })
  }, []);



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
