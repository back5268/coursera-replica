import React from 'react';
import DataTable from "@components/base/DataTable";

const FormList = (props) => {
    const {title, children, ...prop} = props;

    return (
        <div className="p-4 bg-white rounded-lg shadow-xl">
            <h2 className="font-semibold uppercase leading-normal my-2 text-neutral-800 dark:text-neutral-200">{title}</h2>
            {children}
            <DataTable {...prop} />
        </div>
    );
};

export default FormList;
