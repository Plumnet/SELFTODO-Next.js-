import { useEffect, useState } from 'react'
import Delete from '../components/Delete';
import Link from 'next/link';
import { Box, Button, Text, Container, VStack, HStack, Heading, Card, CardBody, Flex, Badge, Spinner, Center } from '@chakra-ui/react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import db, { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

//コンポーネントを他のファイルから参照できるようにする
export default function Home() {
    //オブジェクトの各要素の型指定
    type Todo = {
        docId: string;
        docTitle: string;
        id: number;
        title: string;
    };

    //オブジェクトの配列の型を指定
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function red(docId: string) {
        try {
            // Firestoreからドキュメントを削除
            await deleteDoc(doc(db, "todo", docId));
            console.log("Document deleted with ID: ", docId);

            // stateから削除されたタスクを取り除く（即座にUIを更新）
            setTodos(prevTodos => prevTodos.filter(todo => todo.docId !== docId));
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("タスクの削除に失敗しました");
        }
    }

    const handleLogout = () => {
        auth.signOut();
        router.push('/');
    };



    //ユーザーごとのタスクを取得する関数
    async function fetchTodos(userId: string) {
        try {
            setLoading(true);
            let tasksQuery;

            if (userId === "anonymous") {
                // 匿名ユーザーの場合は、idが"anonymous"のタスクのみ取得
                tasksQuery = query(collection(db, "todo"), where("id", "==", "anonymous"));
            } else {
                // ログインユーザーの場合は、そのユーザーのタスクのみ取得
                tasksQuery = query(collection(db, "todo"), where("id", "==", userId));
            }

            const snapshot = await getDocs(tasksQuery);
            const tasks = snapshot.docs.map((doc) => {
                return { docId: doc.id, ...doc.data() };
            });

            console.log('Fetched tasks for user:', userId, tasks);
            setTodos(tasks as any);
        } catch (error) {
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    }

    //認証状態の監視とタスクの取得
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                // ログインユーザーのタスクを取得
                console.log("User logged in:", user.uid);
                fetchTodos(user.uid);
            } else {
                // 匿名ユーザーのタスクを取得
                console.log("User not logged in, showing anonymous tasks");
                fetchTodos("anonymous");
            }
        });

        // クリーンアップ関数
        return () => unsubscribe();
    }, []);







    //表示部分
    return (
        <Container maxW="container.lg" py={8}>
            <VStack spacing={6} align="stretch">
                {/* ヘッダー部分 */}
                <Box
                    bgGradient="linear(to-r, teal.500, green.500)"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                    position="relative"
                >
                    <Heading color="white" size="xl" mb={2}>
                        タスク一覧
                    </Heading>
                    <Text color="whiteAlpha.900" fontSize="md">
                        {currentUser
                            ? `ようこそ、${currentUser.email || 'ユーザー'}さん`
                            : 'ゲストモードで表示しています'}
                    </Text>
                    {currentUser ? (
                        <Button
                            position="absolute"
                            top={4}
                            right={4}
                            colorScheme="whiteAlpha"
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            _hover={{ bg: 'whiteAlpha.200' }}
                        >
                            ログアウト
                        </Button>
                    ) : (
                        <Link href="/">
                            <Button
                                position="absolute"
                                top={4}
                                right={4}
                                colorScheme="whiteAlpha"
                                variant="outline"
                                size="sm"
                                _hover={{ bg: 'whiteAlpha.200' }}
                            >
                                TOPに戻る
                            </Button>
                        </Link>
                    )}
                </Box>

                {/* 作成ボタン */}
                <Flex justify="space-between" align="center">
                    <Badge colorScheme="green" fontSize="lg" px={3} py={1} borderRadius="md">
                        {todos.length} 件のタスク
                    </Badge>
                    <Link href="/create">
                        <Button
                            colorScheme='teal'
                            size='lg'
                            boxShadow="md"
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                            transition="all 0.2s"
                        >
                            ＋ タスク作成
                        </Button>
                    </Link>
                </Flex>

                {/* タスクリスト */}
                <VStack spacing={3} align="stretch">
                    {loading ? (
                        <Center py={12}>
                            <VStack spacing={4}>
                                <Spinner size="xl" color="teal.500" thickness="4px" />
                                <Text color="gray.600">読み込み中...</Text>
                            </VStack>
                        </Center>
                    ) : todos.length === 0 ? (
                        <Card>
                            <CardBody>
                                <Text color="gray.500" textAlign="center" py={8}>
                                    タスクがありません。新しいタスクを作成しましょう！
                                </Text>
                            </CardBody>
                        </Card>
                    ) : (
                        todos.map((todo) => (
                            <Card
                                key={todo.docId}
                                boxShadow="md"
                                _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                            >
                                <CardBody>
                                    <Flex justify="space-between" align="center">
                                        <Link
                                            href={`/list/${todo.docId}`}
                                            style={{ flex: 1 }}
                                        >
                                            <Text
                                                fontSize="lg"
                                                fontWeight="medium"
                                                _hover={{ color: 'teal.500' }}
                                                cursor="pointer"
                                            >
                                                {todo.title}
                                            </Text>
                                        </Link>
                                        <HStack spacing={2}>
                                            <Link href={{
                                                pathname: `/list/edit/${todo.docId}`,
                                                query: { title: todo.title },
                                            }}>
                                                <Button
                                                    colorScheme='blue'
                                                    size='sm'
                                                    variant="outline"
                                                >
                                                    編集
                                                </Button>
                                            </Link>
                                            <Delete handleDelete={red} todo={todo} />
                                        </HStack>
                                    </Flex>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </VStack>
            </VStack>
        </Container>
    )
}
