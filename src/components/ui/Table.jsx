import React from 'react';

const Table = ({ 
  headers = [], 
  data = [], 
  className = '',
  emptyMessage = 'Nenhum dado encontrado',
  ...props 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`card p-8 text-center text-text-secondary ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table" {...props}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={header.className}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className={header.cellClassName}>
                  {header.render ? header.render(row[header.key], row) : row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
