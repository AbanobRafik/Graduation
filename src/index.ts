import express from "express";
import cors from "cors";
import path from "path";
import lessonsRoutes from "./routes/Lesson";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = 5000;
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static files like images and models
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/models", express.static(path.join(__dirname, "../public/models")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use lessonsRoutes for all /api routes
app.use("/api", lessonsRoutes);

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
