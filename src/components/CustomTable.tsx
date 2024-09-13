import React from 'react';

export type Column<T> = {
  header: string;
  accessor: keyof T; 
};

export type CustomTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const CustomTable = <T,>({ columns, data }: CustomTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 border">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border">
                  {(row[col.accessor] as unknown as string) || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
