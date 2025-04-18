"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const websocket_1 = require("./config/websocket");
const heartbeat_1 = require("./utils/heartbeat");
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
const server = http_1.default.createServer(app);
const wss = (0, websocket_1.setupWebSocket)(server);
const cleanupHeartbeat = (0, heartbeat_1.setupHeartbeat)(wss);
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
process.on('SIGTERM', () => {
    cleanupHeartbeat();
    server.close();
});
