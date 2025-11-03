import { Router } from "express";
import todoControles from "./todo.controles";

const routes = Router();

routes.get("/get", todoControles.getAllData);
routes.post("/post", todoControles.postAllData);
routes.delete("/delete/:id", todoControles.deleteData);
routes.patch("/patch/:id", todoControles.patchData);
routes.put("/put/:id", todoControles.upDateData);

export default routes;
