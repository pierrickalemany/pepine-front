"use client";
import { motion } from "framer-motion";

import { changeStatus } from "../../../store/reducer/orders";
import { useAppDispatch } from "../../../hooks/redux";

export function OrderItem({
  id,
  reference,
  created_at,
  last_name,
  first_name,
  total_price,
  status,
}) {
  const dispatch = useAppDispatch();

  const date = new Date(created_at);
  const YYYYMMDD = date.toISOString().split("T")[0];

  return (
    <motion.tr
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="hover:bg-gray-100 rounded-sm"
    >
      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
        {YYYYMMDD}
      </td>
      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
        {reference}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {last_name} {first_name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {total_price} €
      </td>
      <select
        className="appearance-none px-3 py-4 text-sm text-gray-500 bg-transparent"
        onChange={(e) =>
          dispatch(
            changeStatus({
              id,
              status: e.target.value,
            }),
          )
        }
      >
        <option value="">{status}</option>
        <option value="Retirée">Retirée</option>
        <option value="Validée">Validée</option>
        <option value="En cours">En cours</option>
        <option value="Finalisée">Finalisée</option>
      </select>
    </motion.tr>
  );
}
