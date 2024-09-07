import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

type ItemFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; quantity: bigint }) => void;
};

const ItemForm: React.FC<ItemFormProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit({
      name: data.name,
      description: data.description,
      quantity: BigInt(data.quantity),
    });
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            rules={{ required: 'Quantity is required', min: 0 }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemForm;
