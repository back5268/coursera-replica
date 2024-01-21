import React from 'react';
import { Button, Table } from '../uiCore';

const DataTable = (props) => {
  const {
    data = [],
    totalRecord = 0,
    columns = [],
    params = { page: 1, limit: 10 },
    setParams = () => {},
    title,
    dataFilter = () => {},
    baseActions = [],
    setShow = () => {}
  } = props;

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl">
      <h2 className="font-semibold uppercase leading-normal my-2 text-neutral-800 dark:text-neutral-200">{title}</h2>
      {dataFilter()}
      <div className="card">
        <div className="flex gap-2 justify-start">
          {baseActions.includes('insert') && <Button onClick={() => setShow(true)}>Thêm mới</Button>}
          {baseActions.includes('export') && <Button severity="info">Export</Button>}
        </div>
        <Table params={params} setParams={setParams} data={data} totalRecord={totalRecord} columns={columns} />
      </div>
    </div>
  );
};

export default DataTable;
