import { useState } from 'react';
import { FiCoffee } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Banner from '../components/Home/Banner';
import BackgroundImage from '../components/Home/Coffee/BackgroundImage';
import CoffeeList from '../components/Home/Coffee/CoffeeList';
import FeatureList from '../components/Home/FeatureList';
import FollowUs from '../components/Home/FollowUs';
import SectionInfo from '../components/Home/SectionInfo';
import CoffeeModal from '../components/Modal/CoffeeModal';
import useFetchCoffees from '../hooks/useFetchCoffees';
import { ICoffee } from '../types';
import { closeModal, defaultFormData, showModal } from '../utils';
import { createCoffee, deleteCoffee, updateCoffee } from '../utils/coffeeUtils';

export default function HomePage() {
  const { coffees, fetchCoffees } = useFetchCoffees<ICoffee>();
  const [formData, setFormData] = useState(defaultFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<ICoffee | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or Update coffee
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      await updateCoffee(editingId, formData); // Update
    } else {
      await createCoffee(formData); // Create
    }

    setFormData(defaultFormData);
    setEditingId(null);
    fetchCoffees();
    closeModal('coffee-modal');
  };

  // Edit coffee
  const handleEdit = (coffee: ICoffee) => {
    setEditingId(coffee._id);
    setFormData(coffee);
    showModal('coffee-modal');
  };

  // Delete coffee
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure you want to delete the coffee?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E64942',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCoffee(id); // Delete
        fetchCoffees();
      }
    });
  };

  return (
    <main>
      {/* Banner & Features */}
      <Banner />
      <FeatureList />

      {/* Our Popular Products */}
      <section className="relative">
        <div className="container py-28">
          <div className="flex flex-col items-center justify-center pb-12">
            <SectionInfo
              title="Our Popular Products"
              text="--- Sip & Savor ---"
            />
            <button
              onClick={() => {
                setFormData(defaultFormData);
                setEditingId(null);
                setSelectedCoffee(null);
                showModal('coffee-modal');
              }}
              className="text-2xl font-bold btn-add-coffee"
            >
              Add Coffee <FiCoffee />
            </button>
          </div>

          {/* Display coffee list */}
          <CoffeeList
            coffees={coffees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setSelectedCoffee={setSelectedCoffee}
          />

          {/* Modal */}
          <CoffeeModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            editingId={editingId}
            selectedCoffee={selectedCoffee}
          />

          <BackgroundImage />
        </div>
      </section>

      {/* Follow Us */}
      <section>
        <FollowUs />
      </section>
    </main>
  );
}
