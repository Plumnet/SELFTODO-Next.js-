'use client'
import { auth } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react'


const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [user, setUser] = useState<any>("");
    const router = useRouter()

    const handleLogin = async () => {
        setErrorMessage("");
        if (!loginEmail || !loginPassword) {
            setErrorMessage("メールアドレスとパスワードを入力してください。");
            return;
        }
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            router.push('/mypage');
        } catch (error: any) {
            const code = error?.code || '';
            if (code === 'auth/invalid-email') setErrorMessage('メールアドレスの形式が正しくありません。');
            else if (code === 'auth/user-not-found') setErrorMessage('ユーザーが見つかりません。新規登録してください。');
            else if (code === 'auth/wrong-password') setErrorMessage('パスワードが正しくありません。');
            else if (code === 'auth/too-many-requests') setErrorMessage('試行回数が多すぎます。しばらくしてから再試行してください。');
            else setErrorMessage('ログインに失敗しました。もう一度お試しください。');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                router.push('/mypage')
            }
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <Container maxW="md" py={12}>
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Text fontSize="4xl">🔐</Text>
                    <Heading size="lg" mt={2}>ログイン</Heading>
                    <Text color="gray.500" mt={2}>メールアドレスでサインイン</Text>
                </Box>

                {errorMessage && (
                    <Alert status='error' borderRadius="md">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}

                <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel>メールアドレス</FormLabel>
                            <Input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>パスワード</FormLabel>
                            <Input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </FormControl>
                        <Button colorScheme='blue' onClick={handleLogin} isLoading={isLoading} loadingText='サインイン中'>
                            ログイン
                        </Button>
                    </VStack>
                </Box>

                <Box textAlign="center">
                    <Text color="gray.600">
                        アカウントをお持ちでない方は
                        {' '}
                        <Link href="/register">
                            <Text as="span" color="blue.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>新規登録</Text>
                        </Link>
                        {' '}へ
                    </Text>
                    <Box mt={4}>
                        <Link href="/">
                            <Button variant="ghost">TOPに戻る</Button>
                        </Link>
                    </Box>
                </Box>
            </VStack>
        </Container>
    );
};

export default Login;