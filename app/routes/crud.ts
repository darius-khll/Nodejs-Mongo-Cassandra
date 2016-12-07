import * as express from "express";
import * as us from "./../services/userService";
var router = express.Router();
var datas: { datas: Array<{ name: string }> } = require("./../data/data.json");

router.get('/hello', (req, res) => {
    let cookie = req.cookies;
    res.send('<h1 style="background:red;">Hello World</h1>');
});

// router.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });

router.get('/getData', async (req, res) => {
    let response1 = datas.datas.filter(c => c.name.toLowerCase() == "ali");
    let response2: { datas: Array<{ name: string }> } = req.app.get("datas");
    let service = new us.userService();
    let response3 =  await service.getAllUser(true);
    res.end(JSON.stringify(response3));
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    let response = {
        FirstName: req.query.FirstName,
        LastName: req.query.LastName,
        Id: id
    };
    res.end(JSON.stringify(response));

    //res.send('html'); with content-type: text/html
});

router.post('/post', function (req, res) {
    let response = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    };
    res.end(JSON.stringify(response));
});

module.exports = router;