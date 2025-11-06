import { Router } from "express";
import catsControles from "./cats.controles";

const routes = Router();

routes.get("/get", catsControles.getAllData);
routes.post("/post", catsControles.postAllData);
routes.delete("/delete", catsControles.deleteCat);
routes.patch("/patch/:catsId", catsControles.patchData);
routes.put("/put/:catsId", catsControles.upDateData);

export default routes;
