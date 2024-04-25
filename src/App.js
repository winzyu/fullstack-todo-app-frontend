import { useEffect, useState } from "react";
import Todo from "./components/todo";
import { addTodo, updateTodo, deleteTodo, getAllTodo } from "./utils/HandleApi";

function App() {

  const [todo, setTodo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [todoId, setTodoId] = useState("")

  useEffect(() => {
    getAllTodo(setTodo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setTodoId(_id)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
           
          <input 
          type="text" 
          placeholder="Add Todos..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          
          <div className="add" onClick={
             isUpdating ? 
            () => updateTodo(todoId, text, setTodo, setText, setIsUpdating) :
            () => addTodo(text, setText, setTodo)}>
            {isUpdating ? "Update": "Add"}
          </div>
          
        </div>
        
        <div className="list">

          {todo.map((item) => <Todo 
          key={item._id} 
          text={item.text}
          updateMode = {() => updateMode(item._id, item.text)}
          deleteTodo = {() => deleteTodo(item._id, setTodo)}
          />)}

        </div>

      </div> 
    </div>
  );
}

export default App;
