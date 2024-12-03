import { showAlert } from '.';
import { IFormData } from '../types';

export const createCoffee = async (formData: IFormData) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/coffees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    showAlert('Coffee added successfully', 'success', 'Close');
  } else {
    showAlert('Failed to add coffee', 'error', 'Close');
  }
};

export const updateCoffee = async (id: string, formData: IFormData) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/coffees/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }
  );

  if (res.ok) {
    showAlert('Coffee updated successfully', 'success', 'Close');
  } else {
    showAlert('Failed to update coffee', 'error', 'Close');
  }
};

export const deleteCoffee = async (id: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/coffees/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (res.ok) {
    showAlert('Coffee deleted successfully', 'success', 'Close');
  } else {
    showAlert('Failed to delete coffee', 'error', 'Close');
  }
};
