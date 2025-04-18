import React, { useState } from 'react';
import './OfflinePage.scss';
import Disconnected from '../../icons/disconnected';
import Retry from '../../icons/retry';

interface OfflinePageProps {
  onRetry: () => void;
  isOnline: boolean;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({ onRetry, isOnline}: OfflinePageProps) => {
    const [isRotating, setIsRotating] = useState<boolean>(false)

    const handleRetryButton = () =>{
        onRetry();
        setIsRotating(true);
        setTimeout(()=>{
            setIsRotating(false);
        },1000)   
    }

  return (
    <div className="container">
      <div className = "content">
        <Disconnected/>
        <h1 className='headline'>You are offline!</h1>
        <p className='paragraph'>Please check your internet connection</p>
        <button className="retryButton" onClick={handleRetryButton}>
            <div className={`buttonIcon ${isRotating ?'rotate':""}`}><Retry/></div>
          Retry Connection
        </button>
      </div>
      <div className={`status ${ isOnline ? "online": "offline"}`}>
            <div className='indicator'/>
                <span>{isOnline ? "Online": "Offline"}</span>
        </div>
    </div>
  );
}