import Image from "next/image";

import { SpinnerImage } from "../../../Spinners/SpinnerImage";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { deleteImage } from "../../../../store/reducer/produits";

import { TiDeleteOutline } from "react-icons/ti";

export function ItemImage(item) {
  const isLoading = useAppSelector((state) => state.produits.loading);
  const dispatch = useAppDispatch();

  function handleDeleteImage(id) {
    dispatch(deleteImage(id));
  }

  return (
    <div className="relative">
      {isLoading && <SpinnerImage />}
      <TiDeleteOutline
        onClick={() => handleDeleteImage(item?.id)}
        className="absolute top-0 right-0 text-white z-10 cursor-pointer m-2 h-6 w-6"
      />
      <Image
        src={item?.url}
        alt={item?.id}
        width={700}
        height={700}
        className="object-cover object-center rounded-lg h-52 max-w-52"
      />
    </div>
  );
}
