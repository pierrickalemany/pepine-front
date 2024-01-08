"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

//Utils
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { ImagesUploader } from "./ImagesUploader";
import { Modal } from "../../Modal";
import {
  mediaUpdate,
  emptyMedia,
  fetchUpdateProduct,
  updateProductCategory,
} from "../../../../store/reducer/produits";

export function UpdateProduct() {
  const dispatch = useAppDispatch();

  const productToUpdate = useAppSelector(
    (state) => state.produits.productUpdate,
  );
  const [id, setId] = useState("");
  const [mediaIds, setMediaIds] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);
  const [name, setName] = useState("");
  const [scientific_name, setScientific_name] = useState("");
  const [maturity_height, setMaturity_height] = useState("");
  const [maturity_width, setMaturity_width] = useState("");
  const [family, setFamily] = useState("");
  const [origin, setOrigin] = useState("");
  const [flower_color, setFlower_color] = useState("");
  const [leaf_color, setLeaf_color] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [size, setSize] = useState("");
  const [pot, setPot] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [vat, setVat] = useState("");
  const [user_id, setUser_id] = useState("");
  const [status, setStatus] = useState("");
  const [yield_id, setYield_id] = useState("");
  const [hardiness_zone_id, setHardiness_zone_id] = useState("");
  const [water_requirement_id, setWater_requirement_id] = useState("");
  const [exposure_id, setExposure_id] = useState("");
  const [ground_cover_power_id, setGround_cover_power_id] = useState("");
  const [strate_id, setStrate_id] = useState("");
  const [foliage_id, setFoliage_id] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (productToUpdate) {
      setId(productToUpdate.id);
      setUser_id(user.id);
      if (
        productToUpdate.media_urls.length > 0 &&
        productToUpdate.media_urls.find((item) => item !== null)
      ) {
        setMediaUrls(productToUpdate.media_urls);
      }
      if (
        productToUpdate.media_id.length > 0 &&
        productToUpdate.media_id.find((item) => item !== null)
      ) {
        setMediaIds(productToUpdate.media_id);
      }
      setName(productToUpdate.name);
      setScientific_name(productToUpdate.scientific_name);
      setMaturity_height(productToUpdate.maturity_height);
      setMaturity_width(productToUpdate.maturity_width);
      setFamily(productToUpdate.family);
      setOrigin(productToUpdate.origin);
      setFlower_color(productToUpdate.flower_color);
      setLeaf_color(productToUpdate.leaf_color);
      setDescription1(productToUpdate.description1);
      setDescription2(productToUpdate.description2);
      setSize(productToUpdate.size);
      setPot(productToUpdate.pot);
      setStock(productToUpdate.stock);
      setPrice(productToUpdate.price);
      setVat(Number(productToUpdate.vat));
    }
  }, [productToUpdate]);

  useEffect(() => {
    if (mediaUrls && mediaIds) {
      console.log(mediaUrls);
      mediaIds.map((id, index) => {
        dispatch(mediaUpdate({ id, url: mediaUrls[index] }));
      });
    }
    console.log(category);
  }, [mediaUrls, dispatch, mediaIds, category]);

  const product = {
    name,
    scientific_name,
    maturity_height,
    maturity_width,
    family,
    origin,
    flower_color,
    leaf_color,
    description1,
    description2,
    size,
    pot,
    stock,
    price: Number(price),
    vat,
    status,
    user_id,
    yield_id,
    hardiness_zone_id,
    water_requirement_id,
    exposure_id,
    ground_cover_power_id,
    strate_id,
    foliage_id,
  };

  //On submit
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(fetchUpdateProduct({ id, product }));
    if (category) {
      dispatch(
        updateProductCategory({
          product_id: id,
          category_id: category,
        }),
      );
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vraiment annuler ?")) {
      localStorage.removeItem("Product/toUpdate");
      dispatch(emptyMedia());
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }

  return (
    <motion.div
      className="max-w-4xl md:w-2/3 xl:m-2/3 m-auto p-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Modal />
      <h2 className="text-3xl mt-4 text-center font-semibold leading-7 text-gray-900">
        Ajouter un produit
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom du produit
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Nom du produit"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom scientifique
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={scientific_name}
                    onChange={(e) => setScientific_name(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Nom scientifique"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Hauteur de maturité
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={maturity_height}
                    onChange={(e) => setMaturity_height(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Hauteur de maturité"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Largeur de maturité
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={maturity_width}
                    onChange={(e) => setMaturity_width(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Largeur de maturité"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Famille
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Famille"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Origine
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Origine"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Couleur de la fleur
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={flower_color}
                    onChange={(e) => setFlower_color(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Couleur de la fleur"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Couleur de la feuille
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={leaf_color}
                    onChange={(e) => setLeaf_color(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Couleur de la feuille"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description 1
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <textarea
                    name=""
                    value={description1}
                    onChange={(e) => setDescription1(e.target.value)}
                    rows="3"
                    className="block w-full border-0 bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Description 1"
                  />
                </div>
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description 2
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <textarea
                    name=""
                    value={description2}
                    onChange={(e) => setDescription2(e.target.value)}
                    rows="3"
                    className="block w-full border-0 bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Description 2"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Taille
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Taille"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pot
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="text"
                    name=""
                    value={pot}
                    onChange={(e) => setPot(e.target.value)}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Pot"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="number"
                    name=""
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Stock"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prix
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="number"
                    name=""
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="Prix"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  TVA
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <input
                    type="number"
                    name=""
                    value={vat}
                    onChange={(e) => setVat(Number(e.target.value))}
                    autoComplete="off"
                    className={
                      "block w-full border-0 bg-transparent py-2.5 pl-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 hide-number-input-spinners"
                    }
                    placeholder="TVA"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Statut
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setStatus(e.target.value === "1")}
                  >
                    <option value="">Select</option>
                    <option value="1">Disponible</option>
                    <option value="2">Indisponible</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rendement
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setYield_id(Number(e.target.value))}
                  >
                    <option value="">Select</option>
                    <option value="1">Correct</option>
                    <option value="2">Bon</option>
                    <option value="3">Très bon</option>
                    <option value="4">Excellent</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Zone de rusticité
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) =>
                      setHardiness_zone_id(Number(e.target.value))
                    }
                  >
                    <option value="">Select</option>
                    <option value="1">Zone 1a : -51,1 à -48,3°C</option>
                    <option value="2">Zone 1b : -48,3 à -45,6°C</option>
                    <option value="3">Zone 2a : -45,6 à -42,8°C</option>
                    <option value="4">Zone 2b : -42,8 à -40°C</option>
                    <option value="5">Zone 3a : -40 à -37,2°C</option>
                    <option value="6">Zone 3b : -37,2 à -34,4°C</option>
                    <option value="7">Zone 4a : -34,4 à -31,7°C</option>
                    <option value="8">Zone 4b : -31,7 à -28,9°C</option>
                    <option value="9">Zone 5a : -28,9 à -26,1°C</option>
                    <option value="10">Zone 5b : -26,1 à -23,3°C</option>
                    <option value="11">Zone 6a : -23,3 à -20,6°C</option>
                    <option value="12">Zone 6b : -20,6 à -17,8°C</option>
                    <option value="13">Zone 7a : -17,8 à -15°C</option>
                    <option value="14">Zone 7b : -15 à -12,2°C</option>
                    <option value="15">Zone 8a : -12,2 à -9,4°C</option>
                    <option value="16">Zone 8b : -9,4 à -6,7°C</option>
                    <option value="17">Zone 9a : -6,7 à -3,9°C</option>
                    <option value="18">Zone 9b : -3,9 à -1,1°C</option>
                    <option value="19">Zone 10a : -1,1 à 1,7°C</option>
                    <option value="20">Zone 10b : 1,7 à 4,4°C</option>
                    <option value="21">Zone 11a : 4,4 à 7,2°C</option>
                    <option value="22">Zone 11b : 7,2 à 10°C</option>
                    <option value="23">Zone 12a : 10 à 12,8°C</option>
                    <option value="24">Zone 12b : 12,8 à 15,6°C</option>
                    <option value="25">Zone 13a : 15,6 à 18,3°C</option>
                    <option value="26">Zone 13b : 18,3 à 21,1°C</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Besoin en eau
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) =>
                      setWater_requirement_id(Number(e.target.value))
                    }
                  >
                    <option value="">Select</option>
                    <option value="1">Faible</option>
                    <option value="2">Moyen</option>
                    <option value="3">Fort</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Exposition
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setExposure_id(Number(e.target.value))}
                  >
                    <option value="">Select</option>
                    <option value="1">Plein Soleil</option>
                    <option value="2">Ombre légère</option>
                    <option value="3">Ombre modérée</option>
                    <option value="4">Pleine ombre</option>
                    <option value="5">Ombre profonde</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Couvrance du sol
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) =>
                      setGround_cover_power_id(Number(e.target.value))
                    }
                  >
                    <option value="">Select</option>
                    <option value="1">Mauvais</option>
                    <option value="2">
                      Correct (Désherbage printemps/été)
                    </option>
                    <option value="3">Bon</option>
                    <option value="4">Très bon</option>
                    <option value="5">Non couvrant</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Feuillage
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setStrate_id(Number(e.target.value))}
                  >
                    <option value="">Select</option>
                    <option value="1">Arbre</option>
                    <option value="2">Arbuste</option>
                    <option value="3">Herbacés haute</option>
                    <option value="4">Herbacés basse</option>
                    <option value="5">Couvre-sol</option>
                    <option value="6">Racine</option>
                    <option value="7">Grimpante</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Strate
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setFoliage_id(Number(e.target.value))}
                  >
                    <option value="">Select</option>
                    <option value="1">Persistant</option>
                    <option value="2">Caduc</option>
                    <option value="3">Persistant et caduc</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="rounded-md shadow-sm border ring-gray-300 ">
                  <select
                    className="block w-full rounded bg-transparent py-2.5 pl-1 text-gray-600 placeholder:text-gray-900 focus:ring-0"
                    onChange={(e) => setCategory(Number(e.target.value))}
                  >
                    <option value="">Select</option>
                    <option value="1">Aromates et Médicinales</option>
                    <option value="2">Fruitiers</option>
                    <option value="3">Agrumes</option>
                    <option value="4">Plantes équines</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImagesUploader id={id} />
        <div className="mt-6 flex flex-row-reverse items-center justify-between gap-x-6">
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-semibold leading-6 mr-2 text-gray-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Valider
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
