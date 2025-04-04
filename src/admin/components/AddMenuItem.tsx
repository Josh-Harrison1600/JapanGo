import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';


interface AddMenuItemProps {
  refreshItems: () => void;
}

function AddMenuItem({ refreshItems }: AddMenuItemProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  //Category options for the dropdown menu
  const categoryOptions = [
    { value: "Appetizer", label: "Appetizer" },
    { value: "A La Carte", label: "A La Carte" },
    { value: "Hot Dishes & Noodles", label: "Hot Dishes & Noodles" },
    { value: "Lunch", label: "Lunch" },
    { value: "Rolls", label: "Rolls" },
    { value: "Special Rolls", label: "Special Rolls" },
    { value: "Sushi, Sashimi & Roll", label: "Sushi, Sashimi & Roll" },
    { value: "Salad", label: "Salad" },
    { value: "Soup", label: "Soup" },
    { value: "Vegetarian", label: "Vegetarian" },
    { value: "Tempura", label: "Tempura" },
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/menu-items', {
        name,
        category,
        price: parseFloat(price),
        description,
        imageUrl,
      });

      toast.success('Item Added Successfully!');


      // Clear form
      setName('');
      setCategory([]);
      setPrice('');
      setDescription('');
      setImageUrl('');

      // Refresh menu list
      refreshItems();
    } catch (err) {
      setMessage('Error adding item');
      console.error('Error adding item', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-md mb-6">
      <h2 className="text-xl font-bold">Add New Menu Item</h2>

      <input
        type="text"
        placeholder="Name"
        className="border px-3 py-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Select
        isMulti
        options={categoryOptions}
        value={categoryOptions.filter(opt => category.includes(opt.value))}
        onChange={(selectedOptions) =>
          setCategory((selectedOptions as { value: string; label: string }[]).map(opt => opt.value))
        }
        placeholder="Select Category"
        className="w-full"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        styles={{
          control: (base) => ({
            ...base,
            border: '1px solid #000000',
            borderRadius: 0,
            backgroundColor: '#f3f4f6', 
            minHeight: '40px',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#000000',
            },
            borderColor: '#000000',
          }),
          menu: (base) => ({
            ...base,
          }),
        }}
      />


      <input
        type="number"
        placeholder="Price"
        className="border px-3 py-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border px-3 py-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        className="border px-3 py-2 w-full"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        
      />

      <textarea 
        placeholder="Box Description"
        className="border px-3 py-2 w-full"
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />

      <button type="submit" className="bg-black hover:bg-gray-700 transition-all duration-300 text-white px-4 py-2 cursor-pointer">Add Item</button>
      
      {message && (
      <p className="text-green-600">{message}</p>
    )}

    </form>


  );
}

export default AddMenuItem;
