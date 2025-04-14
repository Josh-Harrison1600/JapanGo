import { useEffect, useState } from 'react';
import axios from 'axios';

//Archive component to display and manage archived items
function Archive({ deletedItems, onRestore}: {
    deletedItems: any[];
    onRestore: (id: string) => void;
    refreshItems: () => void;
}) {
    const [menuItems, setMenuItems] = useState([]);

    //Fetch archived menu items
    const fetchItems = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/menu-items/archive/${id}`);
            setMenuItems(res.data);
        }catch(err){
            console.error('Failed to fetch menu items', err);
        }
    };

    //Refresh items when page loads
    useEffect(() => {
        fetchItems();
    }, []);

    //Delete handler thats used in MenuList.tsx
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/menu-items/archive/${id}`);
            await fetchItems();
        } catch(err) {
            console.error('Error deleting item', err);
        }
    };
    

    return (
      <div>
        <div className="p-6">
          <MenuList items={menuItems} onDelete={handleDelete} refreshItems={fetchItems}/>
          <AddMenuItem refreshItems={fetchItems} />
          <ImageUploader onUploadComplete={(url) => {
            console.log('Image uploaded to:', url);
          }} />
        </div>
      </div>
    ); 
}


export default Archive;