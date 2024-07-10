import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);
  const { categories, products } = initialData;

  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData
  });

  console.log('Seed database executed successfully');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();