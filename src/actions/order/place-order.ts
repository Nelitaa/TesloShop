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
  const prismaTx = await prisma.$transaction(async (tx) => {

    // 1. Update stock

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

    return {
      order: order,
      updatedProducts: [],
      orderAddress: {},
    }
  });
};