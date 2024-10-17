import "./AddTodoComponent.css"
import addImage from "../../assets/add.svg"

export const AddTodoComponent = ({ fetchTodos }) => {

    let todo = {
        todo: ""
    }

    const handleInput = (event) => {
        todo.todo = event.target.value
    }


    const addTodo = async () => {
        console.log("submit todo:", todo)

        const response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        })
        const data = await response.json()
        console.log(data)
        fetchTodos()
    }

    return (
        <div className="addTodo-container">
            <input 
                type="text"
                className="inputfield"
                onChange={handleInput}
                placeholder="Add a new todo"
            />
            <button onClick={ addTodo }>
                <img src={addImage} alt="Add Todo" />
            </button>
        </div>
    )
}