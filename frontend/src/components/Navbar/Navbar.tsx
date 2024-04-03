import React, { useState } from 'react';
import './Navbar.css'; 

interface NavbarProps {
  routes: { path: string; label: string }[];
  walletAddress: string;
}

const Navbar: React.FC<NavbarProps> = ({ routes, walletAddress }) => {
  const [showFullAddress, setShowFullAddress] = useState(false);

  const toggleAddressDisplay = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <a href={route.path}>{route.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-right" onClick={toggleAddressDisplay}>
        <p>{showFullAddress ? walletAddress : `Wallet address: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}</p>
      </div>
    </nav>
  );
};

export default Navbar;
