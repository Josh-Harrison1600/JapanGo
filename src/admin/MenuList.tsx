import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MenuList({ items, onDelete, refreshItems }: { items?: any[]; onDelete: (id: string) => void, refreshItems: () => void }) { 
    const [deleteTarget, setDeleteTarget] = useState<{ id: string, name: string } | null>(null);
    const [confirmName, setConfirmName] = useState('');

    const [editTarget, setEditTarget] = useState<any | null>(null);
    const [editForm, setEditForm] = useState({
      name: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
    })

    //function for the edit modal
    const openEditModal = (item: any) => {
      setEditTarget(item);
      setEditForm({
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description || '',
        imageUrl: item.imageUrl || '',
      });
    };

    //Push the changes to setEditForm
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    //function to send the edit to the api
    const handleEditSubmit = async () => {
      try {
          await axios.put(`http://localhost:5000/menu-items/${editTarget._id}`, editForm);
          refreshItems();
          setEditTarget(null);
          toast.success('Item Updated Successfully!');
      }catch(err){
        console.error("Error updating item", err);
      }
    };

    if (!items || items.length === 0) {
      return <p>No items available.</p>;
    }

    return (
      <div>
        <h2 className="text-2xl mb-4">Menu Items</h2>
        <table className="w-full border">
          <thead>
            <tr className="border">
              <th>Name</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border text-center">
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2 p-2">
                    {/* Delete Button */}
                    <button 
                        onClick={() => setDeleteTarget({ id: item._id, name: item.name })}
                        className="bg-red-500 hover:bg-red-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer mb-2 mt-2" 
                    >
                        Delete
                    </button>
                    {/* Edit Button */}
                    <button 
                        onClick={() => openEditModal(item)}
                        className="bg-blue-500 hover:bg-blue-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer"
                    >
                        Edit
                    </button>
                  </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete confirmation modal */}
        {deleteTarget && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
                <div className="bg-white p-6 shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                    <p>Type <strong>{deleteTarget.name}</strong> to confirm deletion:</p>
                    <input 
                        type="text"
                        className="border px-3 py-2 w-full mt-4"
                        value={confirmName}
                        onChange={(e) => setConfirmName(e.target.value)}
                    />
                    <div className="flex justify-end mt-4 space-x-2">
                        <button 
                            onClick={() => {
                                if(confirmName === deleteTarget.name) {
                                    onDelete(deleteTarget.id);
                                    setDeleteTarget(null);
                                    setConfirmName('');
                                    toast.success('Item Deleted Successfully!');
                                }else{
                                    toast.error('Name does not match!');
                                }
                            }}
                            className="bg-red-500 text-white px-4 py-2 cursor-pointer"
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={() => {
                                setDeleteTarget(null);
                                setConfirmName('');
                            }}
                            className="bg-gray-500 text-white px-4 py-2 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        )}

        {/* Edit Modal */}
        {editTarget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Item</h2>
              <input 
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="border px-3 py-2 w-full mb-2"
                placeholder="Name"
              />
              <input 
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="border px-3 py-2 w-full mb-2"
                placeholder="Category"
              />
              <input 
                type="number"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                className="border px-3 py-2 w-full mb-2"
                placeholder="Price"
              />
              <input 
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="border px-3 py-2 w-full mb-2"
                placeholder="Description"
              />
              <input 
                type="text"
                name="imageUrl"
                value={editForm.imageUrl}
                onChange={handleEditChange}
                className="border px-3 py-2 w-full mb-2"
                placeholder="Image URL"
              />

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white px-4 py-2 cursor-pointer"
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditTarget(null)}
                  className="bg-gray-500 text-white px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
  
  export default MenuList;
  