import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

const loadLessonData = async () => {
  const dataPath = path.join(__dirname, "../data/data.json");

  try {
    const jsonData = await fs.promises.readFile(dataPath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error("خطأ في تحميل البيانات");
  }
};

router.get("/", async (req, res) => {
  const { grades, term, subject, unit, lessonId, list } = req.query;

  try {
    const data = await loadLessonData();

    if (list) {
      if (list === 'grades') {
        const gradesList = Object.keys(data); 
        return res.json({ grades: gradesList });
      }

      if (list === 'terms' && grades) {
        const gradeData = data[grades as string];
        if (!gradeData) {
          return res.status(404).json({ message: "الصف غير موجود" });
        }
        const termsList = Object.keys(gradeData); 
        return res.json({ terms: termsList });
      }

      if (list === 'subjects' && grades && term) {
        const gradeData = data[grades as string];
        const termData = gradeData[term as string];
        if (!termData) {
          return res.status(404).json({ message: "التيرم غير موجود" });
        }
        const subjectsList = Object.keys(termData); 
        return res.json({ subjects: subjectsList });
      }

      if (list === 'units' && grades && term && subject) {
        const gradeData = data[grades as string];
        const termData = gradeData[term as string];
        const subjectData = termData[subject as string];
        if (!subjectData) {
          return res.status(404).json({ message: "المادة غير موجودة" });
        }
        const unitsList = subjectData.units.map((unit: any) => unit.unit); 
        return res.json({ units: unitsList });
      }

      return res.status(400).json({ message: "Invalid list query parameter" });
    }

    if (grades) {
      const gradeData = data[grades as string];
      if (!gradeData) {
        return res.status(404).json({ message: "الصف غير موجود" });
      }

      if (term) {
        const termData = gradeData[term as string];
        if (!termData) {
          return res.status(404).json({ message: "التيرم غير موجود" });
        }

        if (subject) {
          const subjectData = termData[subject as string];
          if (!subjectData) {
            return res.status(404).json({ message: "المادة غير موجودة" });
          }

          if (unit) {
            const unitData = subjectData.units.find((u: any) => u.unit === unit);
            if (!unitData) {
              return res.status(404).json({ message: "الوحدة غير موجودة" });
            }

            if (lessonId) {
              const lesson = unitData.lessons.find((l: any) => l.id === parseInt(lessonId as string));
              if (!lesson) {
                return res.status(404).json({ message: "الدرس غير موجود" });
              }
              return res.json(lesson);
            }
            return res.json(unitData);  
          }
          return res.json(subjectData); 
        }
        return res.json(termData); 
      }
      return res.json(gradeData); 
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "خطأ في تحميل البيانات" });
  }
});

export default router;
