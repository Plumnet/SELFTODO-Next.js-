import db from "@/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Syousai() {
    const router = useRouter();
    console.log(router)

    // const docRef = doc(db, 'todo', 1 ?? "")

    async function todo() {
        const tasks = await getDocs(collection(db, "todo")).then((snapshot) =>
            snapshot.docs.map((doc) => {
                return { docId: doc.id, ...doc.data() };

            })
        );

        console.log('詳細', tasks)
        console.log('詳細id', tasks.find(task => task.docId === router.query.id))
    }

    useEffect(() => {
        todo()

    }, []);


    return (
        <div>
            <h1>{router.query.id}</h1>
            {/* <p>{`タスク名: ${router.query.title}`}</p> */}
        </div>
    );
}