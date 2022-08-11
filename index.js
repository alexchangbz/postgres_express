const express = require("express")
const app = express()
const { userModel, initialize_db, pool } = require('./db')

initialize_db(userModel)

app.get('/', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM users")
    res.json(allTodos.rows)
} catch (error) {
    console.log(error.message)
}
})

app.listen(5000, () =>  console.log("Listening to port 5000"))