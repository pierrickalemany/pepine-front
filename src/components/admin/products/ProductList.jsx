"use client";
import { useEffect } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchProduits } from "../../../store/reducer/produits";

import { ProductItem } from "./ProductItem";

export function ProductList() {
  const dispatch = useAppDispatch();
  const produits = useAppSelector((state) => state.produits.produits);

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <div className="m-auto flex justify-between sm:items-center">
        <div className="w-1/2">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Liste des data
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Suivez et gérez votre stock de produits
          </p>
        </div>
        <div className="mt-4 sm:ml-16">
          <Link
            href="products/add-product"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ajouter un produit
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root m-auto">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle ">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Articles
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Categorie
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Nom scientifique
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Taille
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Pot
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    TVA
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Prix
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 border-b hidden border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {produits.map((item, index) => (
                  <ProductItem key={index} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
