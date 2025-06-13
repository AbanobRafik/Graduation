import express from "express";
import path from "path";
import fs from "fs";
import { Data } from "../types/types";

const router = express.Router();

const loadLessonData = async (): Promise<Data> => {
  const dataPath = path.join(__dirname, "../data/data.json");

  try {
    const jsonData = await fs.promises.readFile(dataPath, "utf-8");
    return JSON.parse(jsonData) as Data;
  } catch (error) {
    throw new Error("خطأ في تحميل البيانات");
  }
};

// ✅ Route لجلب عناوين الدروس
router.get("/titles", async (req, res) => {
  const { grades, term, subject, unit } = req.query;

  try {
    const data = await loadLessonData();

    if (!grades || !term || !subject || !unit) {
      return res
        .status(400)
        .json({ message: "يرجى تحديد الصف، التيرم، المادة، والوحدة" });
    }

    const gradeData = data[grades as string];
    const termData = gradeData?.[term as string];
    const subjectData = termData?.[subject as string];
    const unitData = subjectData?.units.find((u) => u.unit === unit);

    if (!unitData) {
      return res.status(404).json({ message: "الوحدة غير موجودة" });
    }

    const titles = unitData.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
    }));

    return res.json(titles);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تحميل البيانات" });
  }
});

// ✅ Route جديد لجلب الأسئلة
router.get("/questions", async (req, res) => {
  const { grades, term, subject, unit, lessonId } = req.query;

  try {
    const data = await loadLessonData();

    if (!grades || !term || !subject || !unit || !lessonId) {
      return res
        .status(400)
        .json({ message: "يرجى تحديد جميع المعلمات المطلوبة" });
    }

    const gradeData = data[grades as string];
    const termData = gradeData?.[term as string];
    const subjectData = termData?.[subject as string];
    const unitData = subjectData?.units.find((u) => u.unit === unit);
    const lesson = unitData?.lessons.find(
      (l) => l.id === parseInt(lessonId as string)
    );

    if (!lesson) {
      return res.status(404).json({ message: "الدرس غير موجود" });
    }

    if (!lesson.questions || lesson.questions.length === 0) {
      return res.status(404).json({ message: "لا توجد أسئلة لهذا الدرس" });
    }

    return res.json(lesson.questions); // أو: res.json({ questions: lesson.questions });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تحميل الأسئلة" });
  }
});

// ✅ Route عام للبيانات الديناميكية والـ lists
router.get("/", async (req, res) => {
  const { grades, term, subject, unit, lessonId, list } = req.query;

  try {
    const data = await loadLessonData();

    if (list) {
      if (list === "grades") {
        const gradesList = Object.keys(data);
        return res.json({ grades: gradesList });
      }

      if (list === "terms" && grades) {
        const gradeData = data[grades as string];
        if (!gradeData) {
          return res.status(404).json({ message: "الصف غير موجود" });
        }
        const termsList = Object.keys(gradeData);
        return res.json({ terms: termsList });
      }

      if (list === "subjects" && grades && term) {
        const gradeData = data[grades as string];
        const termData = gradeData[term as string];
        if (!termData) {
          return res.status(404).json({ message: "التيرم غير موجود" });
        }
        const subjectsList = Object.keys(termData);
        return res.json({ subjects: subjectsList });
      }

      if (list === "units" && grades && term && subject) {
        const gradeData = data[grades as string];
        const termData = gradeData[term as string];
        const subjectData = termData[subject as string];
        if (!subjectData) {
          return res.status(404).json({ message: "المادة غير موجودة" });
        }
        const unitsList = subjectData.units.map((unit) => unit.unit);
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
            const unitData = subjectData.units.find((u) => u.unit === unit);
            if (!unitData) {
              return res.status(404).json({ message: "الوحدة غير موجودة" });
            }

            if (lessonId) {
              const lesson = unitData.lessons.find(
                (l) => l.id === parseInt(lessonId as string)
              );
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
