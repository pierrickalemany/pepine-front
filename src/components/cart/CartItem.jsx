"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { isChanged } from "../../store/reducer/orders";

import { XMarkIcon } from "@heroicons/react/20/solid";

// CartItem component to display each item in the cart
export function CartItem(product) {
  // Redux dispatch hook
  const dispatch = useAppDispatch();

  // State hooks for quantity and total price of the product
  const [quantity, setQuantity] = useState(product.quantity);
  const [totalPrice, setTotalPrice] = useState();

  // Effect hook to calculate the total price when quantity or price changes
  useEffect(() => {
    const total = product.price * quantity;
    setTotalPrice(total.toFixed(2));
  }, [quantity, product.price]);

  // Effect hook to update the cart in localStorage when quantity or total price changes
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      const item = cartArray.find((item) => item.id === product.id);
      if (item) {
        item.quantity = Number(quantity);
        item.total = Number(totalPrice);
      }
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
    dispatch(isChanged(true));
  }, [totalPrice, quantity, product.id, dispatch]);

  // Function to handle deletion of an item from the cart
  function handleDeleteItem() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      const items = cartArray.filter((item) => item.id !== product.id);

      dispatch(isChanged(true));
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }

  // JSX for rendering the cart item
  return (
    <motion.li
      key={product.id}
      className="flex py-6 sm:py-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
    >
      <div className="flex-shrink-0">
        <Image
          priority={true}
          width={700}
          height={700}
          src={product.media_url}
          alt={product.name}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm ">
                {/* Link to the product detail page */}
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold text-gray-600 hover:text-gray-800"
                >
                  {product.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {/* Product size and name */}
              <p className="text-gray-500">Size: {product.size}</p>
              {product.name && (
                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                  {product.name}
                </p>
              )}
            </div>
            {/* Displaying product price and total price */}
            <p className="mt-1 text-sm font-semibold text-gray-500">
              {product.price} €
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              Total: {totalPrice} €
            </p>
            <p className="mt-10 text-sm font-semibold text-green-500">
              En stock
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            {/* Quantity selection dropdown */}
            <label className="sr-only">Quantity, {product.quantity}</label>
            <select
              id={product.id}
              name={product.name}
              className="max-w-full rounded-md border px-2 border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {/* Quantity options */}
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>

            {/* Delete item button */}
            <div className="absolute right-0 top-0">
              <button
                type="button"
                onClick={handleDeleteItem}
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
