import { Button, Result } from 'antd';
import axios from '../services/axios';
import React, { FC, useCallback, useEffect } from 'react';
import {Outlet, RouteProps, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import local from '../utils/localStorage';
import { login } from '../redux/userSlice';

const PrivateRoute : FC<RouteProps> =  props => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLogged } = useAppSelector((state) => state.user);
  if (isLogged) return <Outlet />;
  else return(
    <Result
      status="403"
      title="403"
      subTitle={'Authorization'}
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          Go to login
        </Button>
      }
    />
  )
}

export default PrivateRoute;
