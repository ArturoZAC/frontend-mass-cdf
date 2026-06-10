import { IconSearch, IconBell, IconUserCircle } from "@tabler/icons-react";

interface NavbarProps {
  currentPage: string;
}

export const Navbar = ({ currentPage }: NavbarProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 w-full">
      {/* Left — Brand + Page */}
      <div className="flex items-center gap-3">
        <span className="btn-sans font-black text-[#B5000B] text-lg">Tiendas Mass</span>
        <span className="p-muted text-sm">{currentPage}</span>
      </div>

      {/* Right — Search + Icons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <IconSearch size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos o ventas..."
            className="bg-transparent outline-none text-sm text-gray-600 w-48 placeholder:text-gray-400"
          />
        </div>
        <button className="cursor-pointer hover:text-[#B5000B] transition-colors">
          <IconBell size={20} className="text-gray-500" />
        </button>
        <button className="cursor-pointer hover:text-[#B5000B] transition-colors">
          <IconUserCircle size={22} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
};
