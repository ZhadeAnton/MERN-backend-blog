import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/upload", uploadRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
