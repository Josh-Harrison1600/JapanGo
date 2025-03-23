import { useState } from "react";

function MenuList({ items, onDelete }: { items?: any[]; onDelete: (id: string) => void }) { 
    const [deleteTarget, setDeleteTarget] = useState<{ id: string, name: string } | null>(null);
    const [confirmName, setConfirmName] = useState('');

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
                    {/* Delete Button */}
                    <button 
                        onClick={() => setDeleteTarget({ id: item._id, name: item.name })}
                        className="bg-red-500 hover:bg-red-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer mb-2 mt-2 mr-2" 
                    >
                        Delete
                    </button>
                    {/* Delete Button */}
                    <button 
                        onClick={() => alert('test')}
                        className="bg-blue-500 hover:bg-blue-800 transition-all duration-300 text-white px-4 py-2 cursor-pointer"
                    >
                        Edit
                    </button>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete confirmation modal */}
        {deleteTarget && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
                <div className="bg-white p-6 rounded-md shadow-lg w-96">
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
                                }else{
                                    alert('Name does not match!');
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

      </div>
    );
  }
  
  export default MenuList;
  