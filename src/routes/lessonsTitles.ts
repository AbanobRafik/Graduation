// routes/lessonsTitles.ts
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// 🔹 نضيف prefix /titles/
router.get("/titles/:term/:grade/:subject", (req, res) => {
  const { term, grade, subject } = req.params;

  const termLower = term.toLowerCase();
  const gradeLower = grade.toLowerCase();
  const subjectLower = subject.toLowerCase();

  const dataPath = path.join(
    __dirname,
    `../data/${termLower}/${gradeLower}/${subjectLower}.json`
  );

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ message: "خطأ في قراءة بيانات الدروس" });
    }

    const lessons = JSON.parse(jsonData);
    const titles = lessons.map((lesson: any) => ({
      id: lesson.id,
      title: lesson.title,
    }));

    res.json(titles);
  });
});

export default router;
