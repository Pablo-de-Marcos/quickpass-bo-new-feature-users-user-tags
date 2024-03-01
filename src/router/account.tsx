import { Suspense, lazy } from 'react';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Account
const RecoverPassword = Loader(
  lazy(() => import('src/content/pages/Auth/RecoverPassword'))
);

const accountRoutes = [
  {
    path: 'recover-password',
    element: <RecoverPassword />
  }
];

export default accountRoutes;
