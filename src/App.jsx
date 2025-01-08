import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';

// import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)


const toogleFinished=(e)=>{
 setshowFinished(!showFinished)
}

 useEffect(() => {
   let todoString=localStorage.getItem("todos")
   if (todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
   }
  }, [])
  

const saveToLs=(params)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

  // input box
 const handleChange=(e)=>{
 setTodo(e.target.value)
 } 

//  here the delete functon take for deleteing pervous saved todo and to save new todo instaed of that todo
const hanleEdit=(e,id)=>{
let t=todos.filter(i=>i.id === id)
setTodo(t[0].todo)
let newTodos=todos.filter(item=>{
  return item.id!==id
  
});
setTodos(newTodos)
// function to save the todo
saveToLs()
}

// for delete button 
const handleDelte=(e,id)=>{
  confirm("are you sure");
let newTodos=todos.filter(item=>{
return item.id!==id
  
});
setTodos(newTodos)
// function to save todo
saveToLs()
}


const handleAdd=()=>{
 setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
 setTodo("")
 saveToLs()
//  console.log(todos)
}
// following function is used to check wheather todo is completed or not it can make completed todo uncomple and uncomplete todo complete
const handleCheckbox=(e)=>{
let id=e.target.name;
// console.log(id);
let index=todos.findIndex(item=>{
  return item.id ===id;
  })
// let newTodos=todos; for making new array each time redendering is important so for that following syntax will be use
let newTodos=[...todos];
newTodos[index].isCompleted=!newTodos[index].isCompleted;
setTodos(newTodos)
saveToLs()
// console.log(newTodos,todos)
// console.log(index);
}
  return (
    <>
    <Navbar/>
    <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-2xl'>iTask manege your Todo at one place</h1>
     <div className="addTodo my-5 flex flex-col gap-4">
      <h2 className='text-lg font-bold my-5 text-center'>Add a Todo</h2>
      <div className="flex">
      <input onChange={handleChange} value={todo} type='text' className='w-full rounded-lg px-5 py-1'/>
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 mx-2  text-sm font-bold text-white rounded-md cursor-pointer disabled:bg-violet-400'>save</button>
    </div></div>
    {/* in checkbos we dont write value we write checked */}
    <input className='my-4 show'  onChange={toogleFinished} type="checkbox" checked={showFinished} /> 
     <label className='mx-2' htmlFor="show">Show Finished</label> 
      <div className='h-[1px] bg-black opacity-15 w-3/4 mx-auto'></div>
     <h2 className='text-lg font-bold'>Your Todos</h2>
     <div className="todos">
      {todos.length===0 && <div className='m-5'>No Todos to display</div>}
      {todos.map(item=>{
        return (showFinished || !item.isCompleted) &&<div key={item.id} className={"todo flex w-full justify-between my-3"}>
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}id="" />
       <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
       </div>
       <div className="buttons flex h-full">
       <button onClick={(e)=>{hanleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
      <button onClick={(e)=>{handleDelte(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
       </div>
      </div>
       })}
     </div>
    </div>
     </>
  )
}

export default App
