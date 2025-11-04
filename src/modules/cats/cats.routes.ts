import { Router } from "express";
import catsControles from "./cats.controles";

const routes = Router();

routes.get("/get", catsControles.getAllData);
routes.post("/post", catsControles.postAllData);
routes.delete("/delete/:id", catsControles.deleteData);
routes.patch("/patch/:id", catsControles.patchData);
routes.put("/put/:id", catsControles.upDateData);

export default routes;
