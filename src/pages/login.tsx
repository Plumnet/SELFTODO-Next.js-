'use client'
import { auth } from "@/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { atom } from 'recoil';


const Login = () => {
    const [loginUserName, setLoginUserName] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState<any>("");
    const router = useRouter()

    const login = () => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('/mypage')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                router.push('/mypage')
            }
        });
    }, []);




    // router.push('/mypage')

    return (
        <>
            <h1>ログインページ</h1>
            <div>
                <label>メールアドレス</label>
                <input
                    name="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />
            </div>
            <div>
                <label>パスワード</label>
                <input
                    name="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>

            <button onClick={login}>ログイン</button>
            <Link href="/">
                <button>TOPに戻る</button>
            </Link>

        </>
    );
};

export default Login;