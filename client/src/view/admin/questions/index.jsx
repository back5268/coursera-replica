import React, {useState} from 'react';
import {deleteQuestionApi, listQuestionApi, updateQuestionApi} from '@api';
import {InputFormV2} from '@components/form';
import {useGetParams} from '@hook';
import {useGetApi} from '@lib/react-query';
import DetailQuestion from './Detail';
import {DataFilter, FormList, TimeBody} from '@components/base';
import {useDataState} from '@store';

const Filter = ({setParams, courses = []}) => {
    const [filter, setFilter] = useState({});

    return (
        <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
            <InputFormV2
                value={filter.keySearch}
                onChange={(e) => setFilter({...filter, keySearch: e.target.value})}
                label="Tìm kiếm theo câu hỏi"
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
        {label: 'Câu hỏi', field: 'content'},
        {
            label: 'Câu trả lời', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    return answers.map((a, index) => <>
                        <span key={index}>{String.fromCharCode(65 + index)}. {a.label}</span> <br/>
                    </>)
                }
            }
        },
        {
            label: 'Đáp án', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    const index = answers.findIndex(a => a.isAnswer)
                    if (index >= 0) return `${String.fromCharCode(65 + index)}.${answers[index]?.label}`
                }
            }
        },
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt)}
    ];

    const {isLoading, data} = useGetApi(listQuestionApi, params, 'questions');

    return (
        <>
            <DetailQuestion show={show} setShow={setShow} setParams={setParams} data={data?.documents}
                            courses={courses}/>
            <FormList
                isLoading={isLoading}
                title="Quản lý câu hỏi"
                data={data?.documents}
                totalRecord={data?.total}
                columns={columns}
                params={params}
                setParams={setParams}
                baseActions={['insert', 'detail', 'delete', 'import', 'export']}
                setShow={setShow}
                actionsInfo={{onViewDetail: (item) => setShow(item._id), deleteApi: deleteQuestionApi}}
                statusInfo={{changeStatusApi: updateQuestionApi}}
                headerInfo={{onInsert: () => setShow(true)}}
            ><Filter setParams={setParams} courses={courses}/></FormList>
        </>
    );
};

export default Questions;
