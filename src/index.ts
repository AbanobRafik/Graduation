import express from "express";
import cors from "cors";
import path from "path";
import firstTermRoutes from "./routes/firstTerm";
import secondTermRoutes from "./routes/secondTerm";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// السماح بالوصول إلى الملفات الثابتة
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/models", express.static(path.join(__dirname, "../public/models")));

// تحديد المسارات
app.use("/api/first-term", firstTermRoutes);
app.use("/api/second-term", secondTermRoutes);

app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
