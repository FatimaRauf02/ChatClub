import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, MessageCircleIcon, PhoneCallIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside
      className="w-64 hidden lg:flex flex-col h-screen sticky top-0"
      style={{ backgroundColor: "#B5004A" }}
    >
      {/* LOGO */}
      <div className="p-5 border-b border-pink-400">
        <Link to="/" className="flex items-center gap-2.5">
          <PhoneCallIcon className="size-9 text-white" />
          <span className="text-3xl font-bold font-mono text-white tracking-wider">
            ChatClub
          </span>
        </Link>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition ${
            currentPath === "/" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
          }`}
        >
          <HomeIcon className="size-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/chats"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition ${
            currentPath === "/chats" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
          }`}
        >
          <MessageCircleIcon className="size-5" />
          <span>Chats</span>
        </Link>

        <Link
          to="/friends"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition ${
            currentPath === "/friends" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
          }`}
        >
          <UsersIcon className="size-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white transition ${
            currentPath === "/notifications" ? "bg-white/20 font-semibold" : "hover:bg-white/10"
          }`}
        >
          <BellIcon className="size-5" />
          <span>Notifications</span>
        </Link>
      </nav>
    </aside>
  );
};
export default Sidebar;