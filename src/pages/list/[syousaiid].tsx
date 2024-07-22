import { useRouter } from "next/router";

export default function Syousai() {
    const router = useRouter();
    console.log(router)
    return (
        <div>
            <h1>{router.query.id}</h1>
            <p>{`タスク名: ${router.query.title}`}</p>
        </div>
    );
}