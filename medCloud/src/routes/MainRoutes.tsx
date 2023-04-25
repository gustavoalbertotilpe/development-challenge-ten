import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import New from '../pages/New';
import Edit from '../pages/Edit';

export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Home/> },
        { path: '/new', element: <New/> },
        { path: '/edit/:id', element: <Edit/> },
        { path: '*', element: <NotFound/> }
    ]);
}
