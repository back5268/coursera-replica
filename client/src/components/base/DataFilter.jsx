import React from 'react';
import { Button } from '../uiCore';
import { BiFilterAlt } from 'react-icons/bi';
import { removeUndefinedProps } from '@lib/utils';

const DataFilter = (props) => {
  const { setParams = () => {}, filter, setFilter = () => {}, handleFilter = (e) => e, className, ...prop } = props;

  const onClear = () => {
    setParams((pre) => {
      return {
        page: pre.page || 1,
        limit: pre.limit || 10,
        render: pre.render
      };
    });
    setFilter({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let filters = { ...filter };
    filters = handleFilter(filter);
    setParams((pre) => {
      return {
        page: pre.page || 1,
        limit: pre.limit || 10,
        render: pre.render,
        ...removeUndefinedProps(filters)
      };
    });
  };

  return (
    <form onSubmit={onSubmit} className="my-4 card p-2">
      <div className="flex items-center flex-wrap w-full">
        {props.children}
        <div className={`p-2 lg:w-3/12 flex gap-2 items-center justify-end px-2 ${className}`}>
          <Button onClick={onClear} severity="secondary">
            Làm mới
          </Button>
          <Button type="submit">
            <BiFilterAlt size={16} /> Lọc
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DataFilter;
