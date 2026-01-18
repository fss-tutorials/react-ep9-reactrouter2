import { NavLink, useNavigate } from "react-router";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 py-4 px-6">
      <div className="flex justify-center">
        <div className="space-x-20 font-medium text-teal-100">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-red-700" : "text-amber-50"
            }
          >
            About
    
          </NavLink>
          <NavLink to="/products">Products</NavLink>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
