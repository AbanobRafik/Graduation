"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/lessonsTitles.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// 🔹 نضيف prefix /titles/
router.get("/titles/:term/:grade/:subject", (req, res) => {
    const { term, grade, subject } = req.params;
    const termLower = term.toLowerCase();
    const gradeLower = grade.toLowerCase();
    const subjectLower = subject.toLowerCase();
    const dataPath = path_1.default.join(__dirname, `../data/${termLower}/${gradeLower}/${subjectLower}.json`);
    fs_1.default.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ message: "خطأ في قراءة بيانات الدروس" });
        }
        const lessons = JSON.parse(jsonData);
        const titles = lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
        }));
        res.json(titles);
    });
});
exports.default = router;
