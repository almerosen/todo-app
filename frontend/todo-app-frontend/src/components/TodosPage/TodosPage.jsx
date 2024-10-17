import { useEffect, useState } from "react"
import "./TodosPage.css"
import { AddTodoComponent } from "../AddTodoComponent/AddTodoComponent"
import { TodoComponent } from "../TodoComponent/TodoComponent"

export const TodosPage = () => {
    const [todos, setTodos] = useState([])

    const fetchTodos = async () => {
        const response = await fetch("http://localhost:3000/todos")
        const data =  await response.json()
        setTodos(data)
        console.log("data recieved:", data)
    } 

    useEffect(() => {
        fetchTodos()
    }, [])

    
    const todoComponents = todos.map((todo) => {
        return <TodoComponent 
            task={todo.todo} 
            completed={todo.completed} 
            key={todo.id} 
            id={todo.id} 
            fetchTodos={fetchTodos}
        />
    })

    return (
        <div className="todosPage-container">
            <header className="todos-header">
                <h2 className="header-title">Aha</h2>
            </header>

            <main style={{padding: "20px"}}>
                <ul className="todos-list">
                    { todoComponents }
                </ul>
            </main>

            <footer className="todosPage__footer">
                <AddTodoComponent fetchTodos={fetchTodos}/>
            </footer>

        </div>
    )
}