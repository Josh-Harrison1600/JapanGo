import MenuNavBar from "../components/MenuNavBar";
import { useEffect, useState } from "react";
import axios from "axios";

//Define requirments for a menu items
interface MenuItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

function Menu(){
    //States to hold fetched items
    const [items, setItems] = useState<MenuItem[]>([]);
    const [groupedItems, setGroupedItems] = useState<{ [key: string]: MenuItem[] }>({});

    //Fetch the menu items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try{
                const res = await axios.get('http://localhost:5000/menu-items');
                setItems(res.data);
            }catch(err){
                console.error('Failed to fetch menu items', err);
            }
        };

        fetchItems();
    }, []);

    //Sort the items by category every time Items changes
    useEffect(() => {
        const grouped: { [key: string]: MenuItem[] } = {};
        items.forEach((item) => {
            if(!grouped[item.category]){
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });
    setGroupedItems(grouped);
}, [items]);

    return(
        <>
            <MenuNavBar />

            <div className="px-4 md:px-8 lg:px-16">
                {/* Loop through the categories */}
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} id={category.toLowerCase()} className="mb-12">
                        {/* Category Title */}
                        <h2 className="text-3xl font-bold text-black mb-4">{category}</h2>

                        {/* Grid for Category */}  
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <div key={item._id} 
                                className="bg-gray-200 rounded-lg overflow-hidden p-4 shadow flex flex-col items-center text-center space-y-2"
                                >
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
                                    <p className="text-sm font-normal italic">${item.price.toFixed(2)}</p>

                                    {/* Description */}
                                    {item.description && (
                                        <p className="text-xs text-gray-700">{item.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
} 

export default Menu;