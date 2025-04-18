import React from 'react'
import "./ConnectionStatus.scss"

interface ConnectionStatusProps {
    isOnline : boolean ;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({isOnline }:ConnectionStatusProps) => {

  return (
        <div className={`status ${ isOnline ? "online": "offline"}`}>
            <div className='indicator'/>
                <span>{isOnline ? "Online": "Offline"}</span>
        </div>
  )
}

