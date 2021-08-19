const fs  = require('fs')

// ? Asynchronous way of accessing file data

console.log("First Line of code - Async")
fs.readFile("textfile.txt", function(err, data){
    if(err){
      throw err;  
    }
    console.log(data.toString())
})
console.log("Third Line of code -Async")

// ? Synchronous way of accessing file data

console.log("First Line of code - Sync")
console.log(fs.readFileSync("textfile.txt", "UTF-8"))
console.log("Third Line of code - Sync")


