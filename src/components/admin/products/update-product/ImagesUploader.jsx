"use client";
import { useEffect } from "react";

import { ItemImage } from "./ItemImage";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  uploadImage,
  mediaOrderFetch,
} from "../../../../store/reducer/produits";

import { PhotoIcon } from "@heroicons/react/24/solid";

export function ImagesUploader(id) {
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.produits.media);
  const isProductSended = useAppSelector(
    (state) => state.produits.isProductSended,
  );

  useEffect(() => {
    if (media && media.length > 0) {
      localStorage.setItem("media", JSON.stringify(media));
    }
  }, [media]);

  useEffect(() => {
    if (isProductSended) {
      const newOrder = media.map((item, index) => ({
        product_id: id.id,
        media_id: item.id,
        order: index + 1,
      }));
      dispatch(mediaOrderFetch(newOrder));
    }
    localStorage.removeItem("Product/toUpdate");
    localStorage.removeItem("media");
  }, [isProductSended, media, dispatch, id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadImage(file));
    }
  };

  return (
    <div className="col-span-3 py-10 px-5 lg:col-start-2 lg:col-span-4">
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Photo du produit
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {media.map((item, index) => (
          <ItemImage key={index + 1} {...item} />
        ))}
      </div>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2 hover:text-amber-500"
            >
              <span>Téléchargez un fichier</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            Formats de fichier: PNG, JPG.
          </p>
        </div>
      </div>
    </div>
  );
}
