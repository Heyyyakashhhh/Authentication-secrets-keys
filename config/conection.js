//connect mognoose here
const mognoose = require('mongoose');
mognoose.connect("mongodb://127.0.0.1:27017/userDB")
const db = mognoose.connection;

db.once("error" , (err) =>{
    console.log("error in conncectionn mongoose " , err)
})
db.on("open" ,()=>{
    console.log("mongodb connected")
})