import { allCategories } from "./MenuTopNav";


function MenuSidebar() {
  return (
    <div className="hidden md:block sticky top-0 h-screen w-64 overflow-y-auto bg-white border-r border-gray-200 p-4 z-20">
      <h2 className="text-lg font-bold mb-4">Menu Categories</h2>
      <ul className="space-y-2">
        {allCategories.map((category) => (
          <li key={category}>
            <a
              href={`#${category.toLowerCase().replace(/[^a-z0-9]/gi, "-")}`}
              className="block px-3 py-2 rounded hover:bg-red-100 transition duration-200 font-medium text-gray-800"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuSidebar;
