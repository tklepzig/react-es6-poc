import express from "express";
import http from "http";
import path from "path";

const app = express();
const httpServer = http.Server(app);

app.use("/", express.static(path.resolve(__dirname + "/../public")));

httpServer.listen(8080, function () {
    console.log("listening on *:8080");
});
