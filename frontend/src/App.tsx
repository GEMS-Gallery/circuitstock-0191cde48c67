import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ItemTable from './components/ItemTable';
import ItemForm from './components/ItemForm';

type Item = {
  id: bigint;
  name: string;
  description: string;
  quantity: bigint;
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await backend.getAllItems();
      setItems(result);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateItem = async (item: Omit<Item, 'id'>) => {
    setLoading(true);
    try {
      const result = await backend.createItem(item);
      if ('ok' in result) {
        await fetchItems();
        setOpenForm(false);
      } else {
        console.error('Error creating item:', result.err);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
    setLoading(false);
  };

  const handleUpdateItem = async (id: bigint, updatedItem: Omit<Item, 'id'>) => {
    setLoading(true);
    try {
      const result = await backend.updateItem(id, updatedItem);
      if ('ok' in result) {
        await fetchItems();
        setOpenForm(false);
        setEditingItem(null);
      } else {
        console.error('Error updating item:', result.err);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
    setLoading(false);
  };

  const handleDeleteItem = async (id: bigint) => {
    setLoading(true);
    try {
      const result = await backend.deleteItem(id);
      if ('ok' in result) {
        await fetchItems();
      } else {
        console.error('Error deleting item:', result.err);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setLoading(false);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setOpenForm(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Kiesub Tracker
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setEditingItem(null);
          setOpenForm(true);
        }}
        style={{ marginBottom: '1rem' }}
      >
        Add New Item
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <ItemTable
          items={items}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      )}
      <ItemForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingItem(null);
        }}
        onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
        initialData={editingItem}
      />
    </Container>
  );
};

export default App;
