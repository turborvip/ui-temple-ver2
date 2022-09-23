import { Button, Result } from 'antd';
import React, { FC } from 'react';
import {Outlet, RouteProps, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const PrivateRoute : FC<RouteProps> =  props => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('first',props)
  const { isAuth } = useAppSelector((state) => state.login);
  if (isAuth) return <Outlet />;
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
