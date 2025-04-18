import http from 'http';
import express from 'express';
import cors from 'cors';
import { setupWebSocket } from './config/websocket';
import { setupHeartbeat } from './utils/heartbeat';
const app = express();
const PORT= 5000;

app.use(cors({
     origin: "*"
}));

app.use(express.json());
app.get('/health', (req, res)=> res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const server = http.createServer(app);

const wss = setupWebSocket(server);
const cleanupHeartbeat = setupHeartbeat(wss);

server.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
});

process.on('SIGTERM', ()=>{
    cleanupHeartbeat();
    server.close();
})