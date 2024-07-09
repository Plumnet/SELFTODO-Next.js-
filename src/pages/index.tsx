import { Box, Button, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import db from "@/lib/firebase/firebase";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import db from '@/firebase';


export default function index() {
  //firestoreのデータ保持用のstate
  const [posts, setPosts] = useState([]);
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

  //非同期関数、定義の方で、awaitが代入されているので、
  //これを使わないと、コンパイルエラーになってしまう。
  async function todo() {
    //クエリを実行し、結果をQuerySnapshotとして返す。DocumentReferenceを参照している。
    const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
      //docsは配列を示している、その中身がQueryDocumentSnapshot。
      snapshot.docs.map((doc) => {
        console.log('doc', doc.data())
        //https://qiita.com/maiyama18/items/86a4573fdce800221b72の解説より
        //データを抽出し、特定のフィールドを取得。
        return doc.data();
      })
    );
    //tasksがデータが取得出来ているかの確認
    console.log('task', tasks)
    //stateのデータをtasksに更新
    setPosts(tasks as any)
  }
  //todo関数を呼び出す
  useEffect(() => {
    todo()
  }, []);
  // todo()
  //こちらのログは、画面上でpostと表示される
  //40行目と同じ内容ではある
  console.log('post', posts)


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
        <Box>
          {posts.map((task: any) => (
            <p> {task.text}</p>
          ))}
        </Box>
      </ChakraProvider>
    </>
  )
}

//https://zenn.dev/kiwichan101kg/articles/ee5460b61bce25のデータ一覧の取得より引用
//https://firebase.google.com/docs/reference/js/firestore_?hl=jaの解説より
//https://zenn.dev/joo_hashi/scraps/ca249288c3952cより
