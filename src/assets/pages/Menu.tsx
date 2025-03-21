import MenuNavBar from "../components/MenuNavBar";

function Menu(){

    //Test function for categories
    const menuData = {
        Appetizer: ["Age dashi Tofu", "Chicken Karaage", "Deep Fried Gyoza", "Edamame", "Jalapeno Bomb", "Kang Poon Gi", "Kang Poong Dumpling", "Side Kimchi", "Spring Rolls", "Sushi Pizza Mango", "Sushi Pizza Salmon", "Sweet Thai chicken", "Takoyaki", "Tuna Tataki"],
        AlaCarte: ["Assorted Sushi & Sashimi", "Butter Fish", "Eel", "Fried Tofu (Inari)", "Hokigai (Surf Clam)", "Red Tuna", "Salmon", "Shrimp", "Tamago"],
        Sushi: ["Sashimi", "Nigiri", "Maki", "California Roll", "Dragon Roll", "Spicy Tuna Roll"],
        Drinks: ["Diet Pepsi", "Jasmine Tea", "Limonade", "Mango Juice", "Milk", "Nestea", "Orange Juice", "Pepsi", "Pot of Green Tea", "Root Beer", "Sparkling Water Perrier"],
        Noodles: ["BBQ Unagi", "Bulgogi", "Kimchi Jjigae", "Pad Thai", "Ramen", "Steam Rice", "Stone Bowl Bibimbap", "Teriyaki", "Yaki Soba", "Yaki U-Don"],

    }

    return(
        <>
            <MenuNavBar />

            {Object.entries(menuData).map(([category, items]) => (
                <div key={category} id={category.toLowerCase()} className="mb-12">
                    {/* Category Title */}
                    <h2 className="text-3xl font-bold text-black mb-4">{category}</h2>

                    {/* Grid for Category */}  
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <div key={item} 
                            className="bg-gray-200 h-40 flex items-center justify-center text-xl font-bold"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
} 

export default Menu;