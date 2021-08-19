var log = {
    name: "Uma",
    city: "Hyderabad",
    info : function(info){
        console.log(`Info : ${info}`)
    },
    warn : function(warn){
        console.log(`Warn : ${warn}`)
    },
    error : function(error){
        console.log(`Error : ${error}`)
    }
}

var data = [
    {id: 1, name: 'Scott'},
    {id: 2, name: 'Adam'},
    {id: 3, name: 'Tuan'},
    {id: 4, name: 'Uma'},
]

// module.exports = "Hello World"
module.exports = {log: log, data: data}