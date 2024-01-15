import React from 'react';

const Table = () => {
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                <tr>
                  <th scope="col" className="px-6 py-4 border-r">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                  <th scope="col" className="px-6 py-4 border-r">
                    Heading
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium">1</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">2</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 ">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4 ">Cell</td>
                </tr>
                <tr className="border-b ">
                  <td className="whitespace-nowrap border-r px-6 py-4 font-medium ">3</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap border-r px-6 py-4">Cell</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
