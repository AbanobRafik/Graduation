"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/lessonModel.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// مسار لجلب جميع النماذج الخاصة بمادة معينة
router.get("/:term/:grade/:subject", (req, res) => {
    const { term, grade, subject } = req.params;
    const dataPath = path_1.default.join(__dirname, `../data/${term}/${grade}/${subject}.json`);
    fs_1.default.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ message: "خطأ في قراءة بيانات النماذج" });
        }
        const lessons = JSON.parse(jsonData);
        const models = lessons.map((lesson) => ({
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
    const dataPath = path_1.default.join(__dirname, `../data/${term}/${grade}/${subject}.json`);
    fs_1.default.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ message: "خطأ في قراءة بيانات الموديل" });
        }
        const lessons = JSON.parse(jsonData);
        const lesson = lessons.find((l) => l.id === parseInt(id));
        if (lesson) {
            res.json({
                id: lesson.id,
                title: lesson.title,
                model: lesson.model, // المسار إلى الموديل
            });
        }
        else {
            res.status(404).json({ message: "الموديل غير موجود" });
        }
    });
});
exports.default = router;
