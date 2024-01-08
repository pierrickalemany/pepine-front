import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { adminList } from "../../utils/adminList";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function DropdownNav() {
  return (
    <Menu
      as="div"
      className="relative z-50 inline-block text-sm font-semibold text-gray-600 text-left"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md ">
          Gestion
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-4 py-5 font-normal">
            {adminList.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.1 }}
                  >
                    <Link
                      href={item.path}
                      className={`${
                        active ? "bg-amber-500 text-white" : "text-gray-600"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <item.icon
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </motion.div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
