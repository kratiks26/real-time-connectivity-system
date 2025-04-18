"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
const ws_1 = require("ws");
function setupWebSocket(server) {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log('New client connected');
        const heartbeatInterval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                ws.ping();
            }
        }, 5000);
        ws.on('message', (message) => {
            const data = JSON.parse(message.toString());
            if (data.type === 'ping') {
                ws.send(JSON.stringify({ type: 'pong' }));
            }
        });
        ws.on('close', () => {
            clearInterval(heartbeatInterval);
            console.log('Client disconnected');
        });
    });
    return wss;
}
exports.setupWebSocket = setupWebSocket;
