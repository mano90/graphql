"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageRoute = void 0;
const typedi_1 = require("typedi");
const LanguageController_1 = require("../../../Infrastructure/LanguageController");
const RouteFactory_1 = require("../../Factory/RouteFactory");
const routeFactory = typedi_1.Container.get(RouteFactory_1.RouteFactory);
exports.languageRoute = [
    routeFactory.createGetRoute("/api/language/liste/:nombre?", "liste", LanguageController_1.LanguageController),
];
