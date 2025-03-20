// routes/lessonModel.ts
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// مسار لجلب جميع النماذج الخاصة بمادة معينة
router.get("/:term/:grade/:subject", (req, res) => {
  const { term, grade, subject } = req.params;

  const dataPath = path.join(
    __dirname,
    `../data/${term}/${grade}/${subject}.json`
  );

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ message: "خطأ في قراءة بيانات النماذج" });
    }

    const lessons = JSON.parse(jsonData);
    const models = lessons.map((lesson: any) => ({
      id: lesson.id,
      model: lesson.model, // المسار إلى الموديل
      title: lesson.title,
    }));

    res.json(models);
  });
});

// مسار لجلب موديل معين باستخدام ID
router.get("/:term/:grade/:subject/model/:id", (req, res) => {
  const { term, grade, subject, id } = req.params;

  const dataPath = path.join(
    __dirname,
    `../data/${term}/${grade}/${subject}.json`
  );

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ message: "خطأ في قراءة بيانات الموديل" });
    }

    const lessons = JSON.parse(jsonData);
    const lesson = lessons.find((l: any) => l.id === parseInt(id));

    if (lesson) {
      res.json({
        id: lesson.id,
        title: lesson.title,
        model: lesson.model, // المسار إلى الموديل
      });
    } else {
      res.status(404).json({ message: "الموديل غير موجود" });
    }
  });
});

export default router;
