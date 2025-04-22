import { 
  FaRocket, FaTrophy, FaBolt, FaHistory, FaHome 
} from "react-icons/fa";

import { SVGProps } from "react";

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  submenu?: {
    name: string;
    path: string;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: FaHome,
    path: "/dashboard"
  },
  {
    name: "Startups",
    icon: FaRocket,
    path: "/dashboard/startups",
    submenu: [
      { name: "Ver todas", path: "/dashboard/startups" },
      { name: "Registrar nova", path: "/dashboard/startups/create" }
    ]
  },
  {
    name: "Torneios",
    icon: FaTrophy,
    path: "/dashboard/tournaments",
    submenu: [
      { name: "Ver todos", path: "/dashboard/tournaments" },
      { name: "Criar novo", path: "/dashboard/tournaments/create" },
    ]
  },
];