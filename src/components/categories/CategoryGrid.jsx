"use client";
import axios from "axios";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

import { ProductCard } from "../product/ProductCard";
import { Spinner } from "../Spinners/Spinner";
import { categoriesInfo } from "../../utils/categoriesInfo";

//Products By Category
export function CategoryGrid({ params }) {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const category = categoriesInfo.find((category) => category.id == id);

  useEffect(() => {
    const fetchCategoryById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pepine-back.onrender.com/categories/${id}/products`,
        );
        setProducts(response.data.data.category);
      } catch (error) {
        notFound();
      }

      setIsLoading(false);
    };

    if (id) {
      fetchCategoryById();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!products) {
    return <div>No products found</div>;
  }
  return (
    <div className="mx-auto my-10 lg:my-16 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto lg:mx-0">
        <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          {category && category.name}
        </h2>
        <p className="mt-6 text-lg leading-8 text-center text-gray-600">
          {category && category.description}
        </p>
      </div>
      <div
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 justify-center"
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
