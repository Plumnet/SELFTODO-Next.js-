import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { BrowserRouter, Navigate } from "react-router-dom";

const register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    console.log('registerEmail', registerEmail)
    console.log('registerPassword', registerPassword)


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            alert("正しく入力してください");
        }
    };

    const [user, setUser] = useState<any>("");
    console.log('user', user)

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <>
            {/* ↓ログインしていればマイページを表示 */}
            {user ? (
                <BrowserRouter>
                    <Navigate to={`/mypage`} />
                </BrowserRouter>
            ) : (
                <>
                    <h1>新規登録</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            <input
                                name="email"
                                type="email"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            <input
                                name="password"
                                type="password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button>登録する</button>
                    </form>
                </>
            )}
        </>
    );
};

export default register;