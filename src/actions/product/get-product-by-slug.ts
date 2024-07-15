export const revalidate = 604800; // 7 days

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug,
      }
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map(image => image.url)
    }
  } catch (error) {
    throw new Error('Error fetching product by slug');
  }
}