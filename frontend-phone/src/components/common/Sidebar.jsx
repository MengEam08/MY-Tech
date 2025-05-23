import React, { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {logout} = useContext(AdminAuthContext);
  return (
    <div className='card shadow mb-5 slidebar'>
    <div className='card-body p-4'>
      <ul>
        <li>
          <a href="">Dashboard</a>
        </li>
        <li>
          <Link to="/admin/categories">Category</Link>
        </li>
        <li>
          <Link to='/admin/brands'>Brands</Link>
        </li>
        <li>
          {/* <a href="">Product</a> */}
          <Link to='/admin/products'>Products</Link>
        </li>
        <li>
          <a href="">Orders</a>
        </li>
        <li>
          <a href="">Shipping</a>
        </li>
        <li>
          <a href="">Change Password</a>
        </li>
        <li>
          <a href="" onClick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
  );
}

export default Sidebar;
