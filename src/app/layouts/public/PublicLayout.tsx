import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div>
      <h2>Public Area</h2>
      <Outlet />
    </div>
  );
};
