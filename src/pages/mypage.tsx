import { auth } from "@/firebase";
import db from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
    Container,
    Box,
    Heading,
    Text,
    VStack,
    Button,
    Card,
    CardBody,
    HStack,
    Badge,
    Divider,
    Avatar,
    Spinner,
    Center,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';

const Mypage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [todoCount, setTodoCount] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log('ユーザー', currentUser);

                // ユーザーのタスク数を取得
                try {
                    const q = query(
                        collection(db, "todo"),
                        where("id", "==", currentUser.uid)
                    );
                    const snapshot = await getDocs(q);
                    setTodoCount(snapshot.size);
                } catch (error) {
                    console.error("Error fetching todo count:", error);
                }
            } else {
                // ログインしていない場合はログインページへリダイレクト
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = () => {
        auth.signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <Center h="100vh">
                <VStack spacing={4}>
                    <Spinner size="xl" color="purple.500" thickness="4px" />
                    <Text color="gray.600">読み込み中...</Text>
                </VStack>
            </Center>
        );
    }

    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={6} align="stretch">
                {/* ヘッダー部分 */}
                <Box
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                >
                    <HStack spacing={4} align="center">
                        <Avatar
                            size="xl"
                            name={user?.email}
                            bg="white"
                            color="purple.500"
                        />
                        <VStack align="start" spacing={1}>
                            <Heading color="white" size="xl">
                                マイページ
                            </Heading>
                            <Text color="whiteAlpha.900" fontSize="lg">
                                {user?.email}
                            </Text>
                            <Badge colorScheme="green" fontSize="sm">
                                ログイン中
                            </Badge>
                        </VStack>
                    </HStack>
                </Box>

                {/* 統計情報 */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Card>
                        <CardBody>
                            <Stat>
                                <StatLabel>タスク数</StatLabel>
                                <StatNumber>{todoCount}</StatNumber>
                                <StatHelpText>現在のタスク総数</StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <Stat>
                                <StatLabel>アカウント</StatLabel>
                                <StatNumber fontSize="xl">アクティブ</StatNumber>
                                <StatHelpText>正常に動作中</StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <Stat>
                                <StatLabel>ユーザーID</StatLabel>
                                <StatNumber fontSize="md">
                                    {user?.uid?.substring(0, 8)}...
                                </StatNumber>
                                <StatHelpText>識別ID</StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* クイックアクション */}
                <Card boxShadow="lg">
                    <CardBody>
                        <VStack spacing={4} align="stretch">
                            <Heading size="md" mb={2}>
                                クイックアクション
                            </Heading>
                            <Divider />

                            <Link href="/list">
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    width="100%"
                                    leftIcon={<Text>📝</Text>}
                                    boxShadow="md"
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                    transition="all 0.2s"
                                >
                                    タスク一覧を見る
                                </Button>
                            </Link>

                            <Link href="/create">
                                <Button
                                    colorScheme="orange"
                                    size="lg"
                                    width="100%"
                                    leftIcon={<Text>➕</Text>}
                                    boxShadow="md"
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                    transition="all 0.2s"
                                >
                                    新しいタスクを作成
                                </Button>
                            </Link>
                        </VStack>
                    </CardBody>
                </Card>

                {/* アカウント管理 */}
                <Card boxShadow="lg">
                    <CardBody>
                        <VStack spacing={4} align="stretch">
                            <Heading size="md" mb={2}>
                                アカウント管理
                            </Heading>
                            <Divider />

                            <VStack spacing={3}>
                                <Link href="/" style={{ width: '100%' }}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        width="100%"
                                        leftIcon={<Text>🏠</Text>}
                                    >
                                        TOPに戻る
                                    </Button>
                                </Link>

                                <Button
                                    colorScheme="red"
                                    variant="outline"
                                    size="lg"
                                    width="100%"
                                    onClick={handleLogout}
                                    leftIcon={<Text>🚪</Text>}
                                >
                                    ログアウト
                                </Button>
                            </VStack>
                        </VStack>
                    </CardBody>
                </Card>

                {/* ユーザー情報 */}
                <Card boxShadow="md">
                    <CardBody>
                        <VStack align="start" spacing={2}>
                            <Heading size="sm" color="gray.600">
                                アカウント情報
                            </Heading>
                            <Divider />
                            <HStack justify="space-between" width="100%">
                                <Text fontWeight="bold">メールアドレス:</Text>
                                <Text>{user?.email}</Text>
                            </HStack>
                            <HStack justify="space-between" width="100%">
                                <Text fontWeight="bold">ユーザーID:</Text>
                                <Text fontSize="sm" color="gray.600">
                                    {user?.uid}
                                </Text>
                            </HStack>
                            <HStack justify="space-between" width="100%">
                                <Text fontWeight="bold">認証状態:</Text>
                                <Badge colorScheme="green">確認済み</Badge>
                            </HStack>
                        </VStack>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    );
};

export default Mypage;
