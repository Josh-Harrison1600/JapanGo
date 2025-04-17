import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuTopNav from '../components/MenuNavBar/MenuTopNav';
import MenuSidebar from '../components/MenuNavBar/MenuSidebar';

//Define requirments for a menu items
interface MenuItem {
    _id: string;
    name: string;
    category: string;
    price: string;
    description?: string;
    imageUrl?: string;
    extraInfo?: string;
}

function Menu(){
    const navigate = useNavigate();

    //States to hold fetched items
    const [items, setItems] = useState<MenuItem[]>([]);
    const [groupedItems, setGroupedItems] = useState<{ [key: string]: MenuItem[] }>({});
    
    //State for the popup box
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    //Function to close the popup box
    const handleClose = () => {
        setSelectedItem(null);
    };    

    //Fetch the menu items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('http://localhost:5000/menu-items?archived=false');
                setItems(res.data);
            } catch (err) {
                console.error('Failed to fetch menu items', err);
            }
        };

        fetchItems();
    }, []);

    //Sort the items by category every time Items changes
    useEffect(() => {
        const grouped: { [key: string]: MenuItem[] } = {};
        items.forEach((item) => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });
        setGroupedItems(grouped);
    }, [items]);

    //Animation variants for the fade-up effect
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <MenuTopNav /> {/* Mobile - renders above */}

            <div className="flex min-h-screen">
                <MenuSidebar /> {/* Desktop - sidebar layout */}

                <div className="flex-1 pt-28 md:pt-6 px-4 md:px-8 lg:px-16">
                    {/* Loop through the categories */}
                    {Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category} id={category.toLowerCase()} className="mb-12">
                            {/* Category Title */}
                            <h2 className="text-3xl font-bold text-black mb-4 pt-4">{category}</h2>

                            {/* Grid for Category */}  
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                transition={{ duration: 0.5 }}
                            >
                                {items.map((item) => (
                                    <a
                                        key={item._id}
                                        onClick={() => setSelectedItem(item)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer"
                                    >
                                        <div className="bg-gray-100 hover:bg-gray-300 transition-colors duration-300 border-2 border-gray-100 shadow-xl rounded-none overflow-hidden p-4 flex flex-col items-center text-center space-y-2 h-[430px] max-w-[450px]">
                                            {/* Image */}
                                            {item.imageUrl && (
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-[300px] h-[300px] object-cover rounded"
                                                />
                                            )}

                                            {/* Name */}
                                            <p className="text-lg font-semibold">{item.name}</p>

                                            {/* Price */}
                                            <p className="text-sm font-semibold">${item.price}</p>

                                            {/* Description */}
                                            {item.description && (
                                                <p className="text-xs text-gray-700 line-clamp-2">{item.description}</p>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup Box */}
            <Dialog
                open={!!selectedItem}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                {/* Modal Title with Close Button */}
                <DialogTitle className="flex justify-between items-center">
                    {selectedItem?.name}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* Modal Body */}
                <DialogContent dividers className="space-y-4">
                    {/* Price */}
                    <p className="text-lg font-semibold">Price: ${selectedItem?.price}</p>

                    {/* Description */}
                    <p className="text-gray-700">{selectedItem?.description}</p>

                    {/* Extra Info */}
                    {selectedItem?.extraInfo && (
                        <div className="border-t pt-2 text-sm text-gray-600">
                            <strong>Details:</strong> {selectedItem.extraInfo}
                        </div>
                    )}

                    {/* Order Now Button */}
                    <button 
                        className="bg-red-500 hover:bg-red-700 transition-all duration-300 text-white px-4 py-2 cursor-pointer font-bold"
                        onClick={() => navigate('/order-now')}
                    >
                        Order Now
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Menu;
