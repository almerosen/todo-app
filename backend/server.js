const express = require("express")
const cors = require("cors")
const db = require("../database/db")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

function insertTodo(todo, completed) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO todos (todo, completed) VALUES (?, ?)`,
            [todo, completed],
            (error) => {
                if (error) {
                    console.log("Error inserting todo", error.message)
                    reject(error.message)
                } else {
                    console.log("Todo inserted")
                    resolve()
                }
            }
        )
    })
} 

function getTodos() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM todos`, (error, rows) => {
            if (error) reject(error.message)

            resolve(rows)
        })
    })
}

function deleteTodo(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM todos WHERE id = ?`,
            [id],
            function(error) {
                if(error) {
                    console.log("Error deleting todo", error.message)
                    reject(error.message)
                } else {
                    console.log("Todo deleted")
                    resolve()
                }
            }
        )
    })
}

// function updateTodo() {
//     return new Promise((resolve, reject) => {
//         db.run(`UPDATE todos SET completed = ? WHERE id = ?`,
//             [completed, id],
//             function(error) {
//                 if (error) {
//                     reject(error.message)
//                 } else {
//                     resolve()
//                 }
//             }
//         )
//     })
// }

// Get all todos
app.get("/todos", async (req, res) => {
    const todos = await getTodos()

    res.json(todos)
})

// Create new todo
app.post("/todos", async (req, res) => {
    console.log("POST req from frontend", req.body)
    try {
        const { todo } = req.body 

        await insertTodo(todo, false)
    
        res.json({ success: true, message: "Todo inserted" })
    } catch (error) {
        console.error("error:", error)
        res.status(500).json({ error: "Failed to add todo" })
    }
})

app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params
    console.log("recieved id to delete:", id)

    try {
        await deleteTodo(id)

        res.json({ success: true, message: "Todo deleted" })
    } catch (error) {
        console.error("error:", error)
        res.status(500).json({ message: "Failed to delete todo" })
    }
})

// // Update todo 
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params
//         const { completed } = req.body

//         await updateTodo(completed, id)

//         res.json({ success: true, message: "Todo updated" })
//     } catch (error) {
//         console.error("error:", error)
//         res.status(500).json({ message: "Failed to update todo" })
//     }
// })



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

