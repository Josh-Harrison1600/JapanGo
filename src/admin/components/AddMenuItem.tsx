import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddMenuItemProps {
  refreshItems: () => void;
}

function AddMenuItem({ refreshItems }: AddMenuItemProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

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
      setCategory('');
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

      <select
        value={category}
        className="border px-3 py-2 w-full"
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>Select Category</option>
        {[
          "Appetizer",
          "A La Carte",
          "Hot Dishes & Noodles",
          "Lunch",
          "Rolls",
          "Special Rolls",
          "Sushi, Sashimi & Roll",
          "Salad",
          "Soup",
          "Vegetarian",
          "Tempura"
        ].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

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

      <button type="submit" className="bg-black hover:bg-gray-700 transition-all duration-300 text-white px-4 py-2 cursor-pointer">Add Item</button>
      
      {message && (
      <p className="text-green-600">{message}</p>
    )}

    </form>


  );
}

export default AddMenuItem;
