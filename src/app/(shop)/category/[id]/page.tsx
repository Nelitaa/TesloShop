import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);

  return (
    <>
      <Title
        title={`${capitalizeFirstLetter(id)}`}
        subtitle="Best sellers"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
