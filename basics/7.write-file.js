const fs = require('fs')

// fs.writeFile("text.txt", "Hello World", function(err){
//     if(err){
//         throw err;
//     } else {
//         console.log('Write Operation is completed')
//     }
// })

fs.appendFile("text.txt", "\n Hello Again", function(err){
    if(err){
        throw err;
    } else {
        console.log('Write Operation is completed')
    }
})