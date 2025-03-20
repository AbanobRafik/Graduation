import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// 1️⃣ مسار لجلب عناوين جميع الدروس في مادة معينة
router.get("/titles/:grade/:subject", (req, res) => {
  const grade = req.params.grade.toLowerCase();
  const subject = req.params.subject.toLowerCase();

  try {
    const dataPath = path.join(
      __dirname,
      `../data/secondTerm/${grade}/${subject}.json`
    );

    const lessons = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const titles = lessons.map((lesson: any) => ({
      id: lesson.id,
      title: lesson.title,
    }));

    res.json(titles);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء قراءة عناوين الدروس" });
  }
});

// 2️⃣ مسار لجلب درس معين
router.get("/:grade/:subject/:id", (req, res) => {
  const grade = req.params.grade.toLowerCase();
  const subject = req.params.subject.toLowerCase();
  const id = parseInt(req.params.id);

  try {
    const dataPath = path.join(
      __dirname,
      `../data/secondTerm/${grade}/${subject}.json`
    );

    const lessons = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const lesson = lessons.find((l: any) => l.id === id);

    if (lesson) {
      res.json(lesson);
    } else {
      res.status(404).json({ message: "الدرس غير موجود في الترم الثاني" });
    }
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء قراءة بيانات الدرس" });
  }
});

// 3️⃣ مسار لجلب نموذج 3D معين
router.get("/model/:grade/:subject/:id", (req, res) => {
  const grade = req.params.grade.toLowerCase();
  const subject = req.params.subject.toLowerCase();
  const id = parseInt(req.params.id);

  try {
    const dataPath = path.join(
      __dirname,
      `../data/secondTerm/${grade}/${subject}.json`
    );

    const lessons = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const lesson = lessons.find((l: any) => l.id === id);

    if (lesson) {
      res.json({ model: lesson.model });
    } else {
      res.status(404).json({ message: "النموذج غير موجود في الترم الثاني" });
    }
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء قراءة بيانات النموذج" });
  }
});

export default router;
