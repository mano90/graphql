"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_http_1 = __importDefault(require("node:http"));
const fs = require("fs");
const node_process_1 = __importDefault(require("node:process"));
const { performance } = require("perf_hooks");
const numCPUs = require("os").cpus().length;
const autocannon = require("autocannon");
// const express = require("express");
// const bodyParser = require("body-parser");
// import { Request, Response } from "express";
// import { Routes } from "./Contrainte/Config/Routes/AppRoutes";
// import { AppConfig } from "./Contrainte/Config/AppConfig/AppConfig";
// const app = express();
// app.use(AppConfig.allowCrossDomain);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// Routes.forEach((route) => {
//   (app as any)[route["method"]](
//     route["route"],
//     (req: Request, res: Response, next: Function) => {
//       const result = new (route["controller"] as any)()
//         [route["action"]](req, res, next)
//         .then(() => next)
//         .catch((err: any) => next(err));
//     }
//   );
// });
// app.listen(3000);
let t = 0;
let numberRequest = 0;
if (node_cluster_1.default.isPrimary) {
    function messageHandler(message) {
        if ((message === null || message === void 0 ? void 0 : message.cmd) == "notifyRequest") {
            numberRequest++;
            console.log(`Nombre de requetes ${numberRequest}`);
        }
    }
    for (let i = 0; i < 4; i++) {
        node_cluster_1.default.fork();
    }
    node_cluster_1.default.fork().on("listening", (address) => {
        console.log(address);
    });
    node_cluster_1.default.on("disconnect", (worker) => {
        console.log(`disconnect ${worker}`);
    });
    node_cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        if (code) {
            console.log(`code ${code}`);
        }
        if (signal) {
            console.log(`signal ${signal}`);
        }
    });
    for (const id in node_cluster_1.default.workers) {
        // cluster.workers?[id]<unknown><Cluster>.on('message', messageHandler);
        // cluster.workers[id]?.on("message", messageHandler);
        (_a = node_cluster_1.default.workers[id]) === null || _a === void 0 ? void 0 : _a.on("message", messageHandler);
    }
    autocannon({
        url: "http://localhost:8000",
        connections: 100,
        duration: 10, // Test duration in seconds
    }, (err, result) => {
        console.log(result);
    });
}
else {
    node_http_1.default
        .createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end("time".toString());
        // const startTime = performance.now();
        // fs.readFile("./data.json", "utf8", (err: any, data: any) => {
        //   if (err) {
        //     console.error(err);
        //     res.statusCode = 500;
        //     res.end();
        //     return;
        //   }
        // parse the json data
        // let jsonData;
        // try {
        //   jsonData = JSON.parse(data);
        // } catch (e) {
        //   console.error(e);
        //   res.statusCode = 500;
        //   res.end();
        //   return;
        // }
        // set the response headers and send the json data
        // res.statusCode = 200;
        // res.setHeader("Content-Type", "application/json");
        // let d = JSON.stringify(jsonData);
        // if (d) {
        //   const endTime = performance.now();
        //   let time = endTime - startTime;
        //   t += time;
        //   process.send?.({ cmd: "notifyRequest" });
        //   console.log(t.toString());
        //   res.end(time.toString());
        // }
        // res.end(JSON.stringify(jsonData));
        // });
    })
        .listen(8000);
    console.log(`Worker ${node_process_1.default.pid} started`);
}
