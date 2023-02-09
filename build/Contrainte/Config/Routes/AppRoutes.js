"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const LicenseRoute_1 = require("./LicenseRoute");
const LanguageRoute_1 = require("./LanguageRoute");
exports.Routes = [...LicenseRoute_1.licenseRoute, ...LanguageRoute_1.languageRoute];
