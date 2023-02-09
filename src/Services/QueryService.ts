import { Service } from "typedi";
const { BigQuery } = require("@google-cloud/bigquery");

@Service()
export class QueryService {
  bigQuery = new BigQuery({
    projectId: "micro-elysium-374513",
    keyFilename: "./micro-elysium-374513-afa419374f55.json",
  });
  async executeQuery(query: string) {
    try {
      const [rows] = await this.bigQuery.query({ query: query });
      return rows;
    } catch (err) {
      console.error(`Erreur lors de l'exécution de la requête: ${err}`);
    }
  }
}
