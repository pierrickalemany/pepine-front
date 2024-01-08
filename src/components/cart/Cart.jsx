"use client";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { CartItem } from "./CartItem";

import {
  createOrderByUser,
  orderHasProducts,
  isChanged,
  reservationStatus,
} from "../../store/reducer/orders";

export function Cart() {
  // Hooks to dispatch actions and select state from Redux store
  const dispatch = useAppDispatch();
  const router = useRouter();

  // States for managing cart items and pricing
  const [list, setList] = useState([]);
  const [sousTotal, setSousTotal] = useState();
  const [tva, setTva] = useState();

  // Selecting Redux state
  const changed = useAppSelector((state) => state.orders.isChanged);
  const reservationSuccess = useAppSelector(
    (state) => state.orders.reservationSuccess,
  );

  // States for user information and authentication token
  const isToken = useAppSelector((state) => state.user.token);
  const isUser = useAppSelector((state) => state.user.user);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  // Order related Redux state
  const orderId = useAppSelector((state) => state.orders.orderId);
  const isOrderSended = useAppSelector((state) => state.orders.isOrderSended);

  // Effect to load user and token from localStorage
  useEffect(() => {
    const itemUser = JSON.parse(localStorage.getItem("user"));
    const itemToken = localStorage.getItem("token");
    setUser(itemUser);
    setToken(itemToken);
  }, [isToken, isUser]);

  // Effect to load cart items from localStorage and reset change flag in Redux
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      setList(cartItems);
    }
    dispatch(isChanged(false));
  }, [changed, dispatch]);

  // Effect to calculate subtotal
  useEffect(() => {
    const sousTotalPrice = list.reduce((sum, item) => sum + item.total, 0);
    setSousTotal(parseFloat(sousTotalPrice.toFixed(2)));
  }, [list]);

  // Effect to calculate tax (TVA)
  useEffect(() => {
    const montantTva = Number(sousTotal * 0.1);
    setTva(parseFloat(montantTva.toFixed(2)));
  }, [sousTotal]);

  // Function to handle reservation (order creation)
  const handleReservation = () => {
    const orderData = {
      first_name_order: user.first_name,
      last_name_order: user.last_name,
      total_price: Number(sousTotal + tva).toFixed(2),
      status: "en cours",
      user_id: user.id,
    };

    dispatch(createOrderByUser(orderData));
  };

  // Effect to handle order products after order is sent
  useEffect(() => {
    if (isOrderSended && orderId) {
      const productsToOrderWithOrderId = list.map((product) => ({
        order_id: orderId,
        product_id: product.id,
        quantity: product.quantity,
        price_time_order: product.price,
        vat: product.vat,
      }));

      dispatch(orderHasProducts(productsToOrderWithOrderId));
    }
  }, [isOrderSended, dispatch, list, orderId]);

  useEffect(() => {
    if (reservationSuccess) {
      localStorage.removeItem("cart");
      setTimeout(() => {
        dispatch(reservationStatus(false));
        router.push("/products");
      }, 2000);
    }
  }, [reservationSuccess, router]);

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Votre panier
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Articles dans votre panier
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {list.map((product, index) => (
                <CartItem key={index} {...product} />
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Récapitulatif de la commande
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Sous-total</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {" "}
                  {sousTotal} €
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>TVA 10 %</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{tva} €</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Total de la commande
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {(sousTotal + tva).toFixed(2)} €
                </dd>
              </div>
            </dl>
            <div className="mt-6 text-center">
              {reservationSuccess ? (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Réservation réussie !</strong>
                  <span className="block sm:inline">
                    Votre commande a été passée avec succès.
                  </span>
                </div>
              ) : user ? (
                <button
                  type="button"
                  onClick={handleReservation}
                  className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Réserver
                </button>
              ) : (
                <Link
                  href="/login"
                  prefetch={true}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Connectez-vous pour réserver
                </Link>
              )}
            </div>
          </section>
        </form>
      </div>
    </motion.div>
  );
}
