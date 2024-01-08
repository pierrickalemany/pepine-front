import axios from "axios";
import { Product } from "../../../components/product/Product";

export async function generateStaticParams() {
  const response = await axios.get("https://pepine-back.onrender.com/products");
  return response.data.data.product.map((post, index) => {
    const id = index + 1;
    return {
      id: `${id}`,
    };
  });
}
export async function generateMetadata({ params }) {
  const id = params.id;
  try {
    const response = await axios.get(
      `https://pepine-back.onrender.com/products/${id}`,
    );
    const product = response.data.data.product;
    const metadata = { title: product.name, description: product.description };
    return metadata;
  } catch (error) {
    return [
      {
        title: "Product",
        description: "",
      },
    ];
  }
}
export default function Page({ params }) {
  const id = params.id;

  return <Product id={id} />;
}
