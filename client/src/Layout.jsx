import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className="open-sans py-4 px-8 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
