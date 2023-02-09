import { Container } from "typedi";
import { Request, Response } from "express";
import { QueryService } from "../Services/QueryService";
import { Data } from "../Interfaces/data";

let queryService: QueryService = Container.get(QueryService);
export class LanguageController {
  async liste(req: Request, resp: Response) {
    try {
      let nombre: number = 10;
      let key = req.params.nombre;
      if (key) {
        nombre = Number(key);
      }
      const liste: any[] = await queryService.executeQuery(
        "SELECT arr.name AS LANGUAGE, sum(arr.bytes) AS total_bytes FROM `bigquery-public-data.github_repos.languages`, UNNEST(LANGUAGE) arr GROUP BY LANGUAGE ORDER BY total_bytes DESC LIMIT " +
          nombre
      );
      const toReturn: Data[] = liste.map((e) => {
        const t: Data = {
          label: e.language,
          quantity: e.total_bytes,
        };
        return t;
      });
      resp.status(200).send(toReturn);
    } catch (e: any) {
      resp.status(500).send((e.toString(), true));
    }
  }
}
