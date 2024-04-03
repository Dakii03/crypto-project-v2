# Ethereum DApp

Welcome to the Ethereum DApp repository! This repository contains the code for a decentralized application (DApp) that interacts with the Ethereum blockchain. The application comprises both backend and frontend components to manage Ethereum transactions, retrieve account balance, fetch block data, and monitor swap events.

## Features

- Retrieve account balance from Ethereum network
- Fetch block data including latest block number and provider block number
- Send Ethereum transactions to specified addresses
- Monitor swap events in real-time

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- Node.js (version 14.x or higher)
- npm (Node Package Manager)
- React (for frontend)
- NestJS (for backend)
- Ethereum wallet with private key and API key for Ethereum provider (e.g., Alchemy)

## Getting Started

Follow these steps to get the application up and running:

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies using `yarn install`.
3. Set up environment variables by creating a `.env` file. Provide your Ethereum API key and private key in this file.
```
API_KEY=your_ethereum_api_key
PRIVATE_KEY=your_ethereum_private_key
```
4. Run the backend server using `yarn start:dev`. The server will run on port 3000 by default.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using `yarn install`.
3. Ensure the backend server is running.
4. Run the frontend application using `yarn dev`. The application will be available at `http://localhost:5173`.

## Usage

Once the application is set up and running, you can access the following functionalities:
- **Balance**: View your Ethereum account balance.
- **Blocks**: Retrieve block data including the latest block number and provider block number.
- **Send**: Send Ethereum transactions by providing the recipient address and amount.
- **Swap**: Monitor swap events in real-time.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.
