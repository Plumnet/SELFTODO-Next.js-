// import { useState } from "react"

// export default function Edit() {
//     const [newTitle, setNewTitle] = useState('')
//     const [todos, setTodos] = useState([
//         { id: 1, title: '買い物に行く', status: 'done' },
//         { id: 2, title: '子どものお迎え', status: 'notStarted' },
//         { id: 3, title: '企画書の提出', status: 'inProgress' }
//       ])
//       const [editId, setEditId] = useState('')

//     const handleEditFormChange = (e) => {
//         setNewTitle(e.target.value)
//       }

//     const handleEditTodo = () => {
//     const newArray = todos.map((todo) =>
//         todo.id === editId ? { ...todo, title: newTitle } : todo
//     )
//     setTodos(newArray)
//     setNewTitle('')
//     setEditId()
//     handleCloseEditForm()
//     }

//     const handleCloseEditForm = () => {
//         setIsEditable(false)
//         setEditId('')
//       }

    

//     <div>
//     <input
//       type="text"
//       label="新しいタイトル"
//       value={newTitle}
//       onChange={handleEditFormChange}
//     />
//     <button onClick={handleEditTodo}>編集を保存</button>
//     <button onClick={handleCloseEditForm}>キャンセル</button>
//   </div>

//     return (
//         <>
//             {/* 実際にコンポーネントを使うための記述 */}
//             <Header title="About"/>
//         </>
//     )
// }