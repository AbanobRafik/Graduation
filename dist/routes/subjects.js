"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Route لعرض كل الدروس لمادة معينة
router.get("/:subject", (req, res) => {
    const subject = req.params.subject.toLowerCase();
    const dataPath = path_1.default.join(__dirname, `../data/subjects/${subject}.json`);
    fs_1.default.readFile(dataPath, "utf-8", (err, jsonData) => {
        if (err) {
            return res.status(500).json({ message: "خطأ في قراءة دروس المادة" });
        }
        const data = JSON.parse(jsonData);
        res.json(data.lessons); // دروس فقط
    });
});
exports.default = router;
