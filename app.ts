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

    cluster.on('exit', (worker: any, code: any, signal: any) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
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
        console.log("t1 : " + cluster.worker.id);
        for (let i = 0; i < 100000000000000; i++)
        { }
        res.end(`test - ` + cluster.worker.id);
    });
    app.get('/test2', (req, res) => {
        res.end(`test2 - ` + cluster.worker.id);
    });

    var server = app.listen(8081, () => {
        var host = server.address().address
        var port = server.address().port
        console.log(`runs in port ${port}`);
    })

}