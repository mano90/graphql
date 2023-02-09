import { Container } from "typedi";
import { Request, Response } from "express";
import { QueryService } from "../Services/QueryService";
import { Data } from "../Interfaces/data";
let queryService: QueryService = Container.get(QueryService);
export class LicenseController {
  async liste(req: Request, resp: Response) {
    try {
      let nombre: number = 5;
      let key = req.params.nombre;
      if (key) {
        nombre = Number(key);
      }
      const liste: any[] = await queryService.executeQuery(
        "SELECT licenses.license AS license,count(*) AS total FROM `bigquery-public-data.github_repos.sample_repos` AS repo INNER JOIN `bigquery-public-data.github_repos.licenses` AS licenses ON repo.repo_name = licenses.repo_name GROUP BY license ORDER BY total DESC LIMIT " +
          nombre
      );
      const toReturn: Data[] = liste.map((e) => {
        const t: Data = {
          label: e.license,
          quantity: e.total,
        };
        return t;
      });
      resp.status(200).send(toReturn);
    } catch (e: any) {
      resp.status(500).send((e.toString(), true));
    }
  }
}
