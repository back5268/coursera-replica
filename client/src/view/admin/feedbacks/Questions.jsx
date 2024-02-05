import React, {useState} from 'react';
import {deleteTemplateApi, listTemplateApi, updateTemplateApi} from '@api';
import {InputFormV2, SelectFormV2} from '@components/form';
import {statuses} from '@constant';
import {useGetParams} from '@hook';
import {useGetApi} from '@lib/react-query';
import {DataFilter, DataTable, NumberBody, TimeBody} from '@components/base';
import {useDataState} from '@store';

const Filter = ({setParams}) => {
    const [filter, setFilter] = useState({});

    return (
        <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-6/12'}>
            <InputFormV2
                value={filter.keySearch}
                onChange={(e) => setFilter({...filter, keySearch: e.target.value})}
                label="Tìm kiếm theo tiêu đề, mã"
            />
            <SelectFormV2
                value={filter.status}
                onValueChange={(e) => setFilter({...filter, status: e.value})}
                data={statuses}
                label="Trạng thái"
            />
        </DataFilter>
    );
};

const Questions = () => {
    const initParams = useGetParams();
    const [params, setParams] = useState(initParams);
    const {courses} = useDataState();
    const [show, setShow] = useState(false);

    const columns = [
        {label: 'Tiêu đề bài giảng', field: 'title'},
        {label: 'Tác giả', field: 'author'},
        {label: 'Thời gian học', body: (item) => NumberBody(item.time)},
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt)}
    ];

    const {isLoading, data} = useGetApi(listTemplateApi, params, 'templates');

    return (
        <>
            <Filter setParams={setParams} />
            <DataTable
                isLoading={isLoading}
                data={data?.documents}
                totalRecord={data?.total}
                columns={columns}
                params={params}
                setParams={setParams}
                setShow={setShow}
                actionsInfo={{onViewDetail: (item) => setShow(item._id), deleteApi: deleteTemplateApi}}
                statusInfo={{changeStatusApi: updateTemplateApi}}
                headerInfo={{onInsert: () => setShow(true)}}
            />
        </>
    );
};

export default Questions;
