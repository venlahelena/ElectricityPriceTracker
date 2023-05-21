import Home from "./components/Home";
import FetchPriceData from './components/FetchPriceData';

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
