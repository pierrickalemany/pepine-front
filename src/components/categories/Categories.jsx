"use client";
import { useEffect } from "react";

import { Category } from "../../components/categories/Category";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchCategories } from "../../store/reducer/categories";

export function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="mx-auto mb-16 lg:mt-16 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto lg:mx-0">
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Categories
        </h2>
        <p className="mt-6 text-lg leading-8 text-center text-gray-600">
          Découvrez notre sélection de produits de qualité répartis dans quatre
          catégories distinctes.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-7 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4 justify-center"
      >
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </ul>
    </div>
  );
}
