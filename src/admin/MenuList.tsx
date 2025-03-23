function MenuList({ items }: { items?: any[] }) { 
    if (!items || items.length === 0) {
      return <p>No items available.</p>;
    }
  
    return (
      <div>
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
            {items.map((item) => (
              <tr key={item._id} className="border text-center">
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default MenuList;
  