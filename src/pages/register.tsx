import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import db, { auth } from "@/firebase";
import { BrowserRouter, Navigate } from "react-router-dom";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { useRef, } from "react"


const register = () => {

    type User = {
        docId: string;
        docTitle: string;
        id: number;
        title: string;
    };

    const [registerUserName, setRegisterUserName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");



    //当初のコード
    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();

    //     try {
    //         await createUserWithEmailAndPassword(
    //             auth,
    //             registerEmail,
    //             registerPassword
    //         );

    //     } catch (error) {
    //         alert("正しく入力してください");
    //     }

    // };

    const auth = getAuth();

    //1.メール、パスワードを使ってユーザーを作成する firbaseAuth
    //2.ユーザーの情報をデータベースに登録する fireStore
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user', user)
                //userに値が入っていれば
                if (user) {
                    //userの中にあるuidをuidに代入
                    const uid = user.uid
                    //他にも持っている値でfirestoreに登録したいものをuserInitialDataに代入
                    const userInitialData = {
                        email: registerEmail,
                        uid: uid,
                    }
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        //firestoreのusersというコレクションに、uidをドキュメントIDとしてもつ、 userInitialDataを登録する※記事のコード
        //     firebase.firestore().collection('user').doc(uid).set(userInitialData)
        // }
        //別の記事のコード、ただしFlluter用なのであまり参考にはならない
        // await db.collection('user').doc(uid).set(newPost.toMap());
        //         .then('ユーザーが作成されました!')
        const frankDocRef = doc(db, "user", "frank");
        await setDoc(frankDocRef, {
            name: "Frank",
            favorites: { food: "Pizza", color: "Blue", subject: "recess" },
            age: 12
        });
    }




    const [user, setUser] = useState<any>("");

    const router = useRouter()

    // useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         if (currentUser !== null) {
    //             router.push('/mypage')
    //         }
    //     });
    // }, []);

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            const createuser = async (currentUser: any) => {
                await setDoc(doc(db, "user", currentUser?.uid), { id: currentUser?.uid, userDisplayName: currentUser?.displayName, email: currentUser?.email })
            }
            const allusers = await getDocs(collection(db, "user")).then((snapshot) =>
                //docsは配列を示している、その中身がQueryDocumentSnapshot。
                snapshot.docs.map((doc) => {
                    //ドキュメントのデータが取得できているかの確認
                    // console.log('doc', doc.data())
                    //https://qiita.com/maiyama18/items/86a4573fdce800221b72の解説より
                    //ドキュメントのデータを返す。
                    console.log('?', currentUser)
                    return { docId: doc.id, ...doc.data() };
                }
                ))
            console.log('allusers?.filter(user => user.docId === currentUser?.uid).length !== 0', allusers?.filter(user => user.docId === currentUser?.uid).length !== 0)
            console.log('????2', user.docId)
            console.log('????3', currentUser?.uid)
            if (allusers?.filter(user => user.docId === currentUser?.uid).length === 0) {
                createuser(currentUser);
            }
        });
    }, []);



    return (
        <>
            <h1>新規登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ユーザー名</label>
                    <input
                        name="user"
                        type="user"
                        value={registerUserName}
                        onChange={(e) => setRegisterUserName(e.target.value)}
                    />
                </div>
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
                <Link href="/">
                    <button>TOPに戻る</button>
                </Link>
            </form>
        </>
    );
};

export default register;