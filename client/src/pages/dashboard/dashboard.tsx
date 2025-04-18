import React, { useEffect, useState } from 'react'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import { useWebSocket } from '../../hooks/useWebSocket';
import { OfflinePage } from '../../component/offinePage/OfflinePage';
import { ConnectionStatus } from '../../component/connectionStatus/ConnectionStatus';
import './dashboard.scss'
import SystemHealth from '../../component/systemHealth.tsx/SystemHealth';

export default function Dashboard() {
    const {isOnline, wasOffline} = useConnectionStatus();
    const [showOfflinePage, setShowOfflinePage] = useState<boolean>(!isOnline && wasOffline);
    const { socket } = useWebSocket('ws://localhost:5000');

    
    useEffect(()=>{
        setShowOfflinePage(!isOnline && wasOffline);
    },[isOnline, wasOffline]);

    useEffect(()=>{
        if(socket){
            socket.onmessage = (event) => {
                console.log('message from server:', event.data)
            }
        }
    },[socket]);

    const handleRetryButton = () => {
        if (isOnline){
            setShowOfflinePage(false);
        }
    }

    if(showOfflinePage){
        return(
            <OfflinePage onRetry={handleRetryButton} isOnline = {isOnline}/>
        )
    }


  return (
    <div className='dashboard'>
        <h3 className='websocket'>WebSocket Connection Status: <span className={socket ? "connected": "disconnected" }>{socket ? "Connected": "Disconnected"}</span></h3>
        <SystemHealth/>
        <h1 className='headline'>
            Real Time Connectivity System
        </h1>
        <p className='paragraph'>Connection Status: <span className={isOnline ? "online": "offline"}>{isOnline ? 'Online': 'Offline'}</span></p>
        <ConnectionStatus isOnline={isOnline}/>
    </div>
  )
}
