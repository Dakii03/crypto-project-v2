import { useState, useEffect } from 'react';
import axios from 'axios';
import './Blocks.css';

interface BlockData {
  blockNumber: number;
  latestBlock: number;
}

function Blocks() {
  const [blockData, setBlockData] = useState<BlockData>({ blockNumber: 0, latestBlock: 0 });

  useEffect(() => {
    async function fetchBlockData() {
      try {
        const response = await axios.get<BlockData>('http://localhost:3000/blocks');
        setBlockData(response.data);
      } catch (error) {
        console.error('Error fetching block data:', error);
      }
    }

    fetchBlockData();
  }, []);

  return (
    <div className="blocks-container">
      <h2 className="blocks-heading">Blocks</h2>
      <p className="blocks-info">Provider Block Number:</p>
      <p className="blocks-value">{blockData.blockNumber}</p>
      <p className="blocks-info">Latest Block Number:</p>
      <p className="blocks-value">{blockData.latestBlock}</p>
    </div>
  );
}

export default Blocks;
