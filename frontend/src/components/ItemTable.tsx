import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Item = {
  id: bigint;
  name: string;
  description: string;
  quantity: bigint;
};

type ItemTableProps = {
  items: Item[];
  onUpdateQuantity: (id: bigint, newQuantity: bigint) => void;
  onDeleteItem: (id: bigint) => void;
};

const ItemTable: React.FC<ItemTableProps> = ({ items, onUpdateQuantity, onDeleteItem }) => {
  const columns = [
    { name: 'ID', selector: (row: Item) => Number(row.id), sortable: true },
    { name: 'Name', selector: (row: Item) => row.name, sortable: true },
    { name: 'Description', selector: (row: Item) => row.description, sortable: true },
    { name: 'Quantity', selector: (row: Item) => Number(row.quantity), sortable: true },
    {
      name: 'Actions',
      cell: (row: Item) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onUpdateQuantity(row.id, row.quantity)}
          >
            Update
          </Button>
          <IconButton
            color="secondary"
            onClick={() => onDeleteItem(row.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15, 20]}
    />
  );
};

export default ItemTable;
