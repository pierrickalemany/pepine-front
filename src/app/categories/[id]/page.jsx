import axios from "axios";

import { CategoryGrid } from "../../../components/categories/CategoryGrid";

//Products by category
export async function generateStaticParams() {
  const response = await axios.get(
    "https://pepine-back.onrender.com/categories",
  );
  return response.data.data.category.map((post) => {
    return {
      id: `${post.id}`,
    };
  });
}
export async function generateMetadata({ params }) {
  const id = params.id;
  console.log(id);
  try {
    const response = await axios.get(
      `https://pepine-back.onrender.com/categories/${id}`,
    );
    const category = response.data.data.category;
    const metadata = {
      title: category.value,
      description: category.description,
    };
    return metadata;
  } catch (error) {
    return [
      {
        title: "Category",
        description: "",
      },
    ];
  }
}

export default function Page({ params }) {
  return <CategoryGrid params={params} />;
}
