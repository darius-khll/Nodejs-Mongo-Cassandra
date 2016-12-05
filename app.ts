import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as os from "os";
var cluster = require('cluster');

if (cluster.isMaster) {

    var cpuCount = require('os').cpus().length;
    console.log(cpuCount);

    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    
}
else {

    var app = express();
    var datas: { datas: Array<{ name: string }> } = require("./app/data/data.json");

    app.set("datas", datas);
    
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false })); //for post request

    app.use(require('./app/routes/crud'));
    app.get('/test1', (req, res) => {
        for (let i = 0; i < 1000000000000000000; i++)
        { }
        res.end(`test`);
    });
    app.get('/test2', (req, res) => {

        res.end(`test2`);
    });

    var server = app.listen(8081, () => {
        var host = server.address().address
        var port = server.address().port
        console.log(`runs in port ${port}`);
    })

}