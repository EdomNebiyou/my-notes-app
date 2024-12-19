import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { logOutUser } from "../utils/api";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logOutUser();
      dispatch(logout());
      navigate("/login");
      toast.success("logged out successfully")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="hover:bg-gray-700 px-3 py-2 block rounded-md">
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link
                to="/notes"
                className="hover:bg-gray-700 block px-3 py-2 rounded-md"
              >
                Notes
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="hover:bg-gray-700 block px-3 py-2 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:bg-gray-700 block px-3 py-2 rounded-md"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
