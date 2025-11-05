import { Box, Container, VStack, Heading, Text, Button, SimpleGrid, Card, CardBody } from '@chakra-ui/react'
import Link from 'next/link'

export default function Index() {
  //表示部分
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={12}>
        {/* ヒーローセクション */}
        <Box
          bgGradient="linear(to-r, purple.500, pink.500)"
          w="100%"
          p={16}
          borderRadius="2xl"
          boxShadow="2xl"
          textAlign="center"
        >
          <Heading color="white" size="2xl" mb={4}>
            SELFTODO
          </Heading>
          <Text color="whiteAlpha.900" fontSize="xl" mb={8}>
            シンプルで使いやすいタスク管理アプリ
          </Text>
          <Link href="/list">
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              bg="white"
              color="purple.600"
              px={8}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              transition="all 0.2s"
            >
              今すぐ始める
            </Button>
          </Link>
        </Box>

        {/* ナビゲーションカード */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
          <Link href="/list">
            <Card
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
              cursor="pointer"
              bg="teal.50"
              borderTop="4px solid"
              borderColor="teal.500"
            >
              <CardBody textAlign="center" py={8}>
                <Text fontSize="4xl" mb={4}>📝</Text>
                <Heading size="md" mb={2} color="teal.700">
                  タスク一覧
                </Heading>
                <Text color="gray.600">
                  すべてのタスクを確認・管理
                </Text>
              </CardBody>
            </Card>
          </Link>

          <Link href="/login">
            <Card
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
              cursor="pointer"
              bg="blue.50"
              borderTop="4px solid"
              borderColor="blue.500"
            >
              <CardBody textAlign="center" py={8}>
                <Text fontSize="4xl" mb={4}>🔐</Text>
                <Heading size="md" mb={2} color="blue.700">
                  ログイン
                </Heading>
                <Text color="gray.600">
                  アカウントにサインイン
                </Text>
              </CardBody>
            </Card>
          </Link>

          <Link href="/register">
            <Card
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
              cursor="pointer"
              bg="purple.50"
              borderTop="4px solid"
              borderColor="purple.500"
            >
              <CardBody textAlign="center" py={8}>
                <Text fontSize="4xl" mb={4}>✨</Text>
                <Heading size="md" mb={2} color="purple.700">
                  新規登録
                </Heading>
                <Text color="gray.600">
                  新しくアカウントを作成
                </Text>
              </CardBody>
            </Card>
          </Link>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
