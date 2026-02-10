import {
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  GlobalStyles,
  IconButton,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  listItemButtonClasses,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import React, { useState } from 'react';
import { Link } from 'react-router';
import ColorSchemeToggle from './ColorSchemeToggle';
import MatchPath from './MatchPath';

function openSidebar() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
  }
}

function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--SideNavigation-slideIn');
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <GlobeAsiaAustraliaIcon />
        </IconButton>
        <Typography level="title-lg">Acme Co.</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<MagnifyingGlassIcon />}
        placeholder="Search"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {items.map(({ icon, label, decorator, path, children }, idx) => {
            const nested = !!children?.length;

            return (
              <ListItem key={idx.toString()} nested={nested}>
                {nested ? (
                  <Toggler
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        {icon}
                        <ListItemContent>
                          <Typography level="title-sm">{label}</Typography>
                        </ListItemContent>
                        <Box
                          component={ChevronDownIcon}
                          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5, mt: 0.5 }}>
                      {children.map(({ path, label }) => (
                        <ListItem key={path}>
                          <MatchPath path={path}>
                            {active => (
                              <ListItemButton component={Link} to={path} selected={active}>
                                {label}
                              </ListItemButton>
                            )}
                          </MatchPath>
                        </ListItem>
                      ))}
                    </List>
                  </Toggler>
                ) : typeof path === 'string' && (
                  <MatchPath path={path}>
                    {active => (
                      <ListItemButton selected={active} component={Link} to={path}>
                        {icon}
                        <ListItemContent>
                          <Typography level="title-sm">{label}</Typography>
                        </ListItemContent>
                        {decorator}
                      </ListItemButton>
                    )}
                  </MatchPath>
                )}
              </ListItem>
            );
          })}
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <QuestionMarkCircleIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <AdjustmentsHorizontalIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: 'none' }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">
              <XMarkIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress
            variant="outlined"
            value={80}
            determinate
            sx={{ my: 1 }}
          />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" component={Link} to='sign-in'>
          <ArrowRightStartOnRectangleIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
const items = [
  {
    path: '',
    icon: <HomeIcon />,
    label: 'Home',
  },
  {
    path: 'orders',
    icon: <ShoppingCartIcon />,
    label: 'Orders',
  },
  {
    path: 'messages',
    icon: <ChatBubbleLeftRightIcon />,
    label: 'Messages',
    decorator: (
      <Chip size="sm" color="primary" variant="solid">
        4
      </Chip>
    ),
  },
  {
    icon: <UsersIcon />,
    label: 'Users',
    children: [
      {
        path: 'profile',
        label: 'My profile',
      },
      {
        path: 'users/new',
        label: 'Create a new user',
      },
    ],
  },
];
