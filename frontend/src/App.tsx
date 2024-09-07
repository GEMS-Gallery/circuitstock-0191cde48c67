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

  const handleUpdateQuantity = async (id: bigint, newQuantity: bigint) => {
    setLoading(true);
    try {
      const result = await backend.updateItemQuantity(id, newQuantity);
      if ('ok' in result) {
        await fetchItems();
      } else {
        console.error('Error updating item quantity:', result.err);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Kiesub Tracker
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: '1rem' }}
      >
        Add New Item
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <ItemTable
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onDeleteItem={handleDeleteItem}
        />
      )}
      <ItemForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleCreateItem}
      />
    </Container>
  );
};

export default App;
