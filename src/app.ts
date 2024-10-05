import { errorHandlerMiddleware } from "@middleware/error-handler.middleware";
import express, { urlencoded, json } from "express";
import cookieParser from 'cookie-parser';
import { envConfig } from '@config/env';
import { loggerMiddleware } from "@middleware/logger.middleware";
import routes from "@routes/index";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(loggerMiddleware);
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
 * 1. Rate limiting middleware
 * 2. Address TODO's
 * 3. Deploy site
 */