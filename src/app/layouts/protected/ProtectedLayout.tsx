import { Outlet } from 'react-router-dom';
import { RequireAuth } from '../../guards/RequireAuth';

export const ProtectedLayout = () => {
  return (
    <RequireAuth>
      <div>
        <h2>Protected Area</h2>
        <Outlet />
      </div>
    </RequireAuth>
  );
};
