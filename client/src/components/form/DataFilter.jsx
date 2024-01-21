import React from 'react';
import { Button } from '../uiCore';
import { BiFilterAlt } from "react-icons/bi";
import { refreshObject, removeUndefinedProps } from '@/lib/utils';

const DataFilter = (props) => {
  const { setParams, filter, setFilter, handleFilter, ...prop } = props;

  const onClear = () => {
    setParams?.((pre) => {
      return {
        page: pre.page || 1,
        limit: pre.limit || 10,
        render: pre.render
      };
    });
    setFilter?.({ ...refreshObject(filter) });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let filters = { ...filter };
    if (handleFilter) filters = handleFilter?.(filter);
    setParams?.((pre) => {
      return {
        page: pre.page || 1,
        limit: pre.limit || 10,
        render: pre.render,
        ...removeUndefinedProps(filters)
      };
    });
  };

  return (
    <form onSubmit={onSubmit} className="my-4 card flex gap-4 items-center">
      {props.children}
      <div className="w-6/12 flex gap-2 items-center justify-end">
        <Button onClick={onClear} severity="secondary">Làm mới</Button>
        <Button type="submit"><BiFilterAlt size={16} /> Lọc</Button>
      </div>
    </form>
  );
};

export default DataFilter;
