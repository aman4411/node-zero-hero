var fs = require('fs')

fs.unlink("text.txt", function(){
    console.log('Delete Operations is completed')
})