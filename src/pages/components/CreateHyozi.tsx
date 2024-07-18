import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function CreateHyozi({ map }: any) {
    //Stateにはオブジェクトの型を指定
    const [todos, setTodos] = useState<Todo[]>([])

    //オブジェクトの各要素の型指定
    type Todo = {
        id: number;
        title: string;
    };


    return (
        <div>
            <Box m={8}>
                <ul>
                    {todos.map((todo: any) => (
                        < li key={todo.id} >
                            {/* インライン要素で表示する */}
                            <span>{todo.title}</span>
                        </li>
                    ))}
                </ul>
            </Box>
        </div>
    )
}
