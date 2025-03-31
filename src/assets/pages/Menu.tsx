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
                                <a
                                    key={item._id}
                                    href="https://www.doordash.com/en-CA/store/japan-go-moncton-670911/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-pointer"
                                >
                                    <div 
                                    className="bg-gray-100 hover:bg-gray-300 transition-colors duration-300 border-2 border-black rounded-lg overflow-hidden p-4 shadow flex flex-col items-center text-center space-y-2 h-[420px] max-w-[450px]"
                                    
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
                                        <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="text-xs text-gray-700 line-clamp-2">{item.description}</p>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
} 

export default Menu;