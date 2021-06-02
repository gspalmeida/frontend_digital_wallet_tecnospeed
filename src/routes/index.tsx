import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AdminRoutes from './admin.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const {user, admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{flex:1, backgroundColor:'red'}}><p>Carregando</p></div>
    );
  }
  if (!!admin?.name){
    return <AdminRoutes />
  }
  if (!!user?.name){
    return <AppRoutes />
  }else{
    return <AuthRoutes />
  }
};

export default Routes;
