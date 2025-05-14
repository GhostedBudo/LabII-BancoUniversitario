import React from 'react'
import { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

        useEffect(() => {
    
            const interval = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);
    
            return () => clearInterval(interval);
        }, []);
  return (
    <div>
    {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
    </div>
  )
}

export default Clock