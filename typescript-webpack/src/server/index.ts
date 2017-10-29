import * as express from "express";
import * as path from "path";

const app = express();

console.log(path.resolve(`${__dirname}`));

app.use("/", express.static(path.resolve(`${__dirname}/../public`)));

app.listen(8080, function () {
    console.log("listening on *:8080");
});
