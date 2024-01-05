import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserModel from "./models/user.model";
import CustomResponse from "./dtos/custom.response";
import ArticleModel from "./models/article.model";


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

//------------------------------------------------------Users--------------------------------------------------------------

//get all users
app.get('/user/all', async (req: express.Request, res: express.Response) => {

    try {
        let users = await UserModel.find();
        res.status(200).send(
            new CustomResponse(200, "Get All Users", users)
        );
    } catch (error) {
        res.status(100).send(
            new CustomResponse(100, "User load Failed")
        );
    }

});


//auth email and password

app.post('/user/auth', async (req: express.Request, res: express.Response) => {

    try {
        const request_body: any = req.body;

        let user = await UserModel.findOne({email: request_body.email});
        if (user) {
            if (user.password === request_body.password) {
                res.status(200).send(
                    new CustomResponse(200, "Access User", user)
                );
            } else {

                res.status(401).send(
                    new CustomResponse(401, "Invalid credential")
                );

            }


        } else {
            res.status(404).send(
                new CustomResponse(404, "User not found")
            );
        }


    } catch (error) {
        res.status(100).send(
            new CustomResponse(100, "User created Failed")
        );

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
        res.status(200).send(
            new CustomResponse(200, "User created Success")
        );

    } catch (error) {
        res.status(100).send(
            new CustomResponse(100, "User created Failed")
        );

    }

});


//------------------------------------------------------Article--------------------------------------------------------------

app.post('/article', async (req: express.Request, res: express.Response) => {

    try {
        const request_body: any = req.body;

        let articleModel = new ArticleModel({
            title: request_body.title,
            description: request_body.description,
            user: request_body.user
        })

        await articleModel.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "Article created Success")
            );
        }).catch(e => {
            res.status(100).send(
                new CustomResponse(100, "Something went wrong")
            );
        });


    } catch (error) {
        res.status(100).send(
            new CustomResponse(100, "Article created Failed")
        );

    }

});

app.get('/article/all', async (req: express.Request, res: express.Response) => {

    // console.log("Get All article");

      try {

          let req_query: any = req.query;
          let size:number = req_query.size;
          let page:number = req_query.page;


          let article = await ArticleModel.find().limit(size).skip(size * (page-1));
          res.status(200).send(
              new CustomResponse(200, "Get All Articles", article)
          );
      } catch (error) {
          res.status(100).send(
              new CustomResponse(100, "Article load Failed")
          );
      }

});
