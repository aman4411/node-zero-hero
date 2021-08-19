const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (request, response) => {
    response.send("This is default end point")
})

app.get("/student", (request, response) => {
    response.json(
        [
            {name: "Scott", city: "Boston"},
            {name: "Adam", city: "Colson"},
            {name: "Tuan", city: "Bui"}
        ]
    )
})

app.post("/student", (req, res) => {
    const body = req.body
    res.json(body)
})

const PORT = 4321

app.listen(PORT, ()=>{
    console.log(`Server listening at PORT ${PORT}`)
})