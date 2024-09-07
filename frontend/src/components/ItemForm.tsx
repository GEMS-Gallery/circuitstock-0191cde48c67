import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

type Item = {
  id: bigint;
  name: string;
  description: string;
  quantity: bigint;
};

type ItemFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: bigint | undefined, data: Omit<Item, 'id'>) => void;
  initialData?: Item | null;
};

const ItemForm: React.FC<ItemFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        quantity: Number(initialData.quantity),
      });
    } else {
      reset({
        name: '',
        description: '',
        quantity: '',
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: any) => {
    onSubmit(
      initialData ? initialData.id : undefined,
      {
        name: data.name,
        description: data.description,
        quantity: BigInt(data.quantity),
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Item' : 'Add New Item'}</DialogTitle>
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
            {initialData ? 'Update' : 'Add'} Item
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemForm;
