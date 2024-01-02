import express from 'express';

//invoke express
const app = express();
//start server
app.listen(8080, () => {
    console.log("Server start 8080");
});

app.get('/user/all', (req: express.Request, res: express.Response) => {

    let data = {
        id: "01234",
        username:"thami",
        fName: "thamindu",
        lName: "ranawaka",
        email: "thamindu@gmail.com"

    }

    res.send(data);
})