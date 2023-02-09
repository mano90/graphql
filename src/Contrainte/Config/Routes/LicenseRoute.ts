import { Container } from "typedi";
import { LicenseController } from "../../../Infrastructure/LicenseController";
import { RouteFactory } from "../../Factory/RouteFactory";
const routeFactory = Container.get(RouteFactory);
export const licenseRoute = [
  routeFactory.createGetRoute(
    "/api/license/liste/:nombre?",
    "liste",
    LicenseController
  ),
];
