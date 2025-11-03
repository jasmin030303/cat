import "dotenv/config";
import globalRouter from "./routes";
import express from "express"

const server = express();

const buildServer = () => {
  server.use(express.json());

  server.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello Cat",
    });
  });
  server.use("/api/v1", globalRouter);

  return server;
};

export default buildServer