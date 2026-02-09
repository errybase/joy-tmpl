import { HomeIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/joy';
import { Outlet } from 'react-router';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Root() {
  return (
    <Breadcrumbs.Provider element={<Box component={HomeIcon} fontSize={18} />}>
      <Outlet />
    </Breadcrumbs.Provider>
  );
}
