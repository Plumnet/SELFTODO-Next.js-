import { useState } from 'react'
import { Container, Box, Heading, Text, VStack, Input, Button, FormControl, FormLabel, Card, CardBody } from '@chakra-ui/react';
import db, { auth } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreatePage() {
    const router = useRouter();

    //新規登録のための、TitleのState
    const [todoTitle, setTodoTitle] = useState("");



    //クリックイベント用の追加用のための関数
    const handleAddTodo = async () => {
        if (!todoTitle.trim()) {
            console.error("タイトルが入力されていません");
            alert("タイトルを入力してください");
            return;
        }

        //Titleの値を確認する
        console.log("Creating todo:", todoTitle);

        try {
            // 現在のユーザーを取得
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error("ユーザーがログインしていません");
                // ログインしていなくても作成できるように修正
                const docRef = await addDoc(collection(db, "todo"), {
                    id: "anonymous",
                    title: todoTitle,
                    createdAt: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                setTodoTitle(""); // 入力フィールドをクリア
                router.push('/list');
                return;
            }

            // ユーザーIDとタイトルを持つドキュメントを作成
            const docRef = await addDoc(collection(db, "todo"), {
                id: currentUser.uid,
                title: todoTitle,
                createdAt: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            setTodoTitle(""); // 入力フィールドをクリア
            router.push('/list');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("タスクの作成に失敗しました: " + error);
        }
    };




    //表示部分
    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={6} align="stretch">
                {/* ヘッダー部分 */}
                <Box
                    bgGradient="linear(to-r, orange.400, yellow.400)"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                >
                    <Heading color="white" size="xl" mb={2}>
                        タスク作成
                    </Heading>
                    <Text color="whiteAlpha.900" fontSize="md">
                        新しいタスクを追加しましょう
                    </Text>
                </Box>

                {/* 入力フォーム */}
                <Card boxShadow="lg">
                    <CardBody>
                        <VStack spacing={6}>
                            <FormControl isRequired>
                                <FormLabel fontSize="lg" fontWeight="bold">
                                    タスク名
                                </FormLabel>
                                <Input
                                    placeholder="例: 買い物に行く"
                                    size="lg"
                                    value={todoTitle}
                                    onChange={(e) => setTodoTitle(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddTodo();
                                        }
                                    }}
                                />
                            </FormControl>

                            <VStack spacing={3} width="100%">
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    width="100%"
                                    onClick={handleAddTodo}
                                    boxShadow="md"
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                    transition="all 0.2s"
                                >
                                    作成する
                                </Button>
                                <Link href="/list" style={{ width: '100%' }}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        width="100%"
                                    >
                                        キャンセル
                                    </Button>
                                </Link>
                            </VStack>
                        </VStack>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    )
}
