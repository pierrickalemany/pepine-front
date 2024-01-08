"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useAppDispatch } from "../../hooks/redux";
import { registerUser } from "../../store/reducer/register";

export function Register() {
  const dispatch = useAppDispatch();

  // STATE INSCRIPTION
  const [formInput, setFormInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmed_password: "",
  });

  // RETOUR DES ERREURS
  const [formError, setFormError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmed_Password: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const router = useRouter();

  // ACTION DU SUBMIT POUR VALIDATION DES CHAMPS
  const validateFormInput = (event) => {
    event.preventDefault();

    let inputError = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmed_Password: "",
    };

    // présence du mail mais absence du pw
    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Entrez une adresse mail valide",
        password: "Cet emplacement ne peut pas être vide",
      });
      return;
    }

    // pas d'email
    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Entrez une adresse mail valide",
      });
      return;
    }

    // divergence champs password
    if (formInput.confirmed_password !== formInput.password) {
      setFormError({
        ...inputError,
        confirmed_Password: "Les mots de passe ne sont pas identiques",
      });
      return;
    }

    // Supprimer confirmed_password de formInput
    const { confirmed_password, ...formData } = formInput;

    // Validation si form ok avec formData
    dispatch(registerUser(formData));
    router.push("/login");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 py-2 w-3/5 m-auto">
        <div className="flex flex-1 flex-col justify-center mb-6 sm:px-6 xl:flex-none ">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Créer un compte
            </h1>

            <div className="mt-10">
              <div>
                <motion.form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={validateFormInput}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Prénom
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        value={formInput.first_name}
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        name="first_name"
                        type="text"
                        autoComplete="first name"
                        required
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      />
                      {formError.first_name ? `${formError.first_name}` : ""}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Nom
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        value={formInput.last_name}
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        name="last_name"
                        type="text"
                        autoComplete="last_name"
                        required
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      />
                      {formError.last_name ? `${formError.last_name}` : ""}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Adresse mail
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        value={formInput.email}
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      />
                      {formError.email ? `${formError.email}` : ""}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        value={formInput.password}
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      />
                      {formError.password ? `${formError.password}` : ""}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmed_password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirmez votre mot de passe
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmed_password"
                        value={formInput.confirmed_password}
                        onChange={({ target }) => {
                          handleUserInput(target.name, target.value);
                        }}
                        name="confirmed_password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
                      />
                      {formError.confirmed_password
                        ? `${formError.confirmed_password}`
                        : ""}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-amber-500 px-3 p-2 mt-10 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      Créer mon compte
                    </button>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="relative hidden w-0 flex-1 xl:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Image
            className="absolute inset-0 h-full w-full object-cover rounded-md"
            src="/germination.jpeg"
            width={500}
            height={500}
            alt=""
          />
        </motion.div>
      </div>
    </>
  );
}
