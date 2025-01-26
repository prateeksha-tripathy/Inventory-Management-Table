import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { editItem } from '../InventoryReducer';
import { toast } from 'react-toastify';

const EditItemForm = () => {

    const { id } = useParams<{ id: string }>(); // returns a string
    // console.log("id ", id);
    const items=useSelector((state:any)=>state.inventory);
    // console.log("itemsss ", items);
    const itemId = id?parseInt(id, 10):null;
    // console.log("itemid ", itemId);
    const existingItem = items.filter((f:any)=>f.id === itemId);
    // console.log('Existing Item:', existingItem);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: existingItem[0].name,
        category: existingItem[0].category,
        quantity: existingItem[0].quantity,
      });

    const handleCategoryChange = (category:any) => {
        setFormData((prevData:any) => ({
        ...prevData,
        category,
        }));
    };

    const handleInputChange = (e:any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

      // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    //dispatch(addItem(formData));
    dispatch(editItem({ id , ...formData }));
    // console.log('Form Data:', formData);
    // console.log('Item ID:', id);
    toast.success("Item added successfully!");
    // navigate to home page
    navigate('/');

  };
    
            
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Item Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              id='dropdownMenuButton'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {formData.category}
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => handleCategoryChange('Accessories')}
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => handleCategoryChange('Electronics')}
                >
                  Electronics
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => handleCategoryChange('Furniture')}
                >
                  Furniture
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => handleCategoryChange('Kitchenware')}
                >
                  Kitchenware
                </button>
              </li>
              <li>
                <button
                  className='dropdown-item'
                  type='button'
                  onClick={() => handleCategoryChange('Stationary')}
                >
                  Stationary
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='quantity' className='form-label'>
            Quantity
          </label>
          <input
            type='number'
            className='form-control'
            id='quantity'
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Edit Item
        </button>

        <Link to='/' 
          type="button"
          className='btn btn-success ms-2'
        >
          Go Back
        </Link>
      </form>
    </div>
  )
}

export default EditItemForm