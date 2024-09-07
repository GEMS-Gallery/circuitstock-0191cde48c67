import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Item = {
  id: bigint;
  name: string;
  description: string;
  quantity: bigint;
};

type ItemTableProps = {
  items: Item[];
  onEditItem: (item: Item) => void;
  onUpdateQuantity: (id: bigint, newQuantity: bigint) => void;
  onDeleteItem: (id: bigint) => void;
};

const ItemTable: React.FC<ItemTableProps> = ({ items, onEditItem, onUpdateQuantity, onDeleteItem }) => {
  const [editingQuantity, setEditingQuantity] = useState<{ [key: string]: string }>({});

  const handleQuantityChange = (id: bigint, value: string) => {
    setEditingQuantity({ ...editingQuantity, [id.toString()]: value });
  };

  const handleQuantityUpdate = (id: bigint) => {
    const newQuantity = BigInt(editingQuantity[id.toString()] || '0');
    onUpdateQuantity(id, newQuantity);
    setEditingQuantity({ ...editingQuantity, [id.toString()]: '' });
  };

  const columns = [
    { name: 'ID', selector: (row: Item) => Number(row.id), sortable: true },
    { name: 'Name', selector: (row: Item) => row.name, sortable: true },
    { name: 'Description', selector: (row: Item) => row.description, sortable: true },
    {
      name: 'Quantity',
      cell: (row: Item) => (
        <TextField
          type="number"
          value={editingQuantity[row.id.toString()] || Number(row.quantity)}
          onChange={(e) => handleQuantityChange(row.id, e.target.value)}
          onBlur={() => handleQuantityUpdate(row.id)}
          InputProps={{ inputProps: { min: 0 } }}
        />
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: Item) => (
        <>
          <IconButton
            color="primary"
            onClick={() => onEditItem(row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
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
