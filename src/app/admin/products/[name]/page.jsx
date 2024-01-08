import axios from "axios";

import { ProductDetails } from "../../../../components/admin/products/ProductDetails";

export async function generateStaticParams() {
  const response = await axios.get("https://pepine-back.onrender.com/products");
  return response.data.data.product.map((post, index) => {
    const name = post.id;
    return {
      name: `${name}`,
    };
  });
}
export default function Page({ params }) {
  const id = params.name;
  return <ProductDetails id={id} />;
}
