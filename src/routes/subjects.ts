import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

// Route لعرض كل الدروس لمادة معينة
router.get("/:subject", (req, res) => {
  const subject = req.params.subject.toLowerCase();
  const dataPath = path.join(__dirname, `../data/subjects/${subject}.json`);

  fs.readFile(dataPath, "utf-8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ message: "خطأ في قراءة دروس المادة" });
    }

    const data = JSON.parse(jsonData);
    res.json(data.lessons); // دروس فقط
  });
});

export default router;
