import { Box, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Header from './components/Header'

export default function index() {
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


