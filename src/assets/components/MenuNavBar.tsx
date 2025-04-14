import { useState, useRef } from "react";
import { FiMenu } from "react-icons/fi"; 
import { Dialog } from "@headlessui/react"; 
import { MdArrowForwardIos } from "react-icons/md"; 
import { MdArrowBackIos } from "react-icons/md";

const allCategories = [
  "Lunch", "Appetizers", "Soup", "Salad", "Tempura", "A La Carte",
  "Hot Dishes", "Classic Rolls", "Special Rolls", "Combos",
  "Roll Set Japan", "Vegan Combo", "Boat Tray", "Party Tray", "Drinks"
];

function MenuNavBar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); 

  //Reference to the horizontal scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  //Functions to scroll the categories horizontally
  const scrollRight = () => {
    if(scrollRef.current){
        scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };
  const scrollLeft = () => {
    if(scrollRef.current){
        scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-0 h-screen w-64 overflow-y-auto bg-white border-r border-gray-200 p-4 z-20">
        <h2 className="text-lg font-bold mb-4">Menu Categories</h2>
        <ul className="space-y-2">
          {allCategories.map((category) => (
            <li key={category}>
              <a
                href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, "-")}`}
                className={`block px-3 py-2 rounded hover:bg-red-100 transition duration-200 font-medium text-gray-800 ${
                  activeCategory === category ? "bg-red-200" : ""
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

      {/* Mobile Top Nav */}
      <div className="md:hidden top-14 left-0 w-full bg-white z-30 shadow-md overflow-x-auto flex items-center px-2 py-2 space-x-3">
        {/* Hamburger button opens modal */}
        <button onClick={() => setIsOpen(true)} className="p-2">
          <FiMenu size={24} />
        </button>

        {/* Left Arrow Icon */}
        <button onClick={scrollLeft} className="flex-shrink-0 cursor-pointer">
            <MdArrowBackIos size={18} className="text-gray-500" />
          </button>

        {/* Scrollable categories */}
        <div ref={scrollRef} className="flex space-x-3 overflow-x-auto">
          {allCategories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, "-")}`}
              className="px-3 py-1 bg-gray-100 hover:bg-red-200 rounded-full text-sm whitespace-nowrap"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Right Arrow Icon */}
          <button onClick={scrollRight} className="flex-shrink-0 cursor-pointer">
            <MdArrowForwardIos size={18} className="text-gray-500" />
          </button>
      </div>

      {/* Mobile Modal Full Menu */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6 overflow-y-auto max-h-[80vh]">
            <Dialog.Title className="text-lg font-bold mb-4">All Categories</Dialog.Title>
            <ul className="space-y-2">
              {allCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, "-")}`}
                    className="block px-4 py-2 text-sm hover:bg-red-100 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default MenuNavBar;
