import db from "@/firebase";
import EditForm from "@/pages/components/EditForm";
import firebase from "firebase/compat/app";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Edit() {
    const router = useRouter();
    console.log('routerの中身', router)

    //元のコードレッスンのhandleOpenEditForm関数、handleEditFormChange関数のnewTitleのStateに相当する
    const [editTitle, setEditTitle] = useState<string | string[] | undefined>('TEST++')


    useEffect(() => {
        setEditId(router.query.id)
        console.log('routerのid', router.query.id)
        setEditTitle(router.query.title)
        console.log('routerのタイトル', router.query.title)
    }, [router])

    type Todo = {
        id: number;
        title: string;
    };
    const [todos, setTodos] = useState<Todo[]>([])
    const [editId, setEditId] = useState<string | string[] | undefined>('')
    console.log('id', editId)
    const [newTitle, setNewTitle] = useState('')

    const handleEditTodo = () => {

        // 問題2. 編集内容をTodoリストの配列に加えよう
        //ここまで
        const newArray = todos.map((todo: any) =>
            todo.id === editId ? { ...todo, title: editTitle } : todo,
            console.log('三項演算子', todos)
        )
        console.log('編集のid', editId)
        console.log('関数の中', editTitle)
        // console.log(todo.editId)
        setTodos(newArray)
        console.log('配列の中身', newArray)
        setEditId('')
        // 問題3. Todoリストの更新後にstateを初期化しよう
        // handleCloseEditForm()
        // ここまで
    }

    //https://zenn.dev/kiwichan101kg/articles/ee5460b61bce25より引用
    async function update() {
        const updateDocData = {
            id: editId,
            title: editTitle || null,
        };
        await updateDoc(doc(db, "todo", editId), updateDocData);
    }



    //https://firebase.google.com/docs/firestore/manage-data/add-data?hl=jaより引用
    const washingtonRef = doc(db, "todo", "1");

    async function update2(todo: any) {
        await updateDoc(washingtonRef, {
            title: todo.title
        });
    }

    //https://firebase.google.com/docs/firestore/manage-data/add-data?hl=jaより引用
    async function update3(todo: any) {
        await setDoc(doc(db, "todo", "1"), {
            id: editId,
            title: editTitle || null,
        });
    }

    //https://firebase.google.com/docs/firestore/manage-data/add-data?hl=jaより引用
    function update4() {
        const todoRef = doc(db, "todo", '{id: editId}');
        setDoc(todoRef, { id: editId, title: editTitle }, { merge: true });
    }

    //https://zenn.dev/joo_hashi/articles/9bd0ba530d9ee9より
    function update5() {
        updateDoc(
            doc(getFirestore(), "todo", docRef.id),
            { title: editTitle },
        );
    }

    //https://qiita.com/nakapon9517/items/16559ebb211da256e0ab
    async function update6() {
        const snapshot = await getDoc(doc(db, 'todo', '3AgQ3NHGLLxRuQoAiV9Y'));
        snapshot.exists() && console.log(snapshot.id);
    }

    update6()

    //丸々は失敗
    const formchange = () => {
        e => setEditTitle
            (e.target.value)
    }

    //関数化しとかないと、値を指定できないと思われるので用意する
    const handleEditFormChange = (e: any) => {
        setNewTitle(e.target.value)
    }

    //すぐコンパイルエラーになったので中止
    // const getPosts = () => {
    //     //空の配列postsを準備します
    //     let posts: any[] = []
    //     //firebaseお決まりのメソッドでコレクションからデータを取ってきます
    //     //ここでのポイントは「doc()がいらないこと」です
    //     db.collection('posts').get()
    //         //getしたデータに対し、
    //         .then(snapshot => {
    //             //docsプロパティ(※)を指定しforEachで各データを取り出します。
    //             snapshot.docs.forEach(doc => {
    //                 const data = doc.data()
    //                 //準備しておいた配列に取り出したデータをpushします
    //                 posts.push({
    //                     authorName: data.authorName,
    //                     content: data.content,
    //                     createdAt: data.createdAt,
    //                     title: data.title,
    //                     id: doc.id
    //                 })
    //             })
    //             //ここはhooksなので気にしなくてOK
    //             setCurrentPost(posts)
    //         })
    // }



    return (

        <div>
            <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle
                    (e.target.value)
                }
            />

            <h1>{router.query.id}</h1>
            <p>{`タスク名: ${router.query.title}`}</p>
            <p>{`編集反映確認: ${editTitle}`}</p>
            <EditForm save={update5} edittitle={editTitle} editform={setEditTitle}></EditForm>
        </div>
    );
}