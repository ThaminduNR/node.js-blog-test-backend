import express from 'express';

//invoke express
const app = express();
//start server
app.listen(8080,()=>{
    console.log("Server start 8080");
});