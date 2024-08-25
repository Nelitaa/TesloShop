'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }

  // Obtain products information
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate total items
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Calculate total price, tax and subtotal price
  const { subTotalPrice, tax, totalPrice } = productIds.reduce((totals, item) => {
    const productQuantity = item.quantity;
    const product = products.find((product) => product.id === item.productId);

    if (!product) throw new Error(`${item.productId} Not found - 500`);

    const subTotalPrice = product.price * productQuantity;

    totals.subTotalPrice += subTotalPrice;
    totals.tax += subTotalPrice * 0.15;
    totals.totalPrice += subTotalPrice * 1.15;

    return totals;

  }, { subTotalPrice: 0, tax: 0, totalPrice: 0 });

  // Create transaction in database
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      // 1. Update stock

      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds.filter(
          p => p.productId === product.id
        ).reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`Product ${product.id} does not have quantity`);
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Check if all products have stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`Product ${product.title} is out of stock`);
        }
      });

      // 2. Create order header and details
      const order = await tx.order.create({
        data: {
          userId: userId,
          totalItems: itemsInOrder,
          subTotalPrice: subTotalPrice,
          tax: tax,
          totalPrice: totalPrice,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Create order address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      }
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};