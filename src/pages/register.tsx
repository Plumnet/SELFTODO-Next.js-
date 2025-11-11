import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import db from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Container,
    Box,
    Heading,
    Text,
    VStack,
    Input,
    Button,
    FormControl,
    FormLabel,
    Card,
    CardBody,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';

const Register = () => {
    const [registerUserName, setRegisterUserName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const router = useRouter();
    const toast = useToast();

    // バリデーション
    const validateForm = () => {
        const newErrors = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        if (!registerUserName.trim()) {
            newErrors.userName = "ユーザー名を入力してください";
        }

        if (!registerEmail.trim()) {
            newErrors.email = "メールアドレスを入力してください";
        } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
            newErrors.email = "有効なメールアドレスを入力してください";
        }

        if (!registerPassword) {
            newErrors.password = "パスワードを入力してください";
        } else if (registerPassword.length < 6) {
            newErrors.password = "パスワードは6文字以上で入力してください";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "確認用パスワードを入力してください";
        } else if (registerPassword !== confirmPassword) {
            newErrors.confirmPassword = "パスワードが一致しません";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Firebase Authenticationでユーザーを作成
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );

            const user = userCredential.user;
            console.log('User created:', user.uid);

            // Firestoreにユーザー情報を保存
            await setDoc(doc(db, "user", user.uid), {
                id: user.uid,
                userName: registerUserName,
                email: registerEmail,
                createdAt: new Date(),
            });

            console.log('User data saved to Firestore');

            // 成功メッセージを表示
            toast({
                title: "登録完了",
                description: "アカウントが作成されました。ログインページに移動します。",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // ログインページにリダイレクト
            setTimeout(() => {
                router.push('/login');
            }, 1500);

        } catch (error: any) {
            console.error("Registration error:", error);

            let errorMessage = "登録に失敗しました";

            if (error.code === "auth/email-already-in-use") {
                errorMessage = "このメールアドレスは既に使用されています";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "無効なメールアドレスです";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "パスワードが弱すぎます";
            }

            toast({
                title: "エラー",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxW="container.sm" py={8}>
            <VStack spacing={6} align="stretch">
                {/* ヘッダー部分 */}
                <Box
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                >
                    <Heading color="white" size="xl" mb={2}>
                        新規登録
                    </Heading>
                    <Text color="whiteAlpha.900" fontSize="md">
                        アカウントを作成してタスク管理を始めましょう
                    </Text>
                </Box>

                {/* 登録フォーム */}
                <Card boxShadow="lg">
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isRequired isInvalid={!!errors.userName}>
                                    <FormLabel>ユーザー名</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="山田太郎"
                                        value={registerUserName}
                                        onChange={(e) => {
                                            setRegisterUserName(e.target.value);
                                            setErrors({...errors, userName: ""});
                                        }}
                                    />
                                    <FormErrorMessage>{errors.userName}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.email}>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={registerEmail}
                                        onChange={(e) => {
                                            setRegisterEmail(e.target.value);
                                            setErrors({...errors, email: ""});
                                        }}
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.password}>
                                    <FormLabel>パスワード</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="6文字以上"
                                        value={registerPassword}
                                        onChange={(e) => {
                                            setRegisterPassword(e.target.value);
                                            setErrors({...errors, password: ""});
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                                    <FormLabel>パスワード（確認）</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="もう一度入力してください"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setErrors({...errors, confirmPassword: ""});
                                        }}
                                    />
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                </FormControl>

                                <VStack spacing={3} width="100%">
                                    <Button
                                        type="submit"
                                        colorScheme="purple"
                                        size="lg"
                                        width="100%"
                                        isLoading={loading}
                                        loadingText="登録中..."
                                        boxShadow="md"
                                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                                        transition="all 0.2s"
                                    >
                                        登録する
                                    </Button>

                                    <Link href="/" style={{ width: '100%' }}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            width="100%"
                                            isDisabled={loading}
                                        >
                                            TOPに戻る
                                        </Button>
                                    </Link>

                                    <Text fontSize="sm" color="gray.600" textAlign="center">
                                        既にアカウントをお持ちですか？{" "}
                                        <Link href="/login" style={{ color: '#805AD5', textDecoration: 'underline' }}>
                                            ログイン
                                        </Link>
                                    </Text>
                                </VStack>
                            </VStack>
                        </form>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    );
};

export default Register;
