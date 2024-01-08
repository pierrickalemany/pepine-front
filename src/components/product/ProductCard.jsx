"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { productToUpdate, emptyMedia } from "../../store/reducer/produits";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export function ProductCard(product) {
  const { id, media_urls, name, size, price, vat, product_id, category_id } =
    product;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState();

  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      const product = cartArray.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
      } else {
        cartArray.push({
          id,
          media_url: media_urls[0],
          name,
          size,
          price,
          vat,
          quantity: 1,
          total: 0,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            id,
            media_url: media_urls[0],
            name,
            size,
            price,
            vat,
            quantity: 1,
            total: 0,
          },
        ]),
      );
    }
  };
  function handleUpdate() {
    dispatch(productToUpdate(product));
    dispatch(emptyMedia());
  }

  useEffect(() => {
    const itemUser = JSON.parse(localStorage.getItem("user"));
    setUser(itemUser);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="bg-white shadow-lg rounded-md"
    >
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl">
        <div key={id} className="group relative">
          <div className="h-80 w-full overflow-hidden rounded-md bg-gray-200">
            {media_urls[0] && (
              <Image
                width={800}
                height={800}
                src={media_urls[0]}
                alt={"image"}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <h3 className="mt-4 text-sm text-gray-700">
            <Link
              href={
                pathname === `/categories/${category_id}`
                  ? user?.role === "admin"
                    ? `/admin/products/${product_id}`
                    : `/products/${product_id}`
                  : user?.role === "admin"
                  ? `/admin/products/${id}`
                  : `/products/${id}`
              }
            >
              <span className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{size}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{price} €</p>
        </div>
        {user?.role === "admin" ? (
          <Link
            onClick={handleUpdate}
            href={"/admin/products/update-product"}
            className="bg-indigo-500 flex max-w-xs items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:bg-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full shadow-md"
          >
            Modifier
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-amber-500 flex max-w-xs items-center justify-center rounded-md border border-transparent px-8 py-3 mt-3 mx-auto text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:bg-amber-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full shadow-md"
          >
            Ajouter au panier
          </button>
        )}
      </div>
    </motion.div>
  );
}
