import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
console.log(process.env.NODE_ENV);

// console.log(process.env.MONGO_URI);

import templateRoutes from "./routes/templateRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173", // frontend local dev
  "https://fathomlegal.com/", // frontend prod
  "https://fathomlegal.netlify.app/", // frontend prod
];

// if app is in prod
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // if you use cookies/auth later
    })
  );
} else {
  // if app is in dev
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // middleware to access json
app.use("/api/templates", templateRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT : ", PORT);
  });
});
