import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import LoadingToRedirect from '../LoadingToRedirect';

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}): JSX.Element => {
  const { user } = useAppSelector((state => ({...state.auth})));
  return user ? children : <LoadingToRedirect />
}

export default PrivateRoute