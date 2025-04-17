import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuList from '../components/MenuList';

//Archive component to display and manage archived items
function Archive({}: {
    deletedItems: any[];
    onRestore: (id: string) => void;
    refreshItems: () => void;
}) {
    const [menuItems, setMenuItems] = useState([]);

    //Fetch archived menu items
    const fetchItems = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/menu-items?archived=true`);
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
          <MenuList items={menuItems} onArchive={handleDelete} refreshItems={fetchItems}/>
        </div>
      </div>
    ); 
}


export default Archive;