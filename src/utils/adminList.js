import {
  QueueListIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export const adminList = [
  {
    name: "Liste des produits",
    description: "Découvre la liste des produits",
    path: "/admin/products",
    icon: QueueListIcon,
  },
  {
    name: "Ajouter un produit",
    description: "Découvre la liste des produits",
    path: "/admin/products/add-product",
    icon: PlusCircleIcon,
  },
  {
    name: "Commandes",
    description: "Gestions des réservations",
    path: "/admin/orders",
    icon: ShoppingBagIcon,
  },
];
