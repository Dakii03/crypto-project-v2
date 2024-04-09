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

interface SyncEvent {
    reserve0: number;
    reserve1: number;
}

const Swap: React.FC = () => {
    const [swapData, setSwapData] = useState<SwapEvent[]>([]);
    const [syncData, setSyncData] = useState<SyncEvent[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [socket, setSocket] = useState<any>(null);
    const [eventType, setEventType] = useState<string>('Swap'); // Default to 'swap'

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

            if (eventType === 'Both') {
                newSocket.emit('fetchSwapEvents');
                newSocket.emit('fetchSyncEvents');
            } else {
                newSocket.emit(`fetch${eventType}Events`);
            }

            newSocket.on('swapEvent', (data: SwapEvent) => {
                console.log(`(Swap.tsx) Received swap event:`, data);
                setSwapData(prevData => [data, ...prevData]);
            });

            newSocket.on('syncEvent', (data: SyncEvent) => {
                console.log(`(Swap.tsx) Received sync event:`, data);
                setSyncData(prevData => [data, ...prevData]);
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
                socket.disconnect(); // Cleanup
            }
        };
    }, [socket]);

    const handleEventTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!isFetching) {
            setEventType(event.target.value);
        }
    };

    return (
        <div className="swap-container">
            <h2 className="swap-text">Events listener</h2>
            <div>
                <label htmlFor="eventType" id="type">Event Type:</label>
                <select id="eventType" value={eventType} onChange={handleEventTypeChange} disabled={isFetching}>
                    <option value="Swap">Swap</option>
                    <option value="Sync">Sync</option>
                    <option value="Both">Both</option>
                </select>
            </div>
            <button className="button" onClick={handleFetchSwapEvents}>
                {isFetching ? 'Stop fetching' : `Fetch ${eventType === 'Both' ? 'Both' : (eventType.charAt(0).toUpperCase() + eventType.slice(1))} Events`}
            </button>
            <div className="swap-events">
                {eventType !== 'Sync' && (
                    swapData.map((swap, index) => (
                        <div key={index} className="swap-event">
                            {swap.from !== undefined && <p className="event-label">From: {swap.from}</p>}
                            {swap.amount0In !== undefined && swap.amount0In !== 0 && <p className="event-label">Amount0In: {swap.amount0In}</p>}
                            {swap.amount1In !== undefined && swap.amount1In !== 0 && <p className="event-label">Amount1In: {swap.amount1In}</p>}
                            {swap.amount0Out !== undefined && swap.amount0Out !== 0 && <p className="event-label">Amount0Out: {swap.amount0Out}</p>}
                            {swap.amount1Out !== undefined && swap.amount1Out !== 0 && <p className="event-label">Amount1Out: {swap.amount1Out}</p>}
                            {swap.to !== undefined && <p className="event-label">To: {swap.to}</p>}
                        </div>
                    ))
                )}
                {eventType !== 'Swap' && (
                    syncData.map((sync, index) => (
                        <div key={index} className="swap-event">
                            {sync.reserve0 !== undefined && sync.reserve0 !== 0 && <p className="event-label">Reserve0: {sync.reserve0}</p>}
                            {sync.reserve1 !== undefined && sync.reserve1 !== 0 && <p className="event-label">Reserve1: {sync.reserve1}</p>}
                        </div>
                    ))
                )}
                {swapData.length === 0 && syncData.length === 0 && (
                    <p className="no-events">No {eventType} events available.</p>
                )}
            </div>
        </div>
    );
};

export default Swap;
