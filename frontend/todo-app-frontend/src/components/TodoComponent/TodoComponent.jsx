import "./TodoComponent.css"
import removeImage from "../../assets/remove.svg"
import { useState } from "react"

export const TodoComponent = ({ id, task, completed, fetchTodos }) => {
 
    const [isChecked, setIsChecked] = useState(completed)

    const handleCheckBox = () => {
        setIsChecked(!isChecked)
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE"
            })
            const data = await response.json()
            console.log(data)
            fetchTodos()
            
        } catch (error) {
            console.error("Error deleting todo", error)
        }
    }



    return (
        <li className="todo-item">
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckBox}
                />
                <p className={isChecked ? "done": ""}>{task}</p>
            </div>
            <img src={removeImage} 
                alt="remove image" 
                className="remove-image" 
                onClick={() => deleteTodo(id)}/>
        </li>
    )
}