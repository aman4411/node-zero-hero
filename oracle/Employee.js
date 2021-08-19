const express = require("express")
const app = express()
const router = express.Router();
const oracledb = require('oracledb');
const cors = require('cors');
const { json } = require("express");

const dbConfig = {
    user: "hr",
    password: "hr",
    connectString: ""
}

app.use(cors())
// ! To get the posted data add below two lines
app.use(express.json())
app.use(express.urlencoded({extended: true}))

router.get("/", (req, res)=>{
    res.json({message: 'Welcome to Employee API'})
})

// * Get All Employees 
router.get("/employees", (req, res) => {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection(dbConfig,async function(err,connection){
        if(err){
            console.log(`Oracle DB Connect Error : ` +err);
        }
        
        const result = await connection.execute(`Select * from emp`);
        console.log(result);
        res.json(result.rows);
    })
})

// * Get Single Employee
router.get("/employees/:id",(req,res) => {
    const employeeId = req.params.id;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection(dbConfig,async function(err,connection){
        if(err){
            console.log(`Oracle DB Connect Error : ` +err);
        }
        
        const result = await connection.execute(`Select * from emp where ID = ${employeeId}`);
        res.json(result.rows);
    })
})

app.use("/api", router)

const PORT = 5001

app.listen(PORT, () =>{
    console.log(`Server listening at PORT ${PORT}` )
})
