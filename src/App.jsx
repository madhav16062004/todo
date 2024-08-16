import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, SetshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
      console.log(todos)
    }
    
  
    
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  
   
  }, [todos])
  
  

  const saveToLS =  (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
    
  }
  

  const toggleFinished =  () => {
    SetshowFinished(!showFinished)
    
  }

  const handleEdit = (e,id) => {
    let t= todos.filter(i=> i.id ===id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
    
    
  }

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)

    saveToLS()
    
  }

  const handleAdd = () => {
    setTodos([...todos,{id: uuidv4(), todo , isCompleted : false}])

    saveToLS()
    setTodo("")
   
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    
  }

  const handleCheckbox =  (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
    
  }

  

  return (
    <>
      <Navbar />
      <div className='container mx-auto w-[60vw] my-5 rounded-xl bg-slate-200 min-h-[80vh] p-5'>
        <h1 className=' font-bold text-3xl  my-2 mx-3'>DoTask - Simple Todo Manager</h1>
        <div className="addTodo mx-3">
          <h2 className=' text-xl font-bold '>Add a Todo</h2>
          <input type="text" className=' w-[85%] rounded-xl px-4' value={todo} onChange={handleChange} />
          <button onClick={handleAdd} disabled={todo.length<=3} className=' bg-slate-700 rounded-xl hover:bg-slate-950 disabled:bg-slate-400 p-2 py-1 text-sm font-bold text-white  mx-6 '>Add</button>
        </div>
        <input type="checkbox" name="show finished" checked={showFinished} onChange={toggleFinished} id="" className=' my-3'/> Show Finished
        <h2 className=' text-lg font-bold mx-4 mt-3'>Your Todos</h2>
        <div className="todos mx-4 ">
          {todos.length === 0 && <div>No todos to display</div>}
           {todos.map(item=>{
          return (showFinished || !item.isCompleted ) && <div key={item.id} className="todo flex w-[90%] my-4 justify-between">
            <div className="flex gap-5">
            <input type="checkbox" name={item.id} onChange= {handleCheckbox} id="" value={item.isCompleted} checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className=' bg-slate-700 hover:bg-slate-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 '>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className=' bg-slate-700 hover:bg-slate-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 '>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
