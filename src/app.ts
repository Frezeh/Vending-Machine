import express, { Request, Response } from "express";
import logger from "./utils/logger";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";

const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  routes(app);

  swaggerDocs(app, port);
});
