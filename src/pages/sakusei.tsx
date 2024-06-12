import React, { useState } from 'react'
import Create from './components/Create'
import { Link } from 'react-router-dom';

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

    return (
        <div>
            TEST
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
    )
}
