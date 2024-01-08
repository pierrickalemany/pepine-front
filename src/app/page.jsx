import { Categories } from "../components/categories/Categories";
import { ImagesHeader } from "../components/home/ImagesHeader";
import { About } from "../components/home/About";

export const metadata = {
  title: "Home",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};

export default function Home() {
  return (
    <>
      <ImagesHeader />
      <Categories />
      <About />
    </>
  );
}
