import express from "express";
import http from "http";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 8080;

app.use("/", express.static(path.resolve(__dirname + "/../public")));

httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
