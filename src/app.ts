import dotenv from 'dotenv';
dotenv.config();

import { errorHandlerMiddleware } from "@middleware/error-handler.middleware";
import express, { urlencoded, json } from "express";
import userRoutes from "@routes/user.routes";
import authRoutes from '@routes/auth.routes';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 8000;
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

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

/**
 * TODO
 * 1. Input validation w/ Joi
 * 2. Rate limiting middleware
 * 3. Logging middleware
 * 4. Address TODO's
 * 5. Deploy site
 * 6. Make env file available in compiled JS
 */