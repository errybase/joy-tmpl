import { Box } from '@mui/joy';
import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Header />
      <Sidebar />
      <Outlet />
    </Box>
  );
}
