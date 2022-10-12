import { Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import localStorage from '../utils/localStorage';
import { useAppDispatch } from '../redux/store';
import {logout} from '../redux/userSlice'
function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('../login');
  }

  return (
    <div className='home'> 
      Home
      <div>
      <Link to={'../todo'} >Go Todo</Link>
      <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default Home;
