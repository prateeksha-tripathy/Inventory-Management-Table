useSelector
import { useSelector } from 'react-redux'
import { inventoryData } from './data'

const Home = () => {
    const inventory = useSelector((state:any)=> state.inventory)
    console.log(inventory);
  return (
    <div className=''>
        <h2 className='text-center'>Inventory Management Table</h2>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <button type="button" >Add New Item </button>
            <button type="button" >Filter (by Category) </button>
            <button type="button" >Sort (by quantity) </button>
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
                {inventory.map((item:any,index:any) =>(
                    <tr key={index} className={item.quantity < 10 ? "low-stock" : ""}>
                        <td className='px-12 py-12'>{item.name}</td>
                        <td className='px-12 py-12'>{item.category}</td>
                        <td className='px-12 py-12'>
                            {item.quantity}</td>
                        <td className='px-12 py-12'>
                            <button className='btn-edit'>EDIT</button>
                            <button className='btn-delete'>DELETE</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
  
export default Home