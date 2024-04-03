import { useState, useEffect } from 'react';
import axios from 'axios';
import './Balance.css';

interface BalanceData {
  balance: string;
}

function Balance() {
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get<BalanceData>('http://localhost:3000/balance');
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="balance-container">
      <h2 className="balance-text">Balance</h2>
      <p className="balance-value">{balance}</p>
    </div>
  );
}

export default Balance;
