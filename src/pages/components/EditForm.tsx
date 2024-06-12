import React from 'react'

export default function EditForm({ save, close, edittitle, editform }: any) {
    return (
        <div>
            <input
                type="text"
                // label="新しいタイトル"
                value={edittitle}
                onChange={editform}
            />
            {/* 問題1. 編集ボタンを押すと関数が実行されるようにしよう*/}
            <button onClick={save}>編集を保存2</button>
            {/* ここまで */}
            <button onClick={close}>キャンセル</button>
        </div>
    )
}
