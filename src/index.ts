import buildServer from "./app";

const server = buildServer();

const startServer = () => {
  try {
    const PORT = Number(process.env.PORT) || 3000;

    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`${new Date()}`);
        console.log(`Server run in: http://localhost:${PORT}`);
      }
    );
  } catch (error) {
    console.log(`Error crush:${error}`);
    process.exit(1);
  }
};

startServer();
