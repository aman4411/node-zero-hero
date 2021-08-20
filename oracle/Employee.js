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

// ? Automatically commits db transactions...
oracledb.autoCommit = true;

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

// * CREATE Employee
router.post("/employees", (req,res) => {
    let{NAME,EMAIL,SALARY} = req.body;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection(dbConfig,async function(err,connection){
        if(err){
            console.log(`Oracle DB Connect Error : ` +err);
        }
        
        const postQuery = `Insert into emp(name,email,salary) values(:1, :2, :3)`;
        binds = [`${NAME}`, `${EMAIL}`, `${SALARY}` ];
        const result = await connection.execute(postQuery, binds, {});
        res.json(result.rows);
        console.log("Number of Rows Inserted : " + result.rowsAffected);
        await connection.close();
    })
})

// * UPDATE existing employee
router.put("/employees/:id", (req,res) => {
    const employeeId = req.params.id;
    let{NAME,EMAIL,SALARY} = req.body;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection(dbConfig,async function(err,connection){
        if(err){
            console.log(`Oracle DB Connect Error : ` +err);
        }
        
        const updateQuery = `Update emp set name=:1,email=:2,salary=:3 where id=:4`;
        binds = [`${NAME}`, `${EMAIL}`, `${SALARY}`, `${employeeId}` ];
        const result = await connection.execute(updateQuery, binds, {});
        res.json(result.rows);
        console.log("Number of Rows Inserted : " + result.rowsAffected);
        await connection.close();
    })
})

// * DELETE existing employee
router.delete("/employees/:id", (req,res) => {
    const employeeId = req.params.id;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection(dbConfig,async function(err,connection){
        if(err){
            console.log(`Oracle DB Connect Error : ` +err);
        }
        
        const updateQuery = `Delete from emp where id=:1`;
        binds = [`${employeeId}` ];
        const result = await connection.execute(updateQuery, binds, {});
        res.json(result.rows);
        console.log("Number of Rows Inserted : " + result.rowsAffected);
        await connection.close();
    })
})

app.use("/api", router)

const PORT = 5001

app.listen(PORT, () =>{
    console.log(`Server listening at PORT ${PORT}` )
})
