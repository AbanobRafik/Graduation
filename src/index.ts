import express from "express";
import cors from "cors";
import path from "path";
import lessonsRoutes from "./routes/Lesson";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static files like images and models
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/models", express.static(path.join(__dirname, "../public/models")));

// Use lessonsRoutes for all /api routes
app.use("/api", lessonsRoutes);

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
