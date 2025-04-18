export function setupHeartbeat(wss: any, interval: number = 5000){
    const intervalId = setInterval(()=>{
        wss.clients.forEach((client:any)=>{
            if(client.readyState === WebSocket.OPEN){
                client.ping();
            }
        })
    }, interval);

    return () => clearInterval(intervalId)
}