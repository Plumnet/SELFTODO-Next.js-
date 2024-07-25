import EditForm from "@/pages/components/EditForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Edit() {
    const router = useRouter();
    console.log(router)

    const [editTitle, setEditTitle] = useState<string | string[] | undefined>('TEST')

    useEffect(() => {
        setEditTitle(router.query.title)
    }, [router])

    type Todo = {
        id: number;
        title: string;
    };
    const [todos, setTodos] = useState<Todo[]>([])
    const [editId, setEditId] = useState('')

    const handleEditTodo = () => {

        // 問題2. 編集内容をTodoリストの配列に加えよう
        //ここまで
        const newArray = todos.map((todo: any) =>
            todo.id === editId ? { ...todo, title: editTitle } : todo
        )
        // console.log(todos.id)
        setTodos(newArray)
        setEditId('')
        // 問題3. Todoリストの更新後にstateを初期化しよう
        setEditTitle('')
        // handleCloseEditForm()
        // ここまで
    }

    //丸々は失敗
    const formchange = () => {
        e => setEditTitle
            (e.target.value)
    }


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

            <EditForm save={handleEditTodo} edittitle={editTitle} editform={setEditTitle}></EditForm>
        </div>
    );
}