"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getOrdersList } from "../../../store/reducer/orders";
import { OrderItem } from "./OrderItem";

export function Orders() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  console.log(orders);
  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (orders) {
      const isIndeterminate =
        selectedOrders.length > 0 && selectedOrders.length < orders.length;
      setChecked(selectedOrders.length === orders.length);
      setIndeterminate(isIndeterminate);
    }
  }, [selectedOrders, orders]);

  function toggleAll() {
    setSelectedOrders(checked || indeterminate ? [] : orders);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root w-3/4 m-auto">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full pb-10 align-middle sm:px-6 lg:px-10">
            <div className="sm:flex sm:items-center pb-4">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900 m-auto">
                  Commandes
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Gestion des réservations
                </p>
              </div>
            </div>
            <div className="relative">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="min-w-[3rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Référence
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Client/Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders &&
                    orders.map((order, index) => (
                      <OrderItem key={index} {...order} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
