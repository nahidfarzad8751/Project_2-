console.log("starting first visualization")
d3.json("/db").then(data => {
    console.log(data)
})




// fetch("localhost:5000/db")
// .then(res=>res.json())
// .then(data=>console.log(data))