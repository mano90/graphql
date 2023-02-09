"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteFactory = void 0;
const typedi_1 = require("typedi");
let RouteFactory = class RouteFactory {
    createGetRoute(route, action, controller) {
        return this.createRoute("get", route, action, controller);
    }
    createPostRoute(route, action, controller) {
        return this.createRoute("post", route, action, controller);
    }
    createPutRoute(route, action, controller) {
        return this.createRoute("put", route, action, controller);
    }
    createDeleteRoute(route, action, controller) {
        return this.createRoute("delete", route, action, controller);
    }
    createRoute(method, route, action, controller) {
        return {
            method: method,
            route,
            action,
            controller,
        };
    }
};
RouteFactory = __decorate([
    (0, typedi_1.Service)()
], RouteFactory);
exports.RouteFactory = RouteFactory;
