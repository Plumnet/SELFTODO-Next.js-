import React, { useState } from 'react'
import Create from './components/Create'
import { Link } from 'react-router-dom';
import { Box, ChakraProvider, Text } from '@chakra-ui/react';

export default function sakusei() {
    type Todo = {
        id: number;
        title: string;
    };
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoId, setTodoId] = useState(todos.length + 1);
    const [todoTitle, setTodoTitle] = useState("");

    const handleAddTodo = () => {
        //
        setTodos([...todos, { id: todoId, title: todoTitle }]);
        //
        setTodoId(todoId + 1);
        //
        setTodoTitle("");
        console.log(todoTitle)
    };

    const handleAddFormChanges = (e: any) => {
        setTodoTitle(e.target.value);
    };

    const innerBoxStyles = {
        p: '5',
        backgroundImage:
            'url(http://rynona.sakura.ne.jp/sblo_files/rygames/image/Ws001282_-thumbnail2.png) ',
    }

    return (
        <ChakraProvider>
            <div>
                <Box sx={innerBoxStyles}>
                    <Text fontSize={32} color='Yellow' textAlign={['left']}>
                        作成画面
                    </Text>
                </Box>
                <Create add={handleAddTodo} title={todoTitle} addform={handleAddFormChanges} />
                {/* {todos.map((todo) => (
                <p>
                    <Link
                        href={{
                            pathname: `/list/${todo.id}`,
                            query: {
                                id: todo.id,
                                title: todo.title,
                            },
                        }}
                    >
                        {todo.title}
                    </Link>
                </p>
            ))} */}
            </div>
        </ChakraProvider>
    )
}
