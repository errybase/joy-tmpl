import { RouterProvider } from 'react-router';
import Theme from '@/components/Theme';
import router from '@/router';

const App = () => {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
};

export default App;
