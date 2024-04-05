import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Swap.css';

interface SwapEvent {
    from: string;
    amount0In: number;
    amount1In: number;
    amount0Out: number;
    amount1Out: number;
    to: string;
}

const Swap: React.FC = () => {
    const [swapData, setSwapData] = useState<SwapEvent[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [socket, setSocket] = useState<any>(null); // State to hold the socket instance

    const handleFetchSwapEvents = () => {
        if (isFetching) {
            socket.emit('stopFetching');
            socket.disconnect();
            setIsFetching(false);
        } else {
            const newSocket = io('http://localhost:3000', { transports: ['websocket', 'polling'] });
    
            newSocket.on('connect', () => {
                console.log('Connected to server');
            });
    
            newSocket.emit('fetchSwapEvents');
    
            newSocket.on('swapEvent', (data: SwapEvent) => {
                console.log('(Swap.tsx) Received swap event:', data);
                setSwapData(prevData => [data, ...prevData]);
            });
            
            newSocket.on('stopEvent', () => {
                newSocket.disconnect();
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
    
            setSocket(newSocket);
            setIsFetching(true);
        }
    };

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect(); // Cleanup by disconnecting socket
            }
        };
    }, [socket]);

    return (
        <div className="swap-container">
            <h2 className="swap-text">Swap Data</h2>
            <button className="button" onClick={handleFetchSwapEvents}>
                {isFetching ? 'Stop fetching' : 'Fetch Swap Events'}
            </button>
            <div className="swap-events">
                {swapData.length === 0 ? (
                    <p className="no-events">No swap events available.</p>
                ) : (
                    swapData.map((swap, index) => (
                        <div key={index} className="swap-event">
                            <p className="event-label">From: {swap.from}</p>
                            <p className="event-label">Amount0In: {swap.amount0In}</p>
                            <p className="event-label">Amount1In: {swap.amount1In}</p>
                            <p className="event-label">Amount0Out: {swap.amount0Out}</p>
                            <p className="event-label">Amount1Out: {swap.amount1Out}</p>
                            <p className="event-label">To: {swap.to}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Swap;