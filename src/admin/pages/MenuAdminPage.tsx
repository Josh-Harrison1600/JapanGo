import AddMenuItem from '../components/AddMenuItem';
import MenuList from '../components/MenuList';
import ImageUploader from '../components/ImageUploader';
import { useEffect, useState } from 'react';
import axios from 'axios';


function MenuAdminPage() {
    const [menuItems, setMenuItems] = useState([]);

    //Fetch menu items
    const fetchItems = async () => {
        try{
            const res = await axios.get('http://localhost:5000/menu-items');
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
            await axios.delete(`http://localhost:5000/menu-items/${id}`);
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

export default MenuAdminPage;

