import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItem } from '../InventoryReducer';
import { useDispatch, useSelector } from 'react-redux';


const AddItemForm = () => {

  const dispatch = useDispatch();
  const items = useSelector((state:any) => state.inventory);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Choose Category',
    quantity: '',
  });

  // Handle input changes
  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (category:any) => {
    setFormData((prevData) => ({
      ...prevData,
      category,
    }));
  };

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    //dispatch(addItem(formData));
    dispatch(addItem({ id: items.length + 1, ...formData }));
    console.log('Form Data:', formData);
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
          Add Item
        </button>

        <Link to='/' 
          type="button"
          className='btn btn-success ms-2'
        >
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddItemForm;
