"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseController = void 0;
const typedi_1 = require("typedi");
const QueryService_1 = require("../Services/QueryService");
let queryService = typedi_1.Container.get(QueryService_1.QueryService);
class LicenseController {
    liste(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let nombre = 5;
                let key = req.params.nombre;
                if (key) {
                    nombre = Number(key);
                }
                const liste = yield queryService.executeQuery("SELECT licenses.license AS license,count(*) AS total FROM `bigquery-public-data.github_repos.sample_repos` AS repo INNER JOIN `bigquery-public-data.github_repos.licenses` AS licenses ON repo.repo_name = licenses.repo_name GROUP BY license ORDER BY total DESC LIMIT " +
                    nombre);
                const toReturn = liste.map((e) => {
                    const t = {
                        label: e.license,
                        quantity: e.total,
                    };
                    return t;
                });
                resp.status(200).send(toReturn);
            }
            catch (e) {
                resp.status(500).send((e.toString(), true));
            }
        });
    }
}
exports.LicenseController = LicenseController;
