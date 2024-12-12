import React from 'react';

const TableComponent = ({ headers, data, flagColumnName }) => {
  return (
    <div className="mt-5">
      <table className="table-auto border-collapse border border-gray-300 w-full text-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}  className={`${
              row["Flag"]==="true"
                ? "bg-green-500 text-white" // Change to your desired color
                : "bg-transparent hover:bg-yellow-400 hover:text-black"
            }`}>
              {headers.map((header, idx) => {
                const value = row[header];
                if (header === "Flag") {
                  return (
                    <td
                      key={idx}
                      className={`border border-gray-300 p-2 `}
                    >
                      {value}
                    </td>
                  );
                } else {
                  return (
                    <td key={idx} className="border border-gray-300 p-2">
                      {value}
                    </td>
                  );
                }
              })}
              {/* New column for the link */}
              <td className="border border-gray-300 p-2">
                {row["Flag"] === "true" ? (
                  <a href="https://your-desired-link-here">Link</a>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;