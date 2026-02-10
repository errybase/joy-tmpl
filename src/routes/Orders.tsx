import {
  ArrowPathIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentArrowDownIcon,
  EllipsisHorizontalIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Box,
  Button,
  Chip,
  type ColorPaletteProp,
  Divider,
  Dropdown,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  iconButtonClasses,
  Link,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Typography,
} from '@mui/joy';
import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import DataTable, { type Column } from '@/components/DataTable';
import Page from '@/components/Page';

interface Customer {
  initial: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Refunded' | 'Paid' | 'Cancelled';
  customer: Customer;
}

const rows: Order[] = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
  },
  {
    id: 'INV-1228',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'K',
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
  },
  {
    id: 'INV-1227',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
  },
  {
    id: 'INV-1226',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
  {
    id: 'INV-1225',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: 'INV-1224',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: 'INV-1223',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: 'INV-1221',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
  },
  {
    id: 'INV-1220',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
  },
  {
    id: 'INV-1219',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
  },
  {
    id: 'INV-1218',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'K',
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
  },
  {
    id: 'INV-1217',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
  },
  {
    id: 'INV-1216',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
];

export function Component() {
  const [open, setOpen] = useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <Breadcrumbs.Provider element="Orders">
      <Page
        title="Orders"
        actions={
          <Button
            color="primary"
            startDecorator={<DocumentArrowDownIcon />}
            size="sm"
          >
            Download PDF
          </Button>
        }
      >
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
        >
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<MagnifyingGlassIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FunnelIcon />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" level="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {renderFilters()}
                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet>
            </ModalDialog>
          </Modal>
        </Sheet>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            borderRadius: 'sm',
            py: 2,
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            gap: 1.5,
            '& > *': {
              minWidth: { xs: '120px', md: '160px' },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for order</FormLabel>
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<MagnifyingGlassIcon />}
            />
          </FormControl>
          {renderFilters()}
        </Box>
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >
          <DataTable rows={rows} columns={columns} />
        </Sheet>
        <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<ChevronLeftIcon />}
          >
            Previous
          </Button>

          <Box sx={{ flex: 1 }} />
          {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
            <IconButton
              key={page}
              size="sm"
              variant={Number(page) ? 'outlined' : 'plain'}
              color="neutral"
            >
              {page}
            </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<ChevronRightIcon />}
          >
            Next
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {rows.map((listItem) => (
            <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <ListItemContent
                  sx={{ display: 'flex', gap: 2, alignItems: 'start' }}
                >
                  <ListItemDecorator>
                    <Avatar size="sm">{listItem.customer.initial}</Avatar>
                  </ListItemDecorator>
                  <div>
                    <Typography gutterBottom sx={{ fontWeight: 600 }}>
                      {listItem.customer.name}
                    </Typography>
                    <Typography level="body-xs" gutterBottom>
                      {listItem.customer.email}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <Typography level="body-xs">{listItem.date}</Typography>
                      <Typography level="body-xs">&bull;</Typography>
                      <Typography level="body-xs">{listItem.id}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Link level="body-sm" component="button">
                        Download
                      </Link>
                      <OrderMenu />
                    </Box>
                  </div>
                </ListItemContent>
                <OrderStatus status={listItem.status} />
              </ListItem>
              <ListDivider />
            </List>
          ))}
          <Box
            className="Pagination-mobile"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              py: 2,
            }}
          >
            <IconButton
              aria-label="previous page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography level="body-sm" sx={{ mx: 'auto' }}>
              Page 1 of 10
            </Typography>
            <IconButton
              aria-label="next page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Page>
    </Breadcrumbs.Provider>
  );
}

const columns: Column<Order>[] = [
  {
    header: 'Invoice',
    sortable: true,
    width: 120,
    Cell: ({ row }) => <Typography level="body-xs">{row.id}</Typography>,
  },
  {
    header: 'Date',
    width: 140,
    Cell: ({ row }) => <Typography level="body-xs">{row.date}</Typography>,
  },
  {
    header: 'Status',
    width: 140,
    Cell: ({ row }) => <OrderStatus status={row.status} />,
  },
  {
    header: 'Customer',
    width: 240,
    Cell: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar size="sm">{row.customer.initial}</Avatar>
        <div>
          <Typography level="body-xs">{row.customer.name}</Typography>
          <Typography level="body-xs">{row.customer.email}</Typography>
        </div>
      </Box>
    ),
  },
  {
    width: 140,
    Cell: () => (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Link level="body-xs" component="button">
          Download
        </Link>
        <OrderMenu />
      </Box>
    ),
  },
];

function OrderMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <EllipsisHorizontalIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function OrderStatus({ status }: Pick<Order, 'status'>) {
  return (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        {
          Paid: <CheckIcon />,
          Refunded: <ArrowPathIcon />,
          Cancelled: <NoSymbolIcon />,
        }[status]
      }
      color={
        {
          Paid: 'success',
          Refunded: 'neutral',
          Cancelled: 'danger',
        }[status] as ColorPaletteProp
      }
    >
      {status}
    </Chip>
  );
}
