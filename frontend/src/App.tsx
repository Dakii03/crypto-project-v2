import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './components/Routes/Routes'; 

const routes = [
  { path: '/blocks', label: 'Blocks' },
  { path: '/balance', label: 'Balance' },
  { path: '/send', label: 'Send' },
  { path: '/swap', label: 'Events listener'}
];

function App() {
  const walletAddress = '0xf01d5D64c75Bb2e2b0da3F4ebD44Fc5C60cB5dfa'; 
  return (
    <Router>
      <div className="App">
        <Navbar routes={routes} walletAddress={walletAddress} />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
