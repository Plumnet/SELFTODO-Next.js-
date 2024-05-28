import React from 'react'

function Delete({ handleDelete, todo }: any) {




    return (
        <button onClick={() => handleDelete(todo)}>削除</button>
    )
}

export default Delete