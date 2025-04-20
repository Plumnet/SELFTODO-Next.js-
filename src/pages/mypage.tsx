import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Mypage = () => {
    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState<any>("");

    const router = useRouter()

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log('ユーザー', currentUser)
            }
        });
    }, []);

    const handleLogout = () => {
        auth.signOut();
        router.push('/');
    };


    return (
        <>
            <h1>マイページ</h1>
            {/* ↓ユーザーのメールアドレスを表示（ログインしている場合） */}
            <p>{user?.user}</p>
            <p>{user?.email}</p>
            <button onClick={handleLogout}>ログアウト</button>
            <Link href="/">
                <button>TOPに戻る</button>
            </Link>
        </>
    );
};

export default Mypage;