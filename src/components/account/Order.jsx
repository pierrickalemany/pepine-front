"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";

import { getUserOrders } from "../../store/reducer/login";
import { ordersOfOneUser } from "../../store/reducer/orders";

import { OrderItem } from "./OrderItem";

export function Order({
  id,
  reference,
  status,
  user_id,
  first_name,
  last_name,
  total_price,
  created_at,
  updated_at,
  products,
  product_price,
  quantity_ordered,
  vat,
}) {
  const dispatch = useAppDispatch();
  const ordersList = useAppSelector((state) => state.user.orders);
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className={
        isActive
          ? "rounded border border-blue-300 p-5 mb-10"
          : "rounded border p-5 mb-10"
      }
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h3 className="text-sm font-medium leading-6 text-gray-900">
        Commande du {created_at}
      </h3>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Numéro de commande : <span>{reference}</span>
      </p>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Total TTC : <span>{total_price} €</span>
      </p>
      <div className={isActive ? "flex w-full border-b pb-3" : "flex w-full"}>
        <button
          onClick={() => setIsActive(!isActive)}
          type="button"
          className={
            isActive
              ? "text-sm font-semibold leading-6 text-red-500 ml-auto"
              : "text-sm font-semibold leading-6 text-blue-500 ml-auto "
          }
        >
          Afficher les détails {isActive ? "-" : "+"}
        </button>
      </div>
      {isActive && (
        <>
          <div className="pt-3">
            <h4 className="text-sm font-bold leading-6 text-gray-900">
              Détails de la commande
            </h4>
            <p className="mt-1 text-sm leading-6 text-gray-600">{status}</p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Statut de la commande : <span>{status}</span>
            </p>
          </div>
          <div className="py-3 border-b">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-sm text-left font-bold leading-6 text-gray-900">
                    Article
                  </th>
                  <th className="text-sm text-left font-bold leading-6 text-gray-900">
                    Prix unitaire
                  </th>
                  <th className="text-sm text-left font-bold leading-6 text-gray-900">
                    Quantité
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <OrderItem key={product.name} {...product} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3">
            <div className="w-60">
              <p className="mt-1 text-sm leading-6 text-gray-600 flex justify-between font-bold">
                Total à régler (à réception)
                <span>{total_price} €</span>
              </p>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
