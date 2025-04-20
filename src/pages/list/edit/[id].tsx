import db from "@/firebase";
import EditForm from "@/pages/components/EditForm";
import { doc, updateDoc } from "firebase/firestore";
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

    const [editId, setEditId] = useState<string | string[] | undefined>('')
    console.log('id', editId)

    //https://qiita.com/nakapon9517/items/16559ebb211da256e0ab
    async function update() {
        console.log('idとタイトル', editId, editTitle)
        await updateDoc(doc(db, 'todo', editId as string), { title: editTitle });
    }
    router.push('/')
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
            <EditForm save={update} edittitle={editTitle} editform={setEditTitle}></EditForm>
        </div>
    );
}