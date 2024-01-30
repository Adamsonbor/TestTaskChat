import { createBrowserRouter } from 'react-router-dom';

import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeView />
	},
	{
		path: '/login',
		element: <LoginView />
	}
]);

export default router;

