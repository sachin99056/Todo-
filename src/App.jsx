import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
const [todo,setTodo]=useState("")  
const[todos,setTodos]=useState([])
const[showFinished,setShowFinished]=useState(false)

useEffect(()=>{
 let todos=JSON.parse(localStorage.getItem("todos"))
 if(todos){
  setTodos(todos)
 }
},[])

const saveToLs=(parems)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

const toggleFinish=(e)=>{
 setShowFinished(!showFinished)
}


  const handleAdd=()=>{
   setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
   setTodo("")
   saveToLs()
  }

  const handleEdit=(e,id)=>{
   let t= todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
  let newTodos=todos.filter(item=>{
  return item.id!==id;
 } )
 setTodos(newTodos) 
 saveToLs()
  }

  const handleDelete=(e,id)=>{
 let newTodos=todos.filter(item=>{
  return item.id!==id;
 } )
 setTodos(newTodos)  
 saveToLs()
  }

 const handleChange=(e)=>{
  setTodo(e.target.value)
 }

 const handleCheckbox=(e)=>{
 let id= e.target.name;
 let index=todos.findIndex(item=>{
  return item.id===id;
  saveToLs()
 })

 let newTodos=[...todos];
 newTodos[index].isCompleted=!newTodos[index].isCompleted;
 setTodos(newTodos)
 }

  return  (
    <>
    <Navbar />
     <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
      <h1 className='font-bold text-center text-xl'>iTask - manae your todos at one place</h1>
      <div className="addTodo my-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold">Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" placeholder='Add a todo' className='border-2 border-gray-300 rounded-md w-full rounded-lg px-5 py-1' />
        <button onClick={handleAdd} disabled={todo.length<=4} className='bg-violet-800 hover:bg-violet-900 
         disabled: bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md '>
          Save</button>
      </div>
      <input onChange={toggleFinish} type="checkbox" checked={setShowFinished}/>show Finished
          <h2 className='text-2xl font-bold'>Your-todos</h2>
          <div className="todo">
            {todos.length===0 && <div className='text-center my-5'>No todos found</div>}
            {todos.map(item=>{
           return (showFinished || !item.isCompleted)&&<div key={item.id} className="todo flex my-3 justify-between">
            <input name={item.id}  checked={item.isCompleted} type="checkbox" 
               onChange={handleCheckbox} id="" />
              <div className={item.isCompleted?"":"line-through" }>
                {item.todo}
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><MdDelete /></button>
              </div>
            </div> 
            })}   
          </div>  
       
     </div>
    </>
  )
}

export default App
