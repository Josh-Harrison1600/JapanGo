const categories = ["Apps", "Mains", "Sushi"];

function MenuCategoryNav() {
    return(
        <div className="bg-red-500 flex justify-center space-x-6 py-6 top-16 z-50 mb-4">
            {categories.map((category) => (
                <a
                    key={category}
                    href={`#${category.toLowerCase()}`}
                    className="text-white  text-2xl font-bold hover:text-gray-200 transition-all duration-300"
                >
                    {category}
                </a>
            ))}
        </div>
    )
}

export default MenuCategoryNav;