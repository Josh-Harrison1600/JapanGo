import AdminNavBar from '../assets/components/AdminNavBar';
import MenuList from './MenuList';
import AddMenuItem from './AddMenuItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [menuItems, setMenuItems] = useState([]);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/menu-items');
    setMenuItems(res.data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  
  return (
    <div>
      <AdminNavBar />
      <div className="p-6">
        <AddMenuItem refreshItems={fetchItems} />
        <MenuList items={menuItems} />
      </div>
    </div>
  );
}

export default DashboardPage;
