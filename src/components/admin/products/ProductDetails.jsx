"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Spinner } from "../../Spinners/Spinner";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { emptyMedia, productToUpdate } from "../../../store/reducer/produits";

import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductDetails({ id }) {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduitById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pepine-back.onrender.com/products/${id}`,
        );
        setProduct(response.data.data.product);
      } catch (error) {
        console.error("There was an error fetching the product", error);
      }

      setIsLoading(false);
    };

    if (id) {
      fetchProduitById();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  function handleUpdate() {
    dispatch(productToUpdate(product));
    dispatch(emptyMedia());
  }
  const productDetails = [
    {
      name: "Informations Générales",
      items: [
        `Nom Scientifique: ${product.scientific_name}`,
        `Famille: ${product.family}`,
        `Origine: ${product.origin}`,
        `Taille: ${product.size}`,
        `Pot: ${product.pot}`,
        `Stock: ${product.stock}`,
        `Prix: ${product.price}`,
        `Statut: ${product.status}`,
      ],
    },
    {
      name: "Détails Botaniques",
      items: [
        `Couleur des Fleurs: ${product.flower_color}`,
        `Couleur des Feuilles: ${product.leaf_color}`,
        `Rendement: ${product.yield_value}`,
        `Exposition: ${product.exposure_value}`,
        `Type de feuillage: ${product.foliage_value}`,
        `Pouvoir couvrant: ${product.ground_cover_power_value}`,
        `Zone de rusticité: ${product.hardiness_zone_value}`,
        `Hauteur Adulte: ${product.maturity_height}`,
        `Largeur adulte: ${product.maturity_width}`,
        `Besoin en eau: ${product.water_requirement_value}`,
        `Strate: ${product.strate_value}`,
      ],
    },
  ];
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-3 sm:mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6 ">
                  {product.media_urls[0] &&
                    product.media_urls.map((image, index) => (
                      <Tab
                        key={index}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                width={800}
                                height={800}
                                src={image}
                                alt="alt"
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>
              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.media_urls[0] &&
                  product.media_urls.map((image, index) => (
                    <Tab.Panel key={index}>
                      <Image
                        width={800}
                        height={800}
                        src={image}
                        alt="alt"
                        className="h-[430px] w-full lg:h-[500px] object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {`Prix: ${product.price}€`}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description1 }}
                />
              </div>

              <div className="mt-6">
                <div className="flex">
                  <div className="mx-4 flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-1">Taille</h3>
                    <p className="font-bold">{product.size}</p>
                  </div>
                  <div className="mx-4 flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-1">Pot</h3>
                    <p className="font-bold">{product.pot}</p>
                  </div>
                  <div className="mx-4 flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-1">Statut</h3>
                    <div className="font-bold ">
                      {product.status ? (
                        <Icon
                          icon="ion:eye"
                          color="#03ba4f"
                          width="24"
                          height="24"
                        />
                      ) : (
                        <Icon
                          className="mx-2"
                          icon="mdi:eye-off"
                          color="#e50000"
                          width="24"
                          height="24"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mx-4 flex flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-1">Stock</h3>
                    <p
                      className={`font-bold ${
                        product.stock <= 2 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {product.stock}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex">
                  <Link
                    href={"update-product"}
                    onClick={handleUpdate}
                    type="submit"
                    className="shadow-md flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Modifier
                  </Link>
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {productDetails.map((detail, index) => (
                    <Disclosure as="div" key={index}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-lg font-medium",
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul className="list-disc text-gray-400" role="list">
                              {detail.items.map((item, index) => {
                                // Séparer la clé et la valeur
                                const [key, value] = item.split(":");
                                const formattedKey = `${key}: `;
                                const isPrice = key
                                  .toLowerCase()
                                  .includes("price");

                                return (
                                  <li key={index} className="mx-4">
                                    <span className="font-semibold">
                                      {formattedKey}
                                    </span>
                                    <span className="text-gray-700">
                                      {" "}
                                      {isPrice ? `${value} €` : value}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
