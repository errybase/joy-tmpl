import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  Box,
  Breadcrumbs as JoyBreadcrumbs,
  Link as JoyLink,
  Typography,
} from '@mui/joy';
import { createContext, useContext } from 'react';
import { Link, useResolvedPath } from 'react-router';
import MatchPath from './MatchPath';

interface Breadcrumb {
  path: string;
  element: React.ReactNode;
}

const BreadcrumbsContext = createContext<Breadcrumb[]>([]);

export default function Breadcrumbs() {
  const breadcrumbs = useContext(BreadcrumbsContext);

  if (breadcrumbs.length === 0) return null

  return (
    <JoyBreadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<Box component={ChevronRightIcon} fontSize="sm" />}
      sx={{ pl: 0 }}
    >
      {breadcrumbs.map(({ path, element }) => (
        <MatchPath key={path} path={path}>
          {(active) =>
            active ? (
              <Typography
                color="primary"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                {element}
              </Typography>
            ) : (
              <JoyLink
                component={Link}
                to={path}
                color="neutral"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                {element}
              </JoyLink>
            )
          }
        </MatchPath>
      ))}
    </JoyBreadcrumbs>
  );
}

Breadcrumbs.Provider = ({
  children,
  ...rest
}: React.PropsWithChildren<Omit<Breadcrumb, 'path'>>) => {
  const prev = useContext(BreadcrumbsContext);
  const { pathname } = useResolvedPath('');
  const breadcrumb = { ...rest, path: pathname };

  return (
    <BreadcrumbsContext value={[...prev, breadcrumb]}>
      {children}
    </BreadcrumbsContext>
  );
};
