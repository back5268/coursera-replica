import React from 'react';
import Pagination from './Pagination';

const Table = (props) => {
  const { data = [], totalRecord = 0, columns = [], params = { page: 1, limit: 10 }, setParams = () => {} } = props;

  return (
    <>
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-neutral-100 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className="px-4 py-4 border-[1px]">
                      #
                    </th>
                    {columns.map((column, index) => {
                      return (
                        <th scope="col" className="px-4 py-4 border-[1px]" key={index}>
                          {column.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item, index) => {
                      const bgColor = (index % 2 === 1) ? "bg-neutral-50" : ""
                      return (
                        <tr key={index} className="dark:border-neutral-500">
                          <td className={`px-4 py-4 font-medium border-[1px] ${bgColor}`}>{(params.page - 1) * params.limit + index + 1}</td>
                          {columns.map((column, i) => {
                            return <td key={i} className={`border-r px-4 py-4 border-[1px] ${bgColor}`}>{column.body ? column.body(item) : item[column.field]}</td>;
                          })}
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="dark:border-neutral-500">
                      <td className="px-4 py-4 font-medium border-[1px] text-center" colSpan={columns.length + 1}>
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination params={params} setParams={setParams} totalRecord={totalRecord} />
      </div>
    </>
  );
};

export default Table;
