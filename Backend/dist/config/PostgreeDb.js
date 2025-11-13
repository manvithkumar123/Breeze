"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgres = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
const connectPostgres = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Connected to PostgreSQL Database");
        client.release();
    }
    catch (error) {
        console.error("❌ PostgreSQL connection error:", error);
        process.exit(1);
    }
};
exports.connectPostgres = connectPostgres;
exports.default = pool;
