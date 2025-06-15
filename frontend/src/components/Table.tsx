import React, { useState } from 'react';

type TableRow = {
  id: string;
  name: string;
  email: string;
};

interface TableProps {
  data: TableRow[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;

}

export default function Table({ data, onEdit, onDelete }: TableProps) {
  const [search, setSearch] = useState('');

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto flex flex-col justify-center">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Pesquisar
            </label>
            <div className="relative mt-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                placeholder="Pesquisar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full table-fixed divide-y divide-green-400">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase">
                    Nome
                  </th>
                  <th className="py-3 px-6 text-xs font-medium text-left text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="p-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                   
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => onEdit?.(item.id)}
                      >
                        Editar
                      </button>
                      {onDelete && (
                        <button
                          className="text-red-600 hover:underline ml-4"
                          onClick={() => onDelete(item.id)}
                        >
                           Remover
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      Sem resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
