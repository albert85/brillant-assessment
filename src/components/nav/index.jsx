import { Link, useLocation } from 'react-router-dom';

const commonStyle = "flex justify-center items-center text-center"
const activeStyle = "border-2 border-white"

const Navbar = () => {
  const path = useLocation().pathname;
  return (
    <div className="flex justify-center h-12 bg-blue-600 text-white font-bold">
      <div className=" grid grid-cols-4 text-xs w-full md:w-1/2">
          <Link className={`${commonStyle} ${path.includes('/profile') ? activeStyle : ""}`} to={'/auth/profile'}>Profile</Link>
          <Link className={`${commonStyle} ${path.includes('/settings') ? activeStyle : ""}`} to={'/auth/settings'}>Settings & Privacy</Link>
          <Link className={`${commonStyle} ${path.includes('/discover') ? activeStyle : ""}`} to={'/auth/discover'}>Discover</Link>
          <Link className={`${commonStyle} ${path.includes('/buddies') ? activeStyle : ""}`} to={'/auth/buddies'}>Buddies</Link>
      </div>
    </div>
  );
};

export default Navbar;
