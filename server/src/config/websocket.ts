import { WebSocketServer } from "ws";

export function setupWebSocket(server:any){
    const wss = new WebSocketServer({server});
    wss.on('connection',(ws:any) =>{
        console.log('New client connected');

        const heartbeatInterval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){
                ws.ping();
            }
        },5000)


        ws.on('message', (message: any)=>{
            const data = JSON.parse(message.toString());
            if(data.type ==='ping'){
                ws.send(JSON.stringify({type:'pong'}));
            }
        });
        ws.on('close',()=>{
            clearInterval(heartbeatInterval);
            console.log('Client disconnected');
        });
    });
    return wss;
}