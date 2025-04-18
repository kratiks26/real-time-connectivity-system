import { useEffect, useState } from 'react';
import './SystemHealth.scss'
import { useWebSocket } from '../../hooks/useWebSocket';
import { checkHealth } from '../../services/healthCheck';

export default function SystemHealth() {
    const {lastPong} = useWebSocket('ws://localhost:5000');
    const [httpHealth, setHttpHealth] = useState<string>("checking...");
    const [lastCheck, setLastCheck] = useState<Date | null>(null);

    useEffect(()=>{
        const interval = setInterval(async()=>{
            try{
                const health = await checkHealth();
                setHttpHealth(health?.status);
                setLastCheck(new Date());
            } catch {
                setHttpHealth('unhealthy');
            }
        },5000);

        checkHealth().then(health =>{
            setHttpHealth(health?.status);
            setLastCheck(new Date());
        });
        return () => clearInterval(interval);
    },[lastPong])


  return (
    <div className='health-status'>
        <div className='data-tag' >HTTP Status:<span className='data'> {httpHealth}</span></div>
        <div className='data-tag'>Last WS Pong:<span className='data'> {lastPong ? new Date(lastPong)?.toLocaleTimeString():"Never"}</span></div>
        <div className='data-tag'>Last HTTP Check:<span className='data'>  {lastCheck?.toLocaleTimeString() || 'Never'}</span></div>
    </div>
  );
};
