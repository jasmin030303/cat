import { Router } from "express";
import favorateControlers from "./favorate.controlers";

const routes = Router();


routes.get("/favorite/:userId",favorateControlers.getFavorite );
routes.post("/favorite", favorateControlers.postFavorite);
routes.delete("/favorite/:id", favorateControlers.deleteFavorite);


export default routes;
