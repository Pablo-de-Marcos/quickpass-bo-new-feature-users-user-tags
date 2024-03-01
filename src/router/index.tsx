import { RouteObject } from 'react-router';

import Authenticated from 'src/components/Authenticated';

import BoxedSidebarLayout from 'src/layouts/BoxedSidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import managementRoutes from './management';
import baseRoutes from './base';
import RecoverPassword from 'src/content/pages/Auth/RecoverPassword';
import Dashboard from 'src/content/dashboard';

 

const router: RouteObject[] = [
  {
    path: 'recover-password',
    element: <RecoverPassword />
  },
  {
    path: '',
    element: <BaseLayout />,
    children: baseRoutes
  },
  {
    path: 'recover-password',
    element: <RecoverPassword />
  },
  {
    path: 'dashboard',
    element: (
      <Authenticated>
        <BoxedSidebarLayout />
      </Authenticated>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'management',
        children: managementRoutes
      }
    ]
  }
];

export default router;
