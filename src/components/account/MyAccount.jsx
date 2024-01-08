"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ordersOfOneUser } from "../../store/reducer/orders";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { Order } from "../../components/account/Order";
import { DeleteAccountModal } from "../../components/account/DeleteAccountModal";

export function MyAccount() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState();

  // suivi de la modification des données utilisateur
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isFirstNameComplete, setIsFirstNameComplete] = useState(false);
  const [isLastNameComplete, setIsLastNameComplete] = useState(false);
  const [isEmailComplete, setIsEmailComplete] = useState(false);

  // state react gestion de la modal
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  const orders = useAppSelector((state) => state.orders.userOrders);
  console.log(orders);

  useEffect(() => {
    const itemUser = JSON.parse(localStorage.getItem("user"));
    setUser(itemUser);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(ordersOfOneUser(user.id));
    }
  }, [dispatch, user]);

  //Fonction d'ouverture de la modal
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Fonction de fermeture de la modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    // Mettre à jour l'état isFormComplete lorsque l'un des champs est complété
    setIsFormComplete(
      isFirstNameComplete || isLastNameComplete || isEmailComplete,
    );
  }, [isFirstNameComplete, isLastNameComplete, isEmailComplete]);

  return (
    <motion.div
      className="mx-auto mt-10 lg:mt-16 max-w-7xl px-6 lg:px-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-9">
            <h1 className="text-xl font-semibold leading-7 text-gray-600">
              Paramètres du compte
            </h1>
            <p className="text-normal font-light leading-7 text-gray-600">
              Bonjour {user?.first_name} {user?.last_name}, cette page permet de
              modifier vos données et de gérer vos commandes.
            </p>

            <div className="border-t mt-8">
              <h2 className="mt-5 text-base font-bold text-gray-600">
                Données personnelles
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Prénom *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      placeholder={user?.first_name}
                      className="block w-full rounded-md border-0 p-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      onChange={(e) => setIsFirstNameComplete(!!e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Nom de famille *
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      placeholder={user?.last_name}
                      className="block w-full rounded-md border-0 p-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      onChange={(e) => setIsLastNameComplete(!!e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Adresse e-mail *
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={user?.email}
                      className="block w-full rounded-md border-0 p-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      onChange={(e) => setIsEmailComplete(!!e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={openDeleteModal}
                  className="text-sm font-semibold leading-6 text-gray-600"
                >
                  Supprimer mon compte
                </button>
                {isFormComplete && (
                  <button
                    type="submit"
                    className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    Modifier
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="border-b border-gray-900/10 py-12">
        <h2 className="text-base font-semibold leading-7 text-gray-600 pb-6">
          Vos commandes
        </h2>
        {orders && orders.map((item, index) => <Order key={index} {...item} />)}
      </div>
      {/* Afficher la modal si DeleteModalOpen est vrai */}
      {DeleteModalOpen && (
        <DeleteAccountModal
          id={user.id}
          isOpen={DeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </motion.div>
  );
}
