const express = require("express")
const app = express()
const router = express.Router();
const sql = require('mssql')
const cors = require('cors')

const dbConfig = {
    user: 'sa',
    password: 'user@123',
    database: 'StudentDB',
    server: 'LAPTOP-GQVH23CD',
    options: {
        trustServerCertificate: true
      }
}

app.use(cors())

// ? To get the posted data add below two lines
app.use(express.json())
app.use(express.urlencoded({extended: true}))

router.get("/", (req, res)=>{
    res.json({message: 'Welcome to Student API'})
})

router.get("/student", (request, response) => {
    sql.connect(dbConfig, (error) =>{
        if(error){
            console.log(error)
        }

        // ? Create a Request Object
        const request = new sql.Request();

        const selectQuery = "Select * from Student"

        request.query(selectQuery ,(err, data) =>{
            if(err){
                console.log(err)
            }
            response.json(data.recordset)
        })
    })
})

router.get("/student/:id", (request, response) => {
    const studentId = request.params.id

    sql.connect(dbConfig, (error) =>{
        if(error){
            console.log(error)
        }

        // ? Create a Request Object
        const request = new sql.Request();

        const selectQuery = `Select * from Student WHERE Id=${studentId}`

        request.query(selectQuery ,(err, data) =>{
            if(err){
                console.log(err)
            }
            response.json(data.recordset)
        })
    })
})

router.post("/student", (req, res) => {

    const body = req.body
    let {Name, Email, City} = body

    sql.connect(dbConfig, (error) =>{
        if(error){
            console.log(error)
        }

        // ? Create a Request Object
        const request = new sql.Request();
        
        const insertQuery = `INSERT INTO Student (Name, Email, City) VALUES ('${Name}', '${Email}', '${City}')`

        request.query(insertQuery ,(err, data) =>{
            if(err){
                console.log(err)
            }
            res.json(data)
        })
    })
})

router.put("/student/:id", (req, res) => {

    const body = req.body
    const studentId = req.params.id
    let {Name, Email, City} = body

    sql.connect(dbConfig, (error) =>{
        if(error){
            console.log(error)
        }

        // ? Create a Request Object
        const request = new sql.Request();
        
        const updateQuery = `Update Student SET Name='${Name}', Email='${Email}', City='${City}' WHERE Id=${studentId}`
        console.log(`updateQuery : ${updateQuery}`)

        request.query(updateQuery ,(err, data) =>{
            if(err){
                console.log(err)
            }
            res.json(data)
        })
    })
})

router.delete("/student/:id", (req, res) => {

    const studentId = req.params.id

    sql.connect(dbConfig, (error) =>{
        if(error){
            console.log(error)
        }

        // ? Create a Request Object
        const request = new sql.Request();
        
        const deleteQuery = `DELETE FROM Student WHERE Id=${studentId}`

        request.query(deleteQuery ,(err, data) =>{
            if(err){
                console.log(err)
            }
            res.json(data)
        })
    })
})


app.use("/api", router)

const PORT = 5001

app.listen(PORT, () =>{
    console.log(`Server listening at PORT ${PORT}` )
})

