import { Button } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import localStorage from '../helper/localStorage';
import { useAppDispatch } from '../redux/store';
import {logout} from '../redux/LoginSlice'
function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
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
