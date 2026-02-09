import { ArrowLongDownIcon } from '@heroicons/react/24/outline';
import { Box, Checkbox, Link, Table } from '@mui/joy';
import type React from 'react';
import { useState } from 'react';

export interface ColumnProps<T> {
  row: T;
}

export interface Column<T> {
  header?: React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  Cell: React.ComponentType<ColumnProps<T>>;
}

interface Props<T> {
  rows: T[];
  columns: Column<T>[];
  getRowKey?: (row: T, index: number, rows: T[]) => React.Key;
}

export default function DataTable<T>({
  rows,
  columns,
  getRowKey = getRowIndex,
}: Props<T>) {
  const [order, setOrder] = useState<Order>('desc');
  const [selectedKeys, setSelectedKeys] = useState<readonly React.Key[]>([]);

  return (
    <Table
      aria-labelledby="tableTitle"
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px',
      }}
    >
      <Box
        component="thead"
        sx={{
          '--TableCell-paddingY': '12px',
          '--TableCell-paddingX': '6px',
        }}
      >
        <tr>
          <th
            style={{
              width: 48,
              textAlign: 'center',
            }}
          >
            <Checkbox
              size="sm"
              indeterminate={
                selectedKeys.length > 0 && selectedKeys.length !== rows.length
              }
              checked={selectedKeys.length === rows.length}
              onChange={(event) => {
                setSelectedKeys(
                  event.target.checked ? rows.map(getRowKey) : [],
                );
              }}
              color={
                selectedKeys.length > 0 || selectedKeys.length === rows.length
                  ? 'primary'
                  : undefined
              }
              sx={{ verticalAlign: 'text-bottom' }}
            />
          </th>
          {columns.map(({ header, width, sortable }, idx) => (
            <Box key={idx.toString()} component="th" sx={{ width }}>
              {sortable ? (
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowLongDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
                      ? { '& svg': { transform: 'rotate(0deg)' } }
                      : { '& svg': { transform: 'rotate(180deg)' } },
                  ]}
                >
                  {header}
                </Link>
              ) : (
                header
              )}
            </Box>
          ))}
        </tr>
      </Box>
      <tbody>
        {[...rows].map((row, rowIdx, rows) => {
          const key = getRowKey(row, rowIdx, rows);
          const selected = selectedKeys.includes(key);

          return (
            <tr key={key}>
              <td style={{ textAlign: 'center', width: 120 }}>
                <Checkbox
                  size="sm"
                  checked={selected}
                  color={selected ? 'primary' : undefined}
                  onChange={(event) => {
                    setSelectedKeys((keys) =>
                      event.target.checked
                        ? keys.concat(key)
                        : keys.filter((_key) => _key !== key),
                    );
                  }}
                  slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </td>
              {columns.map(({ Cell }, colIdx) => (
                <td key={colIdx.toString()}>
                  <Cell row={row} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function getRowIndex<T>(_: T, index: number) {
  return index;
}

type Order = 'asc' | 'desc';

export function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
