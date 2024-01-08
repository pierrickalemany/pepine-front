import React from "react";

export function OrderItem({ product_name, product_price, quantity_ordered }) {
  return (
    <tr>
      <td className="mt-1 text-sm leading-6 text-gray-600">{product_name}</td>
      <td className="mt-1 text-sm leading-6 text-gray-600">
        {product_price} €
      </td>
      <td className="mt-1 text-sm leading-6 text-gray-600">
        {quantity_ordered}
      </td>
    </tr>
  );
}
