import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout';
import Root from '@/routes/Root';

export default createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        lazy: () => import('@/routes/Home'),
      },
      {
        Component: Root,
        children: [],
      },
    ],
  },
]);
