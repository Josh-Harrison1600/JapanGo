//Mobile Only view

import { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

export const allCategories = ["Lunch", "Appetizers", "Soup", "Salad", "Tempura", "A La Carte",
    "Hot Dishes", "Classic Rolls", "Special Rolls", "Combos",
    "Roll Set Japan", "Vegan Combo", "Boat Tray", "Party Tray", "Drinks"];

function MenuTopNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -100, behavior: "smooth" });

  return (
    <>
      <div className="md:hidden w-full bg-white shadow-md z-30 px-2 py-2 flex items-center space-x-3">
        <button onClick={() => setIsOpen(true)} className="p-2">
          <FiMenu size={24} />
        </button>
        <button onClick={scrollLeft}><MdArrowBackIos size={18} /></button>
        <div ref={scrollRef} className="flex overflow-x-auto space-x-3 scroll-smooth touch-auto snap-x snap-mandatory">
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
        <button onClick={scrollRight}><MdArrowForwardIos size={18} /></button>
      </div>

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

export default MenuTopNav;
