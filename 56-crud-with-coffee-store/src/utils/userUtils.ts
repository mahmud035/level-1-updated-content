import { showAlert } from '.';

export const saveUserToDatabase = async (name: string, email: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  if (res.ok) {
    showAlert('User saved successfully', 'success', 'Close');
  } else {
    showAlert('Failed to save user', 'error', 'Close');
  }
};
