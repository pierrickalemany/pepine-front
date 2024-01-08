import { ProductsGrid } from "../../components/product/ProductsGrid";

export const metadata = {
  title: "Tous nos produit",
  description:
    "Découvrez notre sélection de produits de qualité répartis dans quatre catégories distinctes.",
};
//Product Grid
export default function Page() {
  return <ProductsGrid />;
}
