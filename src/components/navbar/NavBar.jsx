"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";

import { logoutUser, getUserByNames } from "../../store/reducer/login.js";
import { adminList } from "../../utils/adminList.js";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

import { DropdownNav } from "./DropdownNav";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import { LuUserCircle } from "react-icons/lu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isToken = useAppSelector((state) => state.user.token);
  const isUser = useAppSelector((state) => state.user.user);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [showItemUser, setShowItemUser] = useState(false);

  useEffect(() => {
    if (typeof isToken === "string" && isToken.trim() !== "") {
      localStorage.setItem("token", isToken);
      const decodedToken = jwtDecode(isToken);
      const id = decodedToken.id;
      dispatch(getUserByNames(id));
    }
  }, [isToken, dispatch]);

  // handle user role
  useEffect(() => {
    if (isUser) {
      localStorage.setItem("user", JSON.stringify(isUser));
    }
  }, [isUser]);

  useEffect(() => {
    const itemUser = JSON.parse(localStorage.getItem("user"));
    const itemToken = localStorage.getItem("token");
    setUser(itemUser);
    setToken(itemToken);
  }, [isToken, isUser]);

  useEffect(() => {
    if (user?.role === "user" && token !== null) {
      setShowItemUser(true);
    } else {
      setShowItemUser(false);
    }
  }, [user, token]);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    dispatch(logoutUser());
    localStorage.clear();
    if (pathname === "/") {
      router.refresh();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="bg-white z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">PPD</span>
            <Image
              className="h-8 w-auto"
              src="/pépinière.png"
              width={500}
              height={500}
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-20">
          <Popover className="relative">
            <Link
              href={"/products"}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-600"
            >
              Produits
            </Link>
          </Popover>
          <Popover className="relative">
            <Link
              href={"/categories"}
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-600"
            >
              Categories
            </Link>
          </Popover>
          {user?.role === "admin" ? (
            <Popover className="relative">
              <DropdownNav className="text-sm" />
            </Popover>
          ) : (
            <Popover className="relative">
              <Link
                href={"/cart"}
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-600"
              >
                <ShoppingCartIcon
                  className="h-6 w-6 text-gray-600 group-hover:text-amber-600"
                  aria-hidden="true"
                />
              </Link>
            </Popover>
          )}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href={token ? (showItemUser ? "/account" : "#") : "/login"}
            className="text-sm flex items-center font-semibold leading-6 text-gray-600"
          >
            {token ? (
              <p className="text-gray-600">
                Bonjour,{" "}
                <span className="text-amber-500">{user?.first_name}</span>
              </p>
            ) : (
              "Se connecter"
            )}
          </Link>
          {showItemUser && (
            <Link
              href={"/account"}
              className="text-sm flex items-center ml-2 font-semibold leading-6 text-gray-600"
            >
              <LuUserCircle className="h-6 w-6" />
            </Link>
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="flex justify-end items-center rounded-md px-2 ml-10 gap-x-1 text-sm font-semibold leading-6 text-white bg-amber-300 hover:bg-amber-200"
            >
              <FiLogOut className="h-8 w-5" />
            </button>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={"#"} className="-m-1.5 p-1.5">
              <span className="sr-only">Pépinière poussez pas derrière</span>
              <Image
                className="h-8 w-auto"
                src="/pépinière.png"
                width={500}
                height={500}
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href={"/products"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link
                  href={"/categories"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categories
                </Link>

                {user?.role === "admin" ? (
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50">
                          Gestion
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none",
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {adminList.map((item, index) => (
                            <Disclosure.Button
                              key={index}
                              as="a"
                              href={item.path}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <Link
                    href={"/cart"}
                    className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon panier
                    <ShoppingCartIcon
                      className="h-6 w-6 ml-4 text-gray-600 group-hover:text-amber-600"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
              <div className="py-6">
                <Link
                  href={token ? "#" : "/login"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {token ? (
                    <p className="text-gray-600">
                      Bonjour,{" "}
                      <span className="text-amber-500">{user?.first_name}</span>
                    </p>
                  ) : (
                    "Se connecter"
                  )}
                </Link>
                {showItemUser && (
                  <Link
                    href={"/account"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                )}
                {token && (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 absolute bottom-4 left-5 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white bg-amber-300 hover:bg-amber-200"
                  >
                    <FiLogOut className="h-7 w-7" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
