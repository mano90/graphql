"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autocannon = require("autocannon");
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });
// app.get("/api/slow", (req: Request, res: Response) => {
//   console.time("slowApi");
//   const baseNumber = 7;
//   let result = 0;
//   for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
//     result += Math.atan(i) * Math.tan(i);
//   }
//   console.timeEnd("slowApi");
//   console.log(`Result number is ${result} - on process ${process.pid}`);
//   res.send(`Result number is ${result}`);
// });
// app.listen(8000);
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
}
else {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("/api/slow", (req, res) => {
        console.time("slowApi");
        const baseNumber = 7;
        let result = 0;
        for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
            result += Math.atan(i) * Math.tan(i);
        }
        console.timeEnd("slowApi");
        console.log(`Result number is ${result} - on process ${process.pid}`);
        res.send(`Result number is ${result}`);
    });
    app.listen(8000);
}
