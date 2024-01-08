/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { ProductCard } from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProduits } from "../../store/reducer/produits";

//All products
export function ProductsGrid() {
  const dispatch = useAppDispatch();
  const produits = useAppSelector((state) => state.produits.produits);

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);
  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <motion.div
        className="mx-auto lg:mx-0"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tous nos produits disponibles
        </h2>
        <p className="mt-6 text-lg leading-8 text-center text-gray-600">
          Explorez notre large gamme d'arbres, d'arbustes et de plantes pour
          agrémenter votre espace de vie de verdure et créer une ambiance
          naturelle dans votre quotidien.
        </p>
      </motion.div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {produits.map((produit) => (
          <ProductCard key={produit.id} {...produit} />
        ))}
      </ul>
    </div>
  );
}
