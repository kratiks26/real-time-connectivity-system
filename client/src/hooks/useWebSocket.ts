import { useEffect, useState, useCallback} from "react";

export function useWebSocket (url: string){
    const [socket, setSocket] = useState<WebSocket|null> (null);
    const [lastPong, setLastPong] = useState< number | null> (null);

    useEffect(()=>{
        if(!socket) return;

        const interval = setInterval(()=>{
            if( socket.readyState === WebSocket.OPEN){
                socket.send(JSON.stringify({type: 'ping'}))
            }
        }, 5000);
        return () => clearInterval(interval);
    },[socket])

    const connect  = useCallback(()=>{

        const ws = new WebSocket(url);

        ws.onopen = ()=>{
            console.log("WebSocket Connected");
            setSocket(ws);
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if(data.type === "pong"){
                setLastPong(Date.now());
            }
        }
        ws.onclose =()=>{
            console.log("WebSocket Disconnected");
            setSocket(null);
            setTimeout(()=> connect(), 5000);
        };
        ws.onerror = (error) => {
            console.log("WebSocket error:", error);
            ws.close();
        };

        return ()=>{
            ws.close();
        }
    },[url]);

    useEffect (()=>{
        const cleanup = connect();
        return ()=>{
            cleanup  && cleanup();
        }

    },[connect])
    return {socket, lastPong};
}