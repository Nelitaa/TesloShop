'use client';

import { paypalCheckPayment, setTransactionId } from "@/actions";
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const roundedAmount = (Math.round(amount * 100)) / 100;

  const [{ isPending }] = usePayPalScriptReducer();
  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`,
          }
        }
      ]
    })

    // Save the transactionId to the database
    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error('Failed to set transaction id');
    }
    console.log('Transaction ID:', transactionId);

    return transactionId;
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('OnApprove');
    const details = await actions.order?.capture();
    if (!details) return;
    if (!details.id) return;
    await paypalCheckPayment(details.id);
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove} />
  )
}
