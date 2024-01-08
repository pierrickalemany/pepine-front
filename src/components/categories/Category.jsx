"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { useAppDispatch } from "../../hooks/redux";

import { categoriesInfo } from "../../utils/categoriesInfo";
import { fetchCategoryById } from "../../store/reducer/categories";

export function Category(category) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { value, description, id } = category;
  const image = categoriesInfo.find((cat) => cat.id === id);

  const handleOnclickCategory = () => {
    dispatch(fetchCategoryById(id));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="border p-5 rounded-lg shadow-md"
    >
      <Link
        href={`categories/${id}`}
        onClick={handleOnclickCategory}
        className="cursor-pointer"
      >
        <Image
          className="mx-auto h-48 w-48 lg:h-48 lg:w-48 rounded-full object-cover shadow-2xl"
          src={image.imageUrl}
          alt="image"
          width={500}
          height={500}
        />
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
      </Link>
    </motion.div>
  );
}
