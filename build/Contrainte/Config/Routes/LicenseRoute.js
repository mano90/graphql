"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseRoute = void 0;
const typedi_1 = require("typedi");
const LicenseController_1 = require("../../../Infrastructure/LicenseController");
const RouteFactory_1 = require("../../Factory/RouteFactory");
const routeFactory = typedi_1.Container.get(RouteFactory_1.RouteFactory);
exports.licenseRoute = [
    routeFactory.createGetRoute("/api/license/liste/:nombre?", "liste", LicenseController_1.LicenseController),
];
