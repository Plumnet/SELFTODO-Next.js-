import React from 'react'

export default function Edit({ OpenEditForm, todo, save, close, edittitle, editform }: any) {
    return (
        <div>
            <button onClick={() => OpenEditForm(todo)}>編集2</button>

        </div>
    )
}
