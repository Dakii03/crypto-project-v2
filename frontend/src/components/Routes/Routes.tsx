
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Blocks from '../Blocks/Blocks';
import Balance from '../Balance/Balance';
import Send from '../Send/Send';
import Swap from '../Swap/Swap';

const Routes = () => {
  return (
    <div className="content-wrapper"> {}
      <RouterRoutes>
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/send" element={<Send />} />
        <Route path="/swap" element={<Swap />} />
      </RouterRoutes>
    </div>
  );
};

export default Routes;