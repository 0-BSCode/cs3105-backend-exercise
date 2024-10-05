import { errorHandlerMiddleware } from "@middleware/error-handler.middleware";
import express, { urlencoded, json } from "express";
import userRoutes from "@routes/user.routes";
import authRoutes from '@routes/auth.routes';
import cookieParser from 'cookie-parser';
import { envConfig } from '@config/env';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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
 * 2. Logging middleware
 * 3. Address TODO's
 * 4. Deploy site
 */