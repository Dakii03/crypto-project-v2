import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './Send.css';

interface FormData {
  to: string;
  amount: string;
}

interface TransactionResponse {
  transactionHash: string;
}

function Send() {
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({ to: '', amount: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<TransactionResponse>('http://localhost:3000/send', formData);
      setTransactionHash(response.data.transactionHash);
      setFormData({ to: '', amount: '' }); // Clear form after successful submission
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <div className='send-container'>
        <h2 className='send-heading'>Send</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='label' htmlFor="to">To:</label>
            <input className='input-field' type="text" id="to" name="to" value={formData.to} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label className='label' htmlFor="amount">Amount:</label>
            <input className='input-field' type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
          <button className='button' type="submit">Send</button>
        </form>
      </div>
      {transactionHash && <p className='transaction-hash'>Transaction Hash: {transactionHash}</p>}
    </div>
  );
}

export default Send;
