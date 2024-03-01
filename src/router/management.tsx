import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Management:
const Events = Loader(lazy(() => import('src/content/management/Events')));
const CreateEvent = Loader(lazy(() => import('src/content/management/Events/create')));
const EditEvent = Loader(lazy(() => import('src/content/management/Events/edit')));
const Users = Loader(lazy(() => import('src/content/management/Users')));
const Roles = Loader(lazy(() => import('src/content/management/Roles')));
const CreateRol = Loader(lazy(() => import('src/content/management/Roles/create')));
const Notifications = Loader(lazy(() => import('src/content/management/Notifications')));
const CreateNotification = Loader(lazy(() => import('src/content/management/Notifications/create')));
const EditNotification = Loader(lazy(() => import('src/content/management/Notifications/edit')));
const News = Loader(lazy(() => import('src/content/management/News')));
const CreateNew = Loader(lazy(() => import('src/content/management/News/create')));
const EditNew = Loader(lazy(() => import('src/content/management/News/edit')));
const Statistics = Loader(lazy(() => import('src/content/management/Statistics')));
const Tags = Loader(lazy(() => import('src/content/management/Tags')));

const managementRoutes = [
  {
    path: '',
    element: <Navigate to="events" replace />
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Events />
      },
      {
        children: [
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'create',
            element: <CreateEvent />
          },
          {
            path: 'edit',
            element: <EditEvent />
          }
        ]
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Users />
      }
    ]
  },
  {
    path: 'roles',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Roles />
      },
      {
        children: [
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'create',
            element: <CreateRol />
          }
        ]
      }
    ]
  },
  {
    path: 'notifications',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Notifications />
      },
      {
        children: [
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'create',
            element: <CreateNotification />
          },
          {
            path: 'edit',
            element: <EditNotification />
          }
        ]
      }
    ]
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <News />
      },
      {
        children: [
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'create',
            element: <CreateNew />
          },
          {
            path: 'edit',
            element: <EditNew />
          }
        ]
      }
    ]
  },
  {
    path: 'statistics',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <Statistics />
      }
    ]
  },
  {
    path: 'tags',
    children: [
      {
        path: '',
        element: <Tags />
      }
    ]
  }
];

export default managementRoutes;
