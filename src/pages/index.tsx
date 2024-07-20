import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import db from "@/lib/firebase/firebase";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import db from '@/firebase';


export default function index() {


  //現在、未使用
  const [taskId, setTaskId] = useState([]);

  // async function todo() {
  //   const col = collection(db, "todo");
  //   const q = query(col, where("id", "==", 1));
  //   const task: any = await getDocs(q).then((snapshot) => {
  //     return snapshot.docs[0].data();
  //   });
  //   console.log(task)
  // }


  //画像の制御
  const innerBoxStyles = {
    // boxSize: '150px',
    p: '5',
    backgroundImage:
      'url(https://livedoor.blogimg.jp/zeropasoakita/imgs/e/5/e555c3b1-s.jpg) ',
  }




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
        </Flex>
      </ChakraProvider>
    </>
  )
}

//https://zenn.dev/kiwichan101kg/articles/ee5460b61bce25のデータ一覧の取得より引用
//https://firebase.google.com/docs/reference/js/firestore_?hl=jaの解説より
//https://zenn.dev/joo_hashi/scraps/ca249288c3952cより
