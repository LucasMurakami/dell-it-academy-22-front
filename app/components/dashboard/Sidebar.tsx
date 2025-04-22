import { FaSignOutAlt, FaChevronDown, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/app/constants/menuItems";

interface SidebarProps {
  sidebarOpen: boolean;
  menuItems: MenuItem[];
  activePage: string;
  activeSubmenu: string | null;
  toggleSubmenu: (name: string) => void;
}

export default function Sidebar({
  sidebarOpen,
  menuItems,
  activeSubmenu,
  toggleSubmenu,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`${sidebarOpen ? 'block' : 'hidden'} fixed top-14 bottom-0 left-0 z-20 w-64 transform transition-all duration-300 bg-white border-r border-gray-200 pt-4 pb-4 overflow-y-auto`}
    >
      <nav className="px-4 mt-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <div className="flex flex-col">
                {!item.submenu ? (
                  <Link
                    href={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-md w-full text-left transition-colors ${
                      pathname === item.path
                        ? "bg-blue-100 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    className={`flex items-center justify-between px-3 py-2 rounded-md w-full text-left transition-colors ${
                      pathname.startsWith(item.path)
                        ? "bg-blue-100 text-blue-700" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span>
                      {activeSubmenu === item.name ? (
                        <FaChevronDown className="h-4 w-4" />
                      ) : (
                        <FaChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                )}

                {item.submenu && activeSubmenu === item.name && (
                  <ul className="pl-9 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`text-sm w-full text-left block px-3 py-1 rounded-md transition-colors ${
                            pathname === subItem.path
                              ? "text-blue-700 bg-blue-50" 
                              : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link 
            href="/"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full"
          >
            <FaSignOutAlt className="mr-2 text-gray-500" />
            <span>Sair</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}