import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../context/AuthContext'

const Header = () => {
    // 現在ログインしているユーザーを取得する
    const { currentUser } = useAuth();

    return (
        <div style={{ padding: "1rem 0" }} >
            {currentUser ? (
                // suppressHydrationWarningを入れてサーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーがでないようにする
                <div suppressHydrationWarning={true}>
                    <div style={{ paddingBottom: "1rem" }}>※ここにログインしているユーザーのメールアドレス※ でログインしています。</div>
                </div>
            ) : (
                <div suppressHydrationWarning={true}>ログインしていません。</div>
            )}
        </div>
    );
}

export default Header;
