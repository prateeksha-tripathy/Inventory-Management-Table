useSelector
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteItem } from './InventoryReducer';

const Home = () => {

    const dispatch=useDispatch();
    const inventory = useSelector((state:any)=> state.inventory)
    // console.log(inventory);
    const [filteredInventory, setFilteredInventory] = useState(inventory);

    const handleSort = () => {
        const sorted = [...filteredInventory].sort((a, b) => a.quantity - b.quantity);
        setFilteredInventory(sorted);
      };

    const handleDelete = (id:any) => {
        const confirm = window.confirm("Are you sure you want to delete this item?");

        if(confirm){
            const updatedInventory = filteredInventory.filter((item:any) => item.id !== id);
            setFilteredInventory(updatedInventory);
        }
        // console.log(id);
        // dispatch(deleteItem({id:id}));
    }
    
  return (
    <div className=''>
        <h2 className='text-center'>Inventory Management Table</h2>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <Link to='/create' 
          type="button"
          className='btn btn-success ms-2'
        //   onClick={handleAddNewItemClick}
        >
          Add New Item
        </Link>
            <button type="button" className='btn btn-success ms-2' >Filter (by Category) </button>
            <button type="button" className='btn btn-success ms-2' onClick={handleSort}>Sort (by quantity) </button>
        </div>
        <table style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>ITEM NAME</th>
                    <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>CATEGORY</th>
                    <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>QUANTITY</th>
                    <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {filteredInventory.map((item:any,index:any) =>(
                    <tr key={index} className={item.quantity < 10 ? "low-stock" : ""}>
                        <td className='px-12 py-12'>{item.name}</td>
                        <td className='px-12 py-12'>{item.category}</td>
                        <td className='px-12 py-12'>
                            {item.quantity}</td>
                        <td className='px-12 py-12'>
                            <Link to={`/edit/${item.id}`} className='btn btn-primary ms-2'>Edit</Link>
                            <button className='btn btn-danger ms-2' onClick={()=> handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
  
export default Home