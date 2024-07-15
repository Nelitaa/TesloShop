import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  }
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title
        title={`${capitalizeFirstLetter(gender)}`}
        subtitle="Best sellers"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
