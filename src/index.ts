import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";

//invoke express
const app = express();

app.use(bodyParser.json());


//start server
app.listen(8080, () => {
    console.log("Server start 8080");
});

interface user {
    username: string,
    fname: string,
    lname: string,
    email: string,
    password: string,

}

let users: user[] = [];

mongoose.connect("mongodb://localhost/blog1");
const db = mongoose.connection

db.on('error', (error) => {
    console.log("DB connection Error", error);

})
db.on('open', ()=>{
    console.log("DB connection Successfully");
})

//get all users
app.get('/user/all', (req: express.Request, res: express.Response) => {

    let data = {
        id: "01234",
        username: "thami",
        fName: "thamindu",
        lName: "ranawaka",
        email: "thamindu@gmail.com"

    }

    res.send(users);
})

//save user
app.post('/user', (req: express.Request, res: express.Response) => {
    const request_body: any = req.body;
    // console.log(request_body);

    users.push(request_body);

    res.send("Ok");
});