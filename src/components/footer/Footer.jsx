import Link from "next/link";

const navigation = {
  main: [
    { name: "Conditions Générales d utilisation", href: "/cgu" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
    { name: "Mentions Legales", href: "/legal" },
    { name: "Credits", href: "/credits" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1c4b30] w-full">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-10 lg:px-8">
        <h3 className="text-center text-white font-bold text-xl m-2">
          Poussez pas derrière - Pépinièriste à Saint André
        </h3>
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-3 font-normal">
              <Link
                href={item.href}
                className="text-sm leading-6 text-white hover:text-gray-900"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
