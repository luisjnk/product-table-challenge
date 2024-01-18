import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './products-routes';

const router = createBrowserRouter([...productRoutes]);

export default router;
