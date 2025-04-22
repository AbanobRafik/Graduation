"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const firstTerm_1 = __importDefault(require("./routes/firstTerm"));
const secondTerm_1 = __importDefault(require("./routes/secondTerm"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
// السماح بالوصول إلى الملفات الثابتة
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.use("/models", express_1.default.static(path_1.default.join(__dirname, "../public/models")));
// تحديد المسارات
app.use("/api/first-term", firstTerm_1.default);
app.use("/api/second-term", secondTerm_1.default);
app.listen(PORT, () => {
    console.log(`server working on http://localhost:${PORT}`);
});
