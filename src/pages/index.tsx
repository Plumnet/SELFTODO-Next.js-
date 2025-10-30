import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"
import db from '@/firebase'

const innerBoxStyles = {
  padding: '20px',
  margin: '20px',
};

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    //https://zenn.dev/kiwichan101kg/articles/ee5460b61bce25の条件付きデータの取得より、Cannot read properties of undefined (reading 'data')エラーになってしまいます。
    async function fetchTodo() {
      try {
        const col = collection(db, "todo");
        // todoIdが空の場合は全件取得
        const snapshot = await getDocs(col);
        const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(todos);
        setPosts(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodo();
  }, [])




  //表示部分
  return (
    //1つの要素でしか、返却できないので必要不可欠
    <>
      {/* 要素の範囲 */}
      <Box sx={innerBoxStyles}>
        {/* テキストの制御 */}
        <Text fontSize={32} color='RED' textAlign={['left']}>
          ホーム画面
        </Text>
      </Box>
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
    </>
  )
}
