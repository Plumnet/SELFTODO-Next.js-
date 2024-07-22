import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Edit() {
    const router = useRouter();
    console.log(router)

    const [editTitle, setEditTitle] = useState<string | string[] | undefined>('TEST')

    useEffect(() => {
        setEditTitle(router.query.title)
    }, [])


    return (

        <div>
            <input
                type="text"
                value={editTitle}
            // onChange={e => setEditTitle
            //     (e.target.value)
            // }
            />
            <h1>{router.query.id}</h1>
            <p>{`タスク名: ${router.query.title}`}</p>
        </div>
    );
}