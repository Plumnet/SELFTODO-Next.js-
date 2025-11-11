import db from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    Container,
    Box,
    Heading,
    Text,
    VStack,
    Input,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import Link from "next/link";

export default function Edit() {
    const router = useRouter();
    const toast = useToast();
    const [editTitle, setEditTitle] = useState<string>('');
    const [editId, setEditId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (router.query.id) {
            setEditId(router.query.id as string);
        }
        if (router.query.title) {
            setEditTitle(router.query.title as string);
        }
    }, [router.query]);

    async function handleUpdate() {
        if (!editTitle.trim()) {
            toast({
                title: "エラー",
                description: "タスク名を入力してください",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            await updateDoc(doc(db, 'todo', editId), { title: editTitle });
            toast({
                title: "更新完了",
                description: "タスクが更新されました",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                router.push('/list');
            }, 1000);
        } catch (error) {
            console.error("Update error:", error);
            toast({
                title: "エラー",
                description: "タスクの更新に失敗しました",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={6} align="stretch">
                {/* ヘッダー部分 */}
                <Box
                    bgGradient="linear(to-r, teal.500, green.500)"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                >
                    <Heading color="white" size="xl" mb={2}>
                        タスク編集
                    </Heading>
                    <Text color="whiteAlpha.900" fontSize="md">
                        タスクの内容を編集します
                    </Text>
                </Box>

                {/* 編集フォーム */}
                <Card boxShadow="lg">
                    <CardBody>
                        <VStack spacing={6}>
                            <FormControl isRequired>
                                <FormLabel fontSize="lg" fontWeight="bold">
                                    タスク名
                                </FormLabel>
                                <Input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="タスク名を入力してください"
                                    size="lg"
                                />
                            </FormControl>

                            <VStack spacing={3} width="100%">
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    width="100%"
                                    onClick={handleUpdate}
                                    isLoading={loading}
                                    loadingText="更新中..."
                                    boxShadow="md"
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                    transition="all 0.2s"
                                >
                                    更新する
                                </Button>

                                <Link href="/list" style={{ width: '100%' }}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        width="100%"
                                        isDisabled={loading}
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
    );
}