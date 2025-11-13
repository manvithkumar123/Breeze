"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const PostgreeDb_1 = require("./config/PostgreeDb");
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const NewsRoute_1 = __importDefault(require("./routes/NewsRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, PostgreeDb_1.connectPostgres)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Node.js Backend!");
});
app.use("/api/user", UserRoute_1.default);
app.use("/api/news", NewsRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
