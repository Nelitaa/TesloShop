'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: 'User not authenticated'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!order) throw `Order with id ${id} don't exist`;
    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw 'You are not authorized to view this order'
      }
    }
      return {
        ok: true,
        order: order
      }
    } catch (error) {
      return {
        ok: false,
        message: 'Error getting order by id'
      }
    }
  }