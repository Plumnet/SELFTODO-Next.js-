// import { useEffect, useState } from "react"

// export default function Filter() {
// const [filteredTodos, setFilteredTodos] = useState([])
// const [todos, setTodos] = useState([
//     { id: 1, title: '買い物に行く', status: 'done' },
//     { id: 2, title: '子どものお迎え', status: 'notStarted' },
//     { id: 3, title: '企画書の提出', status: 'inProgress' }
//   ])
// const [filter, setFilter] = useState('notStarted')

// useEffect(() => {
//     const filteringTodos = () => {
//       switch (filter) {
//         case 'notStarted':
//           setFilteredTodos(todos.filter((todo): => todo.status === 'notStarted'))
//           break
//         // 問題1. 絞り込みの処理を書こう
//         case 'inProgress':
//           setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
//           break
//         case 'done':
//           setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
//           break
//         // ここまで
//         default:
//           setFilteredTodos(todos)
//       }
//     }
//     // 問題2. filteringTodosを呼び出そう
//     filteringTodos()
//     // ここまで
//   }, [filter, todos])



// return (
//     <>
//             <div>
//           <input
//             type="text"
//             label="タイトル"
//             value={todoTitle}
//             onChange={handleAddFormChanges}
//           />
//           <button onClick={handleAddTodo}>作成</button>
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <option value="all">すべて</option>
//             <option value="notStarted">未着手</option>
//             <option value="inProgress">作業中</option>
//             <option value="done">完了</option>
//           </select>
//         </div>
// <ul>
// {/* 問題3. 絞り込んだtodoを一覧に渡そう*/}
// {filteredTodos.map((todo) => (
//   <li key={todo.id}>
//     <span>{todo.title}</span>
//     <select
//       value={todo.status}
//       onChange={(e) => handleStatusChange(todo, e)}
//     >
//       <option value="notStarted">未着手</option>
//       <option value="inProgress">作業中</option>
//       <option value="done">完了</option>
//     </select>
//     <button onClick={() => handleOpenEditForm(todo)}>編集</button>
//     <button onClick={() => handleDeleteTodo(todo)}>削除</button>
//   </li>
// ))}
// {/* ここまで */}
// </ul>
// </>
// )
