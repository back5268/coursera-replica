import { Table } from '@components/uiCore';
import React from 'react';

const DataTable = (props) => {
  const { ...prop } = props;

  return <Table {...prop} />;
};

export default DataTable;
