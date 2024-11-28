import Swal, { SweetAlertIcon } from 'sweetalert2';

export const defaultFormData = {
  name: '',
  chef: '',
  supplier: '',
  taste: '',
  category: '',
  details: '',
  price: '',
  photoURL: '',
};

export const showModal = (id: string) => {
  (document.getElementById(id) as HTMLDialogElement).showModal();
};

export const closeModal = (id: string) => {
  (document.getElementById(id) as HTMLDialogElement).close();
};

export const showAlert = (
  title: string,
  icon: SweetAlertIcon,
  confirmButtonText: string,
  confirmButtonColor: string = '#63C7F7'
) => {
  Swal.fire({
    title,
    icon,
    confirmButtonText,
    confirmButtonColor,
  });
};
