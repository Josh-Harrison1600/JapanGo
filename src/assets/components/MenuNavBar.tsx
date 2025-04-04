import { useState } from "react";

const allCategories = [
    "Lunch",
    "Appetizers",
    "Soup",
    "Salad",
    "Tempura",
    "A La Carte",
    "Hot Dishes",
    "Classic Rolls",
    "Special Rolls",
    "Combos",
    "Roll Set Japan",
    "Vegan Combo",
    "Boat Tray",
    "Party Tray",
    "Drinks"
  ];

function MenuNavBar() {
    //State to track currently selected category
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return(
        <div className="sticky top-0 h-screen w-64 overflow-y-auto bg-white border-r border-gray-200 p-4 z-20">
            {/* Sidebar Title */}
            <h2 className="text-lg font-bold mb-4">Menu Categories</h2>
    
            {/* Scrollable List of Categories */}
            <ul className="space-y-2">
            {allCategories.map((category) => (
                <li key={category}>
                {/* Anchor tag to scroll to menu section */}
                <a
                    href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, '-')}`}
                    className={`block px-3 py-2 rounded hover:bg-red-100 transition-colors duration-200 font-medium text-gray-800 ${
                    activeCategory === category ? 'bg-red-200' : ''
                    }`}
                    onMouseEnter={() => setActiveCategory(category)}
                    onMouseLeave={() => setActiveCategory(null)}
                >
                    {category}
                </a>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default MenuNavBar;