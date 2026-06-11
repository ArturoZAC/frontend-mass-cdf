import { useLocation, useNavigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconBox,
  IconArrowsExchange,
  IconReceipt,
  IconChartBar,
  IconUsers,
  IconHelp,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";
import { useAuthStore } from "../../store/auth.store";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <IconLayoutDashboard size={20} />, path: "/dashboard" },
  { label: "Products", icon: <IconBox size={20} />, path: "/products" },
  { label: "Stock", icon: <IconArrowsExchange size={20} />, path: "/stock" },
  { label: "Sales", icon: <IconReceipt size={20} />, path: "/sales" },
  { label: "Reports", icon: <IconChartBar size={20} />, path: "/reports" },
  { label: "Users", icon: <IconUsers size={20} />, path: "/users" },
  { label: "Kardex", icon: <IconLayoutDashboard size={20} />, path: "/kardex" },
];

export const Sidebar = () => {
  const { logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname;

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-[#f0f2f5] border-r border-gray-200 px-3 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="flex items-center justify-center w-9 h-9 bg-[#FFD101] rounded-md">
          <span className="btn-sans text-[#B5000B] text-sm font-black">M✓</span>
        </div>
        <div className="flex flex-col">
          <span className="btn-sans font-bold text-[#0D2DAA] text-sm leading-tight">
            Admin Portal
          </span>
          <span className="small text-[10px]" style={{ color: "#6b7280" }}>
            Tiendas Mass Logistics
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = active === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-[#FFD101] text-[#1a1a1a]"
                    : "bg-transparent text-[#1a1a1a] hover:bg-gray-200"
                }`}
            >
              <span className={isActive ? "text-[#1a1a1a]" : "text-[#4b5563]"}>{item.icon}</span>
              <span className="btn-sans text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* New Sale Button */}
      <div className="mt-4 mb-4">
        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#B5000B] hover:bg-[#930009] transition-colors duration-200 cursor-pointer">
          <IconPlus size={18} color="white" />
          <span className="btn-sans text-sm font-semibold" style={{ color: "white" }}>
            New Sale
          </span>
        </button>
      </div>

      <div className="border-t border-gray-200 pt-3 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
          <IconHelp size={20} className="text-[#4b5563]" />
          <span className="btn-sans text-sm font-medium text-[#1a1a1a]">Help</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <IconLogout size={20} className="text-[#4b5563]" />
          <span className="btn-sans text-sm font-medium text-[#1a1a1a]">Logout</span>
        </button>
      </div>
    </aside>
  );
};
