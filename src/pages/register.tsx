import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import db from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";


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




    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            // ユーザーがログインしていない場合は処理をスキップ
            if (!currentUser) {
                console.log('No user logged in');
                return;
            }

            try {
                const createuser = async (currentUser: any) => {
                    await setDoc(doc(db, "user", currentUser.uid), {
                        id: currentUser.uid,
                        userDisplayName: currentUser.displayName || '',
                        email: currentUser.email
                    });
                };

                const snapshot = await getDocs(collection(db, "user"));
                const allusers = snapshot.docs.map((doc) => {
                    return { docId: doc.id, ...doc.data() };
                });

                console.log('Current user:', currentUser.uid);
                console.log('Existing users:', allusers);

                // ユーザーがまだ登録されていない場合のみ作成
                const userExists = allusers.some(user => user.docId === currentUser.uid);
                if (!userExists) {
                    console.log('Creating new user document');
                    await createuser(currentUser);
                }
            } catch (error) {
                console.error('Error in user registration:', error);
            }
        });

        return () => unsubscribe();
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