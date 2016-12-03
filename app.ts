import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as os from "os";
var app = express();
var datas : {datas: Array<{name: string}>} = require("./app/data/data.json");

app.set("datas", datas);

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //for post request

app.use(require('./app/routes/crud'));
app.get('/test', (req, res) => {
    let cpuCount = os.cpus().length;
    res.end(`cpu count ${cpuCount}`);
});

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`runs in port ${port}`);
})