"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHeartbeat = void 0;
function setupHeartbeat(wss, interval = 5000) {
    const intervalId = setInterval(() => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.ping();
            }
        });
    }, interval);
    return () => clearInterval(intervalId);
}
exports.setupHeartbeat = setupHeartbeat;
