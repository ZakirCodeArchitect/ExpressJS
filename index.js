const express = require("express")
const app = express();

const port = 3001;

app.get("/", (req, res) => {
    // res.send("Server Running")  // normal format
    res.json({ mesaage: "Home Page" }) // JSON Format
})

// Setting up routing
app.get("/users", (req, res) => {
    res.json({ mesaage: "Get all the Users" })
})

app.get("/users/:id", (req, res) => {
    res.json({ mesaage: `Get User with ID: ${req.params.id}` })
})

app.post("/users/", (req, res) => {
    res.json({ mesaage: `Create new user` })
})

app.put("/users/:id", (req, res) => {
    res.json({ mesaage: `Update User with ID: ${req.params.id}` })
})

app.delete("/users/:id", (req, res) => {
    res.json({ mesaage: `Delete  User with ID: ${req.params.id}` })
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})