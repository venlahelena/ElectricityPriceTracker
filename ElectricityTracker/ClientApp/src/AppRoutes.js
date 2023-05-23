import Home from "./pages/Home";
import FetchPriceData from './pages/FetchPriceData';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-data',
    element: <FetchPriceData />
  },
];

export default AppRoutes;
