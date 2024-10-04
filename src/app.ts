import dotenv from 'dotenv';
dotenv.config();

import { errorHandlerMiddleware } from "@middleware/error-handler.middleware";
import express, { urlencoded, json } from "express";
import userRoutes from "@routes/user.routes";
import authRoutes from '@routes/auth.routes';

const port = process.env.PORT || 8000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
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