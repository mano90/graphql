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
exports.LanguageController = void 0;
const typedi_1 = require("typedi");
const QueryService_1 = require("../Services/QueryService");
let queryService = typedi_1.Container.get(QueryService_1.QueryService);
class LanguageController {
    liste(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let nombre = 10;
                let key = req.params.nombre;
                if (key) {
                    nombre = Number(key);
                }
                const liste = yield queryService.executeQuery("SELECT arr.name AS LANGUAGE, sum(arr.bytes) AS total_bytes FROM `bigquery-public-data.github_repos.languages`, UNNEST(LANGUAGE) arr GROUP BY LANGUAGE ORDER BY total_bytes DESC LIMIT " +
                    nombre);
                const toReturn = liste.map((e) => {
                    const t = {
                        label: e.language,
                        quantity: e.total_bytes,
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
exports.LanguageController = LanguageController;
