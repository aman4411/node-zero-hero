const events = require('events')

var eventEmitter = new events.EventEmitter()

eventEmitter.on("click", function(){
    console.log('Did you invoke click event ?')
})

eventEmitter.emit("click")

eventEmitter.on("firstEvent", function(data){
    console.log("First Event : " + data)
})

eventEmitter.emit("firstEvent", "Fired")