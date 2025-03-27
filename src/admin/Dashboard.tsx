import AdminNavBar from '../assets/components/AdminNavBar';
import MenuList from './MenuList';
import AddMenuItem from './AddMenuItem';
import EditHours from './EditHours';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [menuItems, setMenuItems] = useState([]);

  const fetchItems = async () => {
    try{
      const res = await axios.get('http://localhost:5000/menu-items');
      setMenuItems(res.data);
    }catch(err){
      console.error('Error fetching menu items', err);
    }
  }

    //function to delete menu item
    const handleDelete = async (id: string) => {
      try {
          await axios.delete(`http://localhost:5000/menu-items/${id}`);
          await fetchItems();
      } catch(err) {
          console.error('Error deleting item', err);
      }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  

  
  return (
    <div>
      <AdminNavBar />
      <div className="p-6">
        <AddMenuItem refreshItems={fetchItems} />
        <MenuList items={menuItems} onDelete={handleDelete} refreshItems={fetchItems}/>
        <EditHours />
      </div>
    </div>
  );
}

export default DashboardPage;
