import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Box, Button, Typography } from '@mui/joy';
import Breadcrumbs from './Breadcrumbs';

interface PageProps {
  title: React.ReactNode;
}

export default function Page({
  title,
  children,
}: React.PropsWithChildren<PageProps>) {
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      }}
    >
      <Breadcrumbs />
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          {title}
        </Typography>
        <Button
          color="primary"
          startDecorator={<DocumentArrowDownIcon />}
          size="sm"
        >
          Download PDF
        </Button>
      </Box>
      {children}
    </Box>
  );
}
