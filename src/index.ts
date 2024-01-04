import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserModel from "./models/user.model";
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
db.on('open', () => {
    console.log("DB connection Successfully");
})

//get all users
app.get('/user/all', async (req: express.Request, res: express.Response) => {

    try {
        let users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(100).send("Error");
    }

});

//save user
app.post('/user', async (req: express.Request, res: express.Response) => {

    try {
        const request_body: any = req.body;

        const userModel = new UserModel({
            username: request_body.username,
            fname: request_body.fname,
            lname: request_body.lname,
            email: request_body.email,
            password: request_body.password
        });

        await userModel.save();
        res.status(200).send("User created Success...!");

    } catch (error) {
        res.status(100).send("Error");

    }

});