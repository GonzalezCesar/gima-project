import React from "react";

interface Props {
  id: string | number;
  name: string;
  description?: string;
  total?: number;
}

export default function FilaDeCategorias({ id, name, description = "—", total = 0 }: Props) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-sm text-gray-700 font-medium">{id}</td>
      <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{name}</td>
      <td className="py-4 px-6 text-sm text-gray-600">{description}</td>
      <td className="py-4 px-6 text-sm text-center font-semibold">{total}</td>
      <td className="py-4 px-6 text-sm text-center">
        <button className="px-3 py-1.5 text-xs rounded-full bg-blue-600 text-white hover:bg-blue-700">Editar</button>
      </td>
    </tr>
  );
}
