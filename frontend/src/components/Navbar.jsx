import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, PhoneCallIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav
      className="border-b sticky top-0 z-30 h-16 flex items-center"
      style={{ backgroundColor: "#fff", borderColor: "#f8bbd0" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full gap-3">

          {isChatPage && (
            <div className="mr-auto pl-2">
              <Link to="/" className="flex items-center gap-2">
                <PhoneCallIcon className="size-7" style={{ color: "#B5004A" }} />
                <span
                  className="text-2xl font-bold font-mono tracking-wider"
                  style={{ color: "#B5004A" }}
                >
                  ChatClub
                </span>
              </Link>
            </div>
          )}

          {/* NOTIFICATIONS */}
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6" style={{ color: "#B5004A" }} />
            </button>
          </Link>

          {/* PROFILE AVATAR - clickable to profile page */}
          <Link to="/profile">
            <div
              className="avatar cursor-pointer hover:opacity-80 transition"
              title="View Profile"
            >
              <div
                className="w-9 rounded-full border-2"
                style={{ borderColor: "#B5004A" }}
              >
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
          </Link>

          {/* LOGOUT */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6" style={{ color: "#B5004A" }} />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;