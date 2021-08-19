// ? Call Back Function
// * Passing a function to another function as a parameter is called a callback function

function Sample(param){
    console.log(param)
    return param('Uma')
}


console.log(Sample(
    function(name){
        return name}
    ))