const dummyMenu =   [
    { id: 1, name: "California Roll", category: "Sushi", price: 12 },
    { id: 2, name: "Ramen", category: "Noodles", price: 14 },
    { id: 3, name: "Edamame", category: "Appetizer", price: 5 }
];

function MenuList() {
    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Menu Items</h2>
            <table className="w-full border">
                <thead>
                    <tr className="border">
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyMenu.map(item => (
                        <tr key={item.id} className="border text-center">
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="bg-blue-500 hover:bg-blue-800 text-white px-2 mx-2">Edit</button>
                                <button className="bg-red-500 hover:bg-red-800 text-white px-2">Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            );
        }

export default MenuList;