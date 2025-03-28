import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categoryTree = {
    Starters: ["Appetizer", "A La Carte"],
    Mains: ["Hot Dishes & Noodles", "Lunch"],
    Sushi: ["Rolls", "Special Rolls", "Sushi, Sashimi & Roll"],
    Others: ["Salad", "Soup", "Vegetarian", "Tempura"], 
};


function MenuCategoryNav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (group: string) => {
        setOpenDropdown((prev) => (prev === group ? null : group));
    };

    return(
        <div className="bg-red-500 flex justify-center space-x-6 py-6 top-16 z-50 mb-4">
            {Object.entries(categoryTree).map(([group, categories]) => (
                <div key={group} className="relative">
                    {/* Top Level Button */}
                    <button
                        onClick={() => toggleDropdown(group)}
                        className="text-lg font-bold text-white hover:text-gray-200 transition-all duration-300 cursor-pointer"
                    >
                        {group}
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {openDropdown === group && (
                            <motion.ul 
                                className="absolute top-full left-0 mt-2 bg-red-500 text-white rounded shadow-md py-2 w-48"
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {categories.map((category) => (
                                    <li key={category}>
                                        <a
                                        href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, "-")}`}
                                        className="block px-4 py-2 hover:bg-red-600 font-bold"
                                        >
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

export default MenuCategoryNav;