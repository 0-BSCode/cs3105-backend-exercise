import { errorHandlerMiddleware } from "@middleware/error-handler.middleware";
import express, { urlencoded, json } from "express";
import cookieParser from 'cookie-parser';
import { envConfig, checkEnv } from '@config/env.config';
import { loggerMiddleware } from "@middleware/logger.middleware";
import routes from "@routes/index";
import { rateLimiterMiddleware } from "@middleware/rate-limiter.middleware";
import swaggerUi from 'swagger-ui-express'
import { specs } from "@config/swagger.config";

checkEnv();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(loggerMiddleware);
app.use(rateLimiterMiddleware);
app.use("/api", routes);

// Error handler
app.use(errorHandlerMiddleware);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ msg: "OK" });
});

app.listen(envConfig.PORT, () => {
  console.log(`Server is listening at port ${envConfig.PORT}`);
});

/**
 * TODO
 * 1. Deploy site
 */