import { QrCode, CircleDollarSign, CreditCard } from "lucide-react";

export const SidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    href: "/",
    icon: <QrCode />,
  },

  {
    id: 2,
    name: "Transações",
    href: "/transactions",
    icon: <CircleDollarSign />,
  },

  {
    id: 3,
    name: "Assinaturas",
    href: "/subscription",
    icon: <CreditCard />,
  },
];
